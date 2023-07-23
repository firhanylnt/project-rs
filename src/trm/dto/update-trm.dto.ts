import { PartialType } from '@nestjs/mapped-types';
import { CreateTrmDto } from './create-trm.dto';

export class UpdateTrmDto extends PartialType(CreateTrmDto) {}
