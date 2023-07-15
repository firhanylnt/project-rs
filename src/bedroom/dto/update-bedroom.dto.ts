import { PartialType } from '@nestjs/mapped-types';
import { CreateBedroomDto } from './create-bedroom.dto';

export class UpdateBedroomDto extends PartialType(CreateBedroomDto) {}
