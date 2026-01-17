import Loading from "@/components/reused/Loading";
import { AlertProvider } from "@/context/AlertContext";
import { Suspense } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <AlertProvider>{children}</AlertProvider>
      </Suspense>
    </>
  );
}
