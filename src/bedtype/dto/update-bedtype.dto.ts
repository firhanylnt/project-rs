import { PartialType } from '@nestjs/mapped-types';
import { CreateBedtypeDto } from './create-bedtype.dto';

export class UpdateBedtypeDto extends PartialType(CreateBedtypeDto) {}
