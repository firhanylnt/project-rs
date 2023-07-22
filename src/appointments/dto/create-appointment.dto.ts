export class CreateAppointmentDto {
  specialization_id: number;
  doctor_id: string;
  email: string;
  phone_number: string;
  patient_name: string;
  patient_gender: string;
  appointment_date: Date;
  description: string;
}
