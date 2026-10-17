import React from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeInSection({
  children,
  className = '',
}: FadeInSectionProps) {
  return (
    <div className={`transition-opacity duration-300 ${className}`}>
      {children}
    </div>
  );
}
