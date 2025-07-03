import AuthRedirect from '@/components/AuthRedirect';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthRedirect>{children}</AuthRedirect>;
}
