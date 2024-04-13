import '@/app/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='bg-[#222222]'>{children}</body>
    </html>
  );
}
