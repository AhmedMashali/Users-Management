import { IsMongoId } from 'class-validator';

export class ParamIdDto {
  @IsMongoId({ message: 'Invalid ID' })
  id: string;
}
