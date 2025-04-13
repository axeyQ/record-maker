// Validate a transport record
export function validateTransportRecord(data) {
    const errors = {};
    
    // Name validation
    if (!data.name) {
      errors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    // Mobile number validation
    if (!data.mobileNumber) {
      errors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(data.mobileNumber.replace(/\D/g, ''))) {
      errors.mobileNumber = 'Mobile number must be 10 digits';
    }
    
    // ID number validation
    if (!data.idNumber) {
      errors.idNumber = 'ID number is required';
    }
    
    // ID type validation
    if (!data.idType) {
      errors.idType = 'ID type is required';
    } else if (!['AADHAR_CARD', 'DRIVING_LICENSE'].includes(data.idType)) {
      errors.idType = 'ID type must be either Aadhar Card or Driving License';
    }
    
    // Vehicle number validation
    if (!data.vehicleNumber) {
      errors.vehicleNumber = 'Vehicle number is required';
    }
    
    // Pickup date/time validation
    if (!data.pickupDateTime) {
      errors.pickupDateTime = 'Pickup date and time is required';
    } else {
      const pickupDate = new Date(data.pickupDateTime);
      if (isNaN(pickupDate.getTime())) {
        errors.pickupDateTime = 'Invalid date format';
      }
    }
    
    // Amount paid validation
    if (data.amountPaid === undefined || data.amountPaid === null) {
      errors.amountPaid = 'Amount paid is required';
    } else if (isNaN(parseFloat(data.amountPaid))) {
      errors.amountPaid = 'Amount paid must be a number';
    } else if (parseFloat(data.amountPaid) < 0) {
      errors.amountPaid = 'Amount paid cannot be negative';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }