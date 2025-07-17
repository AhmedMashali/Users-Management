import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel
      .exists({ email: createUserDto.email })
      .exec();
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const createdUser = new this.userModel(createUserDto);
    const savedUser = await createdUser.save();
    return savedUser.toJSON();
  }

  async findPaginated(
    page = 1,
    limit = 10,
  ): Promise<{ data: User[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.userModel
        .find()
        .skip(skip)
        .limit(limit)
        .lean()
        .select({ __v: 0 })
        .exec(),
      this.userModel.countDocuments().exec(),
    ]);
    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).lean().exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.email) {
      const user = await this.userModel
        .findById(id)
        .select({ email: 1 })
        .lean()
        .exec();
      if (!user) throw new NotFoundException('User not found');

      if (user.email !== updateUserDto.email) {
        const existingUser = await this.userModel
          .exists({
            email: updateUserDto.email,
            _id: { $ne: id },
          })
          .exec();
        if (existingUser) {
          throw new BadRequestException('Email already in use by another user');
        }
      }
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .lean()
      .select({ __v: 0 })
      .exec();

    if (!updatedUser)
      throw new NotFoundException('User not found after update');

    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) throw new NotFoundException('User not found');
    return deletedUser;
  }
}
