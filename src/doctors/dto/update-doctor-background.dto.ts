import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorBackgroundDto } from './create-doctor-background.dto';

export class UpdateDoctorBackgroundDto extends PartialType(CreateDoctorBackgroundDto) {}
