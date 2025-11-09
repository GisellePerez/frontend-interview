import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddTodoItemDto {
  @ApiProperty({
    description: 'Name of the todo item',
    required: true,
    example: 'Buy milk',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the todo item',
    example: 'Buy a gallon of milk from the store',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Description of the todo item',
    example: 'Buy a gallon of milk from the store',
    required: false,
  })
  @IsOptional()
  order?: number;
}
