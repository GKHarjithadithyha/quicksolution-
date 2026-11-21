import React from 'react';

interface QuickSolutionLogoProps {
  variant?: 'horizontal' | 'stacked' | 'mark';
  theme?: 'light' | 'dark';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const QuickSolutionMark: React.FC<{
  size?: number;
  theme?: 'light' | 'dark';
  framed?: boolean;
}> = ({ size = 38, theme = 'light', framed = false }) => {
  const qFill = theme === 'dark' || framed ? '#FFFFFF' : '#172B4D';
  const strokeColor = framed ? '#172B4D' : theme === 'dark' ? '#172B4D' : '#172B4D';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      {framed && <rect width="64" height="64" rx="16" fill="#172B4D" />}
      {/* Bold Rounded Italic-Inspired Q Mark */}
      <path
        d="M33.2 11C19.6 11 10.5 19.8 9.2 31.8C7.9 43.8 15.8 52 29.4 52C34.4 52 38.9 50.6 42.6 48.2L44.2 44.5C47.8 40.9 50.2 36 50.8 30.6C52.1 19 45.2 11 33.2 11ZM30.1 42.2C23.5 42.2 19.6 38 20.3 31.6C21 25.1 25.5 20.8 32.1 20.8C38.6 20.8 42.3 25 41.6 31.4C40.9 37.9 36.7 42.2 30.1 42.2Z"
        fill={qFill}
      />
      {/* Integrated Electric-Lime Lightning Bolt Tail */}
      <path
        d="M37.5 34.5L51.5 34.5L45.2 42.4L53.8 42.4L34.5 58.2L40.4 46.2L32.8 46.2L37.5 34.5Z"
        fill="#B9FF66"
        stroke={strokeColor}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const QuickSolutionLogo: React.FC<QuickSolutionLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  showTagline = false,
  size = 'md'
}) => {
  const textColor = theme === 'dark' ? 'text-white' : 'text-[#172B4D]';
  const taglineColor = theme === 'dark' ? 'text-white/75' : 'text-[#475467]';

  if (variant === 'mark') {
    const px = size === 'lg' ? 52 : size === 'sm' ? 32 : 40;
    return <QuickSolutionMark size={px} theme={theme} framed />;
  }

  if (variant === 'stacked') {
    return (
      <div className="inline-flex flex-col items-center text-center gap-2 select-none">
        <QuickSolutionMark size={size === 'lg' ? 60 : 48} theme={theme} framed />
        <div className="leading-none">
          <div
            className={`font-heading font-extrabold italic tracking-tight ${textColor} ${
              size === 'lg' ? 'text-2xl' : 'text-xl'
            }`}
          >
            Quick
            <br />
            Solution
          </div>
          {showTagline && (
            <div className={`text-xs font-medium mt-1.5 ${taglineColor}`}>
              Every Need. One Quick Solution.
            </div>
          )}
        </div>
      </div>
    );
  }

  // Horizontal lockup (Q left, Quick Solution right)
  const markSize = size === 'lg' ? 44 : size === 'sm' ? 32 : 38;

  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      <QuickSolutionMark size={markSize} theme={theme} />
      <div className="leading-tight">
        <span
          className={`font-heading font-extrabold italic tracking-tight block ${textColor} ${
            size === 'lg' ? 'text-xl' : size === 'sm' ? 'text-base' : 'text-lg'
          }`}
        >
          Quick Solution
        </span>
        {showTagline && (
          <span className={`text-[10px] font-medium block ${taglineColor}`}>
            Every Need. One Quick Solution.
          </span>
        )}
      </div>
    </div>
  );
};
