import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentQRPanelProps {
  upiId?: string;
  beneficiaryName?: string;
}

export const PaymentQRPanel: React.FC<PaymentQRPanelProps> = ({
  upiId = 'homeservices.pay@upi',
  beneficiaryName = 'Home Services Marketplace'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast.success('UPI ID copied');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#F5F5F0] border border-[#E8EAED] rounded-2xl p-6 flex flex-col items-center gap-4">
      <div className="bg-white p-4 rounded-xl border border-[#E8EAED]">
        <div className="w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#142D4E]" aria-label="Static UPI QR Code">
            <rect x="2" y="2" width="28" height="28" fill="currentColor" rx="2" />
            <rect x="6" y="6" width="20" height="20" fill="white" rx="1" />
            <rect x="10" y="10" width="12" height="12" fill="currentColor" />

            <rect x="70" y="2" width="28" height="28" fill="currentColor" rx="2" />
            <rect x="74" y="6" width="20" height="20" fill="white" rx="1" />
            <rect x="78" y="10" width="12" height="12" fill="currentColor" />

            <rect x="2" y="70" width="28" height="28" fill="currentColor" rx="2" />
            <rect x="6" y="74" width="20" height="20" fill="white" rx="1" />
            <rect x="10" y="78" width="12" height="12" fill="currentColor" />

            <rect x="38" y="6" width="7" height="7" fill="currentColor" />
            <rect x="50" y="6" width="7" height="7" fill="currentColor" />
            <rect x="44" y="18" width="7" height="7" fill="currentColor" />
            <rect x="56" y="22" width="7" height="7" fill="currentColor" />
            <rect x="8" y="38" width="7" height="7" fill="currentColor" />
            <rect x="22" y="42" width="7" height="7" fill="currentColor" />
            <rect x="38" y="38" width="7" height="7" fill="currentColor" />
            <rect x="48" y="46" width="10" height="10" fill="#142D4E" rx="1" />
            <rect x="64" y="38" width="7" height="7" fill="currentColor" />
            <rect x="78" y="44" width="7" height="7" fill="currentColor" />
            <rect x="88" y="38" width="7" height="7" fill="currentColor" />
            <rect x="12" y="54" width="7" height="7" fill="currentColor" />
            <rect x="30" y="56" width="7" height="7" fill="currentColor" />
            <rect x="40" y="68" width="7" height="7" fill="currentColor" />
            <rect x="54" y="66" width="7" height="7" fill="currentColor" />
            <rect x="68" y="68" width="7" height="7" fill="currentColor" />
            <rect x="82" y="64" width="7" height="7" fill="currentColor" />
            <rect x="46" y="82" width="7" height="7" fill="currentColor" />
            <rect x="60" y="84" width="7" height="7" fill="currentColor" />
            <rect x="74" y="80" width="7" height="7" fill="currentColor" />
            <rect x="86" y="86" width="7" height="7" fill="currentColor" />
          </svg>
        </div>
      </div>

      <div className="text-center space-y-1">
        <div className="text-xs text-[#737D89]">Beneficiary</div>
        <div className="text-sm font-semibold text-[#202936]">{beneficiaryName}</div>
      </div>

      <div className="w-full max-w-sm bg-white border border-[#E8EAED] rounded-xl px-4 py-2.5 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[11px] text-[#737D89]">UPI ID</div>
          <div className="text-sm font-mono font-medium text-[#202936] truncate select-all">
            {upiId}
          </div>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F5F0] hover:bg-[#E8EAED] text-[#142D4E] text-xs font-semibold transition-colors cursor-pointer shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#20A779]" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
};
