import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Workforce Attendance', description: 'Multi-location workforce attendance and payroll readiness' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
