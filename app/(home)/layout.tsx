export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='grid p-5 gap-5 min-h-svh md:h-screen'>{children}</main>
  );
}
