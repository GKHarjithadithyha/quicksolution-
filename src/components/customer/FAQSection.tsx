import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'Are the service prices fixed upfront?',
    a: 'Yes. Every service page lists the fixed price and exactly what tasks are included. If extra spare parts or work outside the listed scope are needed, they are discussed before proceeding.'
  },
  {
    q: 'How does UPI QR payment and verification work?',
    a: 'After confirming your appointment details, you will see a static UPI QR code and the exact payable amount. Pay using any UPI app (GPay, PhonePe, Paytm, BHIM) and submit your transaction reference number. Our team verifies the reference and updates your booking status.'
  },
  {
    q: 'Can I browse services without creating an account?',
    a: 'Yes. You can browse all categories, compare prices, and review service details without logging in. You only need to sign in or register when you are ready to book.'
  },
  {
    q: 'How do I track my booking status?',
    a: 'Open My Bookings from the navigation bar and select your booking to view the step-by-step progress timeline, payment verification status, and assigned partner details.'
  },
  {
    q: 'Do I need to enable GPS location to book a service?',
    a: 'No. You can enter your service address manually at any time. Using your current device location is completely optional and only requested if you tap "Use Current Location".'
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.q}
            className="bg-white border border-[#DDE3E8] rounded-2xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F7F9F4] transition-colors"
            >
              <span className="text-sm sm:text-base font-semibold text-[#172B4D]">
                {item.q}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#667085] shrink-0 transition-transform ${
                  isOpen ? 'rotate-180 text-[#172B4D]' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm text-[#475467] leading-relaxed border-t border-[#DDE3E8] pt-3">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
