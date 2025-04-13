import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import FormInput from './ui/FormInput';
import FormSelect from './ui/FormSelect';
import DateTimePicker from './ui/DateTimePicker';

const TransportRecordForm = ({ initialData = null }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pickupDateTime, setPickupDateTime] = useState(
    initialData?.pickupDateTime ? new Date(initialData.pickupDateTime) : new Date()
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: initialData || {
      name: '',
      mobileNumber: '',
      idNumber: '',
      idType: '',
      vehicleNumber: '',
      amountPaid: ''
    }
  });

  const idTypeOptions = [
    { value: 'AADHAR_CARD', label: 'Aadhar Card' },
    { value: 'DRIVING_LICENSE', label: 'Driving License' }
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');

    // Add the pickup date/time to the form data
    const formData = {
      ...data,
      pickupDateTime: pickupDateTime.toISOString()
    };

    try {
      // Determine if we're creating a new record or updating an existing one
      const url = initialData 
        ? `/api/transport-records/${initialData.id}` 
        : '/api/transport-records';
        
      const method = initialData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save record');
      }

      // Success! Redirect to the records list
      if (!initialData) {
        reset(); // Only reset the form if creating a new record
        setPickupDateTime(new Date());
      }
      
      // Show success alert and redirect
      alert('Record saved successfully!');
      router.push('/transport-records');
      router.refresh();
    } catch (error) {
      console.error('Error saving record:', error);
      setErrorMessage(error.message || 'An error occurred while saving the record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal Information */}
        <FormInput
          label="Name"
          name="name"
          register={register}
          errors={errors}
          required
          rules={{ 
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters'
            }
          }}
        />

        <FormInput
          label="Mobile Number"
          name="mobileNumber"
          register={register}
          errors={errors}
          required
          rules={{
            required: 'Mobile number is required',
            pattern: {
              value: /^\d{10}$/,
              message: 'Please enter a valid 10-digit mobile number'
            }
          }}
        />

        {/* ID Information */}
        <FormSelect
          label="ID Type"
          name="idType"
          register={register}
          errors={errors}
          required
          options={idTypeOptions}
          rules={{ required: 'Please select an ID type' }}
        />

        <FormInput
          label="ID Number"
          name="idNumber"
          register={register}
          errors={errors}
          required
          rules={{ required: 'ID number is required' }}
        />

        {/* Vehicle Information */}
        <FormInput
          label="Vehicle Number"
          name="vehicleNumber"
          register={register}
          errors={errors}
          required
          rules={{ required: 'Vehicle number is required' }}
        />

        {/* Use custom DateTimePicker component for pickup time */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Date and Time <span className="text-red-500">*</span>
          </label>
          <DateTimePicker
            name="pickupDateTime"
            errors={errors}
            value={pickupDateTime}
            onChange={(date) => setPickupDateTime(date)}
            required
          />
          {errors.pickupDateTime && (
            <p className="mt-1 text-sm text-red-500">{errors.pickupDateTime.message}</p>
          )}
        </div>

        {/* Payment Information */}
        <FormInput
          label="Amount Paid"
          name="amountPaid"
          register={register}
          errors={errors}
          type="number"
          step="0.01"
          required
          rules={{
            required: 'Amount is required',
            min: {
              value: 0,
              message: 'Amount cannot be negative'
            },
            validate: value => !isNaN(parseFloat(value)) || 'Please enter a valid number'
          }}
        />
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          onClick={() => router.push('/transport-records')}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          disabled={loading}
        >
          {loading ? 'Saving...' : initialData ? 'Update Record' : 'Save Record'}
        </button>
      </div>
    </form>
  );
};

export default TransportRecordForm;