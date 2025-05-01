import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../model/transaction.model';
import { ReportTableComponent } from "../report-table/report-table.component";

@Component({
  selector: 'app-base-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ReportTableComponent],
  templateUrl: './base-ui.component.html',
  styleUrls: ['./base-ui.component.css']
})
export class BaseUiComponent implements OnInit {

  txForm!: FormGroup;
  outstandingRows: Transaction[] = [];
  customerRows: Transaction[] = [];
  maturityRows: Transaction[] = [];

  constructor(private fb: FormBuilder, private api: TransactionService) {}

  ngOnInit(): void {
    this.txForm = this.fb.group({
      transactionRef: ['', Validators.required],
      startDate: ['', Validators.required],
      maturityDate: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      customerName: ['', Validators.required],
      customerNic: ['', Validators.required],
    });
  }

  save(): void {
    if (this.txForm.invalid) return;

    const form = this.txForm.value;
    const dto = {
      transactionRef: form.transactionRef,
      startDate: form.startDate,
      maturityDate: form.maturityDate,
      amount: form.amount,
      customerName: form.customerName,
      customerNic: form.customerNic
    };

    this.api.save(dto).subscribe({
      next: () => {
        alert('Saved!');
        this.txForm.reset();
      },
      error: err => alert(err.error?.message ?? 'Error occurred while saving.')
    });
  }

  loadOutstanding(asOf: string): void {
    this.api.outstanding(asOf).subscribe({
      next: data => this.outstandingRows = data,
      error: () => alert('Failed to load outstanding transactions.')
    });
  }

  loadCustomer(nic: string): void {
    this.api.customer(nic).subscribe({
      next: data => this.customerRows = data,
      error: () => alert('Failed to load customer transactions.')
    });
  }

  loadMaturity(date: string): void {
    this.api.maturity(date).subscribe({
      next: data => this.maturityRows = data,
      error: () => alert('Failed to load maturity date transactions.')
    });
  }
}
