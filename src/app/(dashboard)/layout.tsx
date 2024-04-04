import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/ThemeToggle";
import { UserButton } from "@clerk/nextjs";
import React, { PropsWithChildren } from "react";

const DashboardPage = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex items-center justify-between border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
};

export default DashboardPage;
