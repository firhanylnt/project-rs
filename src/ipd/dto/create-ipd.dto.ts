export class CreateIpdDto {
  doctor_id: string;
  patient_id: string;
  room_id: string;
  blood_pressure: string;
  height: number;
  weight: number;
  admission_date: Date;
  payment_method: string;
  symptoms: string;
  notes: string;
  is_active: boolean;
  details: [];
}
