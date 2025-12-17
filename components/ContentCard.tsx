import React from 'react';

interface ContentCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function ContentCard({ children, className = '' }: ContentCardProps) {
  return (
    <div className={`bg-white rounded-xl p-8 shadow-2xl ${className}`}>
      {children}
    </div>
  );
}
