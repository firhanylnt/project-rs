import { IsNotEmpty, IsString, IsInt, Min, Max, IsBoolean } from 'class-validator';

export class CreateDoctorBackgroundDto {
  @IsNotEmpty()
  @IsString()
  doctor_id: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1930)
  @Max(new Date().getFullYear())
  year: number;

  @IsNotEmpty()
  @IsString()
  education: string;

  @IsNotEmpty()
  @IsBoolean()
  is_formal: boolean;
}
