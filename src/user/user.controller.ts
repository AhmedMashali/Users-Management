import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ParamIdDto } from './dto/param-id.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  findPaginated(@Query() paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    return this.userService.findPaginated(page, limit);
  }

  @Get(':id')
  findOne(@Param() { id }: ParamIdDto) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id }: ParamIdDto, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() { id }: ParamIdDto) {
    return this.userService.remove(id);
  }
}
