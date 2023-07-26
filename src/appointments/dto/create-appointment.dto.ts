export class CreateAppointmentDto {
  specialization_id: number;
  doctor_id: string;
  email: string;
  first_name: string;
  last_name: string;
  dob: Date;
  address: string;
  phone_number: string;
  patient_gender: string;
  appointment_date: Date;
  description: string;
  is_approved: boolean;
}
