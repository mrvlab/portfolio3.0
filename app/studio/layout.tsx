export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`lg:font-[0.75rem]`}>{children}</div>;
}
