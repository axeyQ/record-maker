import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// This ensures the Prisma Client is only initiated once during runtime
let db = prisma;

// GET - Fetch a single transport record by ID
export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }
    
    const record = await db.transportRecord.findUnique({
      where: { id }
    });
    
    if (!record) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }
    
    return NextResponse.json(record);
  } catch (error) {
    console.error('Error fetching transport record:', error);
    return NextResponse.json({ error: 'Failed to fetch transport record' }, { status: 500 });
  }
}

// PUT - Update a transport record
export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }
    
    const data = await request.json();
    
    // If we're updating multiple fields, validate them
    if (Object.keys(data).length > 1) {
      // Get the existing record to merge with the updates for validation
      const existingRecord = await db.transportRecord.findUnique({
        where: { id }
      });
      
      if (!existingRecord) {
        return NextResponse.json({ error: 'Record not found' }, { status: 404 });
      }
      
      const { validateTransportRecord } = await import('@/lib/validation');
      const recordToValidate = { ...existingRecord, ...data };
      const { isValid, errors } = validateTransportRecord(recordToValidate);
      
      if (!isValid) {
        return NextResponse.json({ errors }, { status: 400 });
      }
    }
    
    // Convert pickupDateTime string to Date object if needed
    if (data.pickupDateTime && typeof data.pickupDateTime === 'string') {
      data.pickupDateTime = new Date(data.pickupDateTime);
    }
    
    // Convert amountPaid to a proper number if it's a string
    if (data.amountPaid !== undefined && typeof data.amountPaid === 'string') {
      data.amountPaid = parseFloat(data.amountPaid);
    }
    
    // Check if record exists
    const existingRecord = await db.transportRecord.findUnique({
      where: { id }
    });
    
    if (!existingRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }
    
    // Update record
    const updatedRecord = await db.transportRecord.update({
      where: { id },
      data
    });
    
    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error('Error updating transport record:', error);
    return NextResponse.json({ error: 'Failed to update transport record' }, { status: 500 });
  }
}

// DELETE - Delete a transport record
export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }
    
    // Check if record exists
    const existingRecord = await db.transportRecord.findUnique({
      where: { id }
    });
    
    if (!existingRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }
    
    // Delete record
    await db.transportRecord.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting transport record:', error);
    return NextResponse.json({ error: 'Failed to delete transport record' }, { status: 500 });
  }
}