import { AlertProvider } from "@/context/AlertContext";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AlertProvider>{children}</AlertProvider>
    </>
  );
}
