import React, { useState } from 'react';

interface TransactionReferenceFormProps {
  initialValue?: string;
  onSubmit: (reference: string) => void;
  isSubmitting?: boolean;
}

export const TransactionReferenceForm: React.FC<TransactionReferenceFormProps> = ({
  initialValue = '',
  onSubmit,
  isSubmitting = false
}) => {
  const [reference, setReference] = useState(initialValue);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = reference.trim();
    if (trimmed.length < 6) {
      setError('Please enter a valid UPI transaction reference (at least 6 characters).');
      return;
    }
    setError('');
    onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="upi-reference"
          className="block text-sm font-medium text-[#202936] mb-1.5"
        >
          Enter UPI transaction reference
        </label>
        <input
          id="upi-reference"
          type="text"
          value={reference}
          onChange={(e) => {
            setReference(e.target.value);
            if (error) setError('');
          }}
          placeholder="e.g. 412356789012"
          className={`w-full h-12 px-4 bg-white border rounded-xl text-sm font-mono text-[#202936] placeholder:text-[#737D89] outline-none focus:ring-2 ${
            error
              ? 'border-[#D94B4B] focus:ring-[#D94B4B]/20'
              : 'border-[#E8EAED] focus:border-[#142D4E] focus:ring-[#142D4E]/15'
          }`}
        />
        {error && <p className="text-xs text-[#D94B4B] mt-1.5">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-60 text-white font-semibold text-sm sm:text-base rounded-xl transition-colors cursor-pointer"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Payment Details'}
      </button>
    </form>
  );
};
