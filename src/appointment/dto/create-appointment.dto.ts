export class CreateAppointmentDto {
  patient_id: string;
  specialization_id: number;
  doctor_id: string;
  appointment_date: Date;
  payment_method: string;
}
