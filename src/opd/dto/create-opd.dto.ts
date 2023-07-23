export class CreateOpdDto {
  patient_id: string;
  blood_pressure: string;
  height: number;
  weight: number;
  admission_date: Date;
  payment_method: string;
  symptoms: string;
  notes: string;
  is_active: boolean;
}
