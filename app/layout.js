import { Inter } from 'next/font/google';
import './globals.css';
import CustomCursor from './components/CustomCursor';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] });

export const metadata = {
  title: 'Zan the dev | Web Developer & Freelancer',
  description: 'Zan the dev — Freelance Web Developer & UI/UX Builder. I craft fast, modern, and responsive websites for businesses across Nigeria and beyond.',
  keywords: ['Zan the dev', 'web developer', 'freelance', 'Nigeria', 'portfolio', 'React', 'JavaScript', 'Firebase'],
  openGraph: {
    title: 'Zan the dev | Web Developer & Freelancer',
    description: 'Building modern web experiences for real businesses.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
