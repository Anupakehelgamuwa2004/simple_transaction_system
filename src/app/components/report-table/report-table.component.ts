import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table class="report-table">
      <thead>
        <tr>
          <th *ngFor="let c of columns">{{ prettify(c) }}</th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let row of rows">
          <td *ngFor="let c of columns">{{ row[c] }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./report-table.component.css']
})
export class ReportTableComponent {
  @Input() rows: any[] = [];
  @Input() columns: string[] = [];

  /** Turns camelCase into "Camel Case" for the header */
  prettify(col: string) {
    return col.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
  }
}
