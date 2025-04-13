import { formatDateForDisplay, formatIdType } from './exportUtils';

/**
 * Generate a printable HTML representation of records
 */
export function generatePrintableHTML(records, title = 'Transport Records') {
  // Generate the HTML table with records
  const tableRows = records.map(record => `
    <tr>
      <td>${record.id}</td>
      <td>${record.name || ''}</td>
      <td>${record.mobileNumber || ''}</td>
      <td>
        <div>${formatIdType(record.idType) || ''}</div>
        <div class="id-number">${record.idNumber || ''}</div>
      </td>
      <td>${record.vehicleNumber || ''}</td>
      <td>${formatDateForDisplay(record.pickupDateTime)}</td>
      <td>₹${record.amountPaid || '0'}</td>
    </tr>
  `).join('');

  // Generate a full HTML document with styles
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          color: #333;
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px 12px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .id-number {
          font-size: 0.85em;
          color: #666;
        }
        .print-date {
          text-align: right;
          font-size: 0.8em;
          color: #666;
          margin-bottom: 20px;
        }
        .no-records {
          text-align: center;
          padding: 30px;
          font-style: italic;
          color: #666;
        }
        @media print {
          body {
            padding: 0;
          }
          .no-print {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      
      <div class="print-date">
        Printed on: ${new Date().toLocaleString()}
      </div>
      
      ${records.length > 0 ? `
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>ID Info</th>
              <th>Vehicle</th>
              <th>Pickup Time</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
        
        <div>Total Records: ${records.length}</div>
      ` : `
        <div class="no-records">
          No records found.
        </div>
      `}
      
      <div class="no-print">
        <button onclick="window.print()">Print</button>
        <button onclick="window.close()">Close</button>
      </div>
    </body>
    </html>
  `;
  
  return html;
}

/**
 * Open a new window with printable records
 */
export function printRecords(records, title = 'Transport Records') {
  const html = generatePrintableHTML(records, title);
  
  // Open a new window and write the HTML content
  const printWindow = window.open('', '_blank');
  printWindow.document.write(html);
  printWindow.document.close();
  
  // Focus and print after a slight delay to ensure content is loaded
  setTimeout(() => {
    printWindow.focus();
    // Uncomment the next line to automatically trigger print dialog
    // printWindow.print();
  }, 300);
}