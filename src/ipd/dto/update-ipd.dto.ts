import { PartialType } from '@nestjs/mapped-types';
import { CreateIpdDto } from './create-ipd.dto';

export class UpdateIpdDto extends PartialType(CreateIpdDto) {}
