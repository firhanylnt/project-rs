export class CreatePatientDto {
  user_id: number;
  first_name: string;
  last_name: string;
  gender: string;
  dob: Date;
  phone: string;
  address: string;
}
