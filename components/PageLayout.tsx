import React from 'react';
import Navigation from '@/components/Navigation';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  maxWidth?: 'narrow' | 'medium' | 'wide';
}

export default function PageLayout({ children, title, maxWidth = 'wide' }: PageLayoutProps) {
  const widthClasses = {
    narrow: 'max-w-3xl',
    medium: 'max-w-4xl',
    wide: 'max-w-5xl'
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      <div className="pt-20">
        <div className={`${widthClasses[maxWidth]} mx-auto px-4 py-8`}>
          {title && (
            <h1 className="text-3xl font-bold text-white mb-6">{title}</h1>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
