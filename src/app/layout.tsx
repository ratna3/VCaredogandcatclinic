import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'VCare Dog and Cat Clinic - Premium Pet Healthcare',
  description:
    'VCare Dog and Cat Clinic provides premium veterinary care for all animals including dogs, cats, birds, and exotic pets. Expert veterinarians, modern facilities, and compassionate care.',
  keywords:
    'veterinary clinic, pet care, dog clinic, cat clinic, animal hospital, pet healthcare, veterinarian',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
