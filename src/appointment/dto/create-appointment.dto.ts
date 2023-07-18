export class CreateAppointmentDto {
  patient_id: string;
  doctor_id: string;
  appointment_date: Date;
  payment_method: string;
}
