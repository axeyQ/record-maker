import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateTimePicker = ({ 
  label, 
  name, 
  errors, 
  value,
  onChange,
  required = false,
  ...rest 
}) => {
    return (
        <div className="mb-4">
          <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <div className={`${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-md`}>
            <DatePicker
              id={name}
              selected={value}
              onChange={onChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              {...rest}
            />
          </div>
          {errors[name] && (
            <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
          )}
        </div>
      );
};

export default DateTimePicker;