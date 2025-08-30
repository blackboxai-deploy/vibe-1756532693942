import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'African Students Eligibility Calculator',
  description: 'Calculate your eligibility for Indian university bachelor degree programs. Supporting all 54 African countries and major exam boards.',
  keywords: 'African students, Indian universities, eligibility calculator, admission requirements',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}