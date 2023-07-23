export class CreateInvoiceDto {
  code: string;
  billing_id: number;
  patient_id: string;
  amount_paid: number;
  payment_date: string;
  status: boolean;
}
