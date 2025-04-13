import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Retrieve all transport records
export async function GET(request) {
  try {
    // Parse URL search params for potential filtering/sorting
    const { searchParams } = new URL(request.url);
    
    // Handle pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Handle search and filtering
    const search = searchParams.get('search') || '';
    const idType = searchParams.get('idType') || '';
    
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
    
    // Get total count with filters applied
    const totalCount = await prisma.transportRecord.count({ where });
    
    // Get records with pagination and filters
    const records = await prisma.transportRecord.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        pickupDateTime: 'desc',
      },
    });

    return NextResponse.json({
      records,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching transport records:', error);
    return NextResponse.json({ error: 'Failed to fetch transport records' }, { status: 500 });
  }
}

// POST - Create a new transport record
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Import validation
    const { validateTransportRecord } = await import('@/lib/validation');
    const { isValid, errors } = validateTransportRecord(data);
    
    if (!isValid) {
      return NextResponse.json({ errors }, { status: 400 });
    }
    
    // Convert pickupDateTime string to Date object if it's not already
    if (typeof data.pickupDateTime === 'string') {
      data.pickupDateTime = new Date(data.pickupDateTime);
    }
    
    // Convert amountPaid to a proper number if it's a string
    if (typeof data.amountPaid === 'string') {
      data.amountPaid = parseFloat(data.amountPaid);
    }
    
    const newRecord = await prisma.transportRecord.create({
      data: {
        name: data.name,
        mobileNumber: data.mobileNumber,
        idNumber: data.idNumber,
        idType: data.idType,
        vehicleNumber: data.vehicleNumber,
        pickupDateTime: data.pickupDateTime,
        amountPaid: data.amountPaid
      }
    });
    
    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error('Error creating transport record:', error);
    return NextResponse.json({ error: 'Failed to create transport record' }, { status: 500 });
  }
}