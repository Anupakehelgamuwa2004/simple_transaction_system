export interface Transaction {
  id?: number;
  transactionRef: string;
  startDate: string;      // ISO  yyyy-MM-dd
  maturityDate: string;
  amount: number;
  customerName: string;
  customerNic: string;
}
