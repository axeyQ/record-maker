import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { recordsToCSV, generateExportFilename, formatRecordsForDisplay } from '@/lib/exportUtils';

// GET - Export records (Query param ?format=csv or ?format=json)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    
    // Handle search and filtering for exports
    const search = searchParams.get('search') || '';
    const idType = searchParams.get('idType') || '';
    const includeSystemFields = searchParams.get('includeSystemFields') !== 'false';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    // Build the where clause for filtering
    const where = {};
    
    // Add search condition if search term is provided
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { mobileNumber: { contains: search } },
        { idNumber: { contains: search } },
        { vehicleNumber: { contains: search } }
      ];
    }
    
    // Add ID type filter if provided
    if (idType) {
      where.idType = idType;
    }
    
    // Add date range filter if provided
    if (startDate || endDate) {
      where.pickupDateTime = {};
      
      if (startDate) {
        where.pickupDateTime.gte = new Date(startDate);
      }
      
      if (endDate) {
        // Set to end of day
        const endDateObj = new Date(endDate);
        endDateObj.setHours(23, 59, 59, 999);
        where.pickupDateTime.lte = endDateObj;
      }
    }
    
    // Determine which fields to select based on includeSystemFields
    const select = includeSystemFields 
      ? undefined // Select all fields
      : {
          id: true,
          name: true,
          mobileNumber: true,
          idNumber: true,
          idType: true,
          vehicleNumber: true,
          pickupDateTime: true,
          amountPaid: true,
          // Exclude system fields like createdAt, updatedAt
        };
    
    // Get records with filters for export
    const records = await prisma.transportRecord.findMany({
      where,
      select,
      orderBy: {
        pickupDateTime: 'desc',
      },
    });
    
    if (format.toLowerCase() === 'csv') {
      // Generate CSV content
      const csvContent = recordsToCSV(records);
      
      // Generate filename
      const filename = generateExportFilename('csv');
      
      // Set response headers for CSV download
      const headers = new Headers();
      headers.set('Content-Type', 'text/csv');
      headers.set('Content-Disposition', `attachment; filename="${filename}"`);
      
      return new Response(csvContent, {
        status: 200,
        headers
      });
    } else {
      // Format records for JSON export
      const formattedRecords = formatRecordsForDisplay(records);
      
      // Return JSON format
      return NextResponse.json(formattedRecords);
    }
  } catch (error) {
    console.error('Error exporting transport records:', error);
    return NextResponse.json({ error: 'Failed to export transport records' }, { status: 500 });
  }
}