import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import VoipPanel from "./VoipPanel";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      <VoipPanel />
    </div>
  );
}