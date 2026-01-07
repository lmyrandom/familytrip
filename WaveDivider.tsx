/**
 * WaveDivider Component
 * Design: Nile River flowing narrative - organic wave shapes for section separation
 * Creates flowing transitions between sections with customizable colors
 */

interface WaveDividerProps {
  variant?: 'teal' | 'warm' | 'blue' | 'coral';
  flip?: boolean;
  className?: string;
}

export default function WaveDivider({ variant = 'teal', flip = false, className = '' }: WaveDividerProps) {
  const colors = {
    teal: '#1A535C',
    warm: '#C38D5E',
    blue: '#3498DB',
    coral: '#E67E22'
  };

  const fillColor = colors[variant];

  return (
    <div className={`w-full ${flip ? 'rotate-180' : ''} ${className}`} style={{ lineHeight: 0 }}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-20 lg:h-24"
      >
        <path
          d="M0,0 C300,80 600,80 900,40 C1050,20 1150,60 1200,80 L1200,120 L0,120 Z"
          fill={fillColor}
          opacity="0.3"
        />
        <path
          d="M0,20 C300,100 600,60 900,80 C1050,90 1150,40 1200,60 L1200,120 L0,120 Z"
          fill={fillColor}
          opacity="0.5"
        />
        <path
          d="M0,40 C300,80 600,100 900,60 C1050,40 1150,80 1200,100 L1200,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
