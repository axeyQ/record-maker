import React from 'react';

const FormInput = ({ 
  label, 
  name, 
  register, 
  errors, 
  type = 'text', 
  placeholder = '',
  required = false,
  ...rest 
}) => {
    return (
        <div className="mb-4">
          <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <input
            type={type}
            id={name}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-gray-900
              ${errors[name] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            {...register(name)}
            {...rest}
          />
          {errors[name] && (
            <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
          )}
        </div>
      );
};

export default FormInput;