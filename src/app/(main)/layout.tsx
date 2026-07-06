import { Navbar } from "@/components/layout";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="fixed top-0 z-30 w-full overflow-hidden">
        <Navbar />
      </div>
      {children}
    </>
  );
}
