export class CreateDoctorDto {
  user_id: number;
  specialization_id: number;
  name: string;
  dob: Date;
  gender: string;
  phone: string;

  address: string;
  photo: any;
  json_work_schedule: string;
}
