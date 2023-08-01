export class CreateUserDto {
  hospital_id: number;
  username: string;
  email: string;
  password: string;
  status: boolean;
  role: string;
}
