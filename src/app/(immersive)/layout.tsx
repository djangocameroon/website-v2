// Immersive pages (newsletter subscription) hide the global Navbar; the
// global Footer still renders.
export default function ImmersiveLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
