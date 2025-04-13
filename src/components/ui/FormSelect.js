import React from 'react';

const FormSelect = ({ 
  label, 
  name, 
  register, 
  errors, 
  options = [], 
  placeholder = 'Select an option',
  required = false,
  ...rest 
}) => {
    return (
        <div className="mb-4">
          <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <select
            id={name}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-gray-900
              ${errors[name] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            {...register(name)}
            {...rest}
          >
            <option value="">{placeholder}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors[name] && (
            <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
          )}
        </div>
      );
};

export default FormSelect;