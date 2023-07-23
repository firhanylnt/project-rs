export class InvoiceDto {
  patient_id: string;
  total_amount: number;
  type: string;
  payment_method: string;
  status: boolean;
  details: [];
}
