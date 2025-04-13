/**
 * Format a date for export (ISO format)
 */
export function formatDateForExport(date) {
    const d = new Date(date);
    return d.toISOString();
  }
  
  /**
   * Format a date for display (locale format)
   */
  export function formatDateForDisplay(date) {
    const d = new Date(date);
    return d.toLocaleString();
  }
  
  /**
   * Format ID type for display
   */
  export function formatIdType(idType) {
    const types = {
      'AADHAR_CARD': 'Aadhar Card',
      'DRIVING_LICENSE': 'Driving License'
    };
    return types[idType] || idType;
  }
  
  /**
   * Convert records to CSV format
   */
  export function recordsToCSV(records) {
    // Define CSV headers
    const headers = [
      'ID',
      'Name',
      'Mobile Number',
      'ID Number',
      'ID Type',
      'Vehicle Number',
      'Pickup Date/Time',
      'Amount Paid',
      'Created At',
      'Updated At'
    ].join(',');
    
    // Map records to CSV rows
    const rows = records.map(record => [
      record.id,
      `"${(record.name || '').replace(/"/g, '""')}"`, // Escape quotes in name
      `"${record.mobileNumber || ''}"`,
      `"${record.idNumber || ''}"`,
      record.idType || '',
      `"${record.vehicleNumber || ''}"`,
      formatDateForExport(record.pickupDateTime),
      record.amountPaid || '0',
      formatDateForExport(record.createdAt),
      formatDateForExport(record.updatedAt)
    ].join(','));
    
    return [headers, ...rows].join('\n');
  }
  
  /**
   * Convert a single record to a human-readable object for display or export
   */
  export function formatRecordForDisplay(record) {
    if (!record) return null;
    
    return {
      ...record,
      idTypeFormatted: formatIdType(record.idType),
      pickupDateTimeFormatted: formatDateForDisplay(record.pickupDateTime),
      createdAtFormatted: formatDateForDisplay(record.createdAt),
      updatedAtFormatted: formatDateForDisplay(record.updatedAt)
    };
  }
  
  /**
   * Convert records array to formatted array for display or export
   */
  export function formatRecordsForDisplay(records) {
    return records.map(formatRecordForDisplay);
  }
  
  /**
   * Generate a filename for export based on the current date
   */
  export function generateExportFilename(format = 'csv', prefix = 'transport-records') {
    const date = new Date().toISOString().split('T')[0];
    return `${prefix}-${date}.${format}`;
  }