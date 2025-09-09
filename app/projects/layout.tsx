export default async function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className='grid p-5 gap-5'>{children}</main>;
}
