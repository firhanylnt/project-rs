import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomtypeDto } from './create-roomtype.dto';

export class UpdateRoomtypeDto extends PartialType(CreateRoomtypeDto) {}
