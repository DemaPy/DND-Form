"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const error = ({ error }: { error: Error }) => {
  const message = error.message || "";
  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-4">
      <p className="text-muted-foreground">Oooops... something went wrong.</p>
      <h2 className="text-primary font-bold text-4xl">{message}</h2>
      <Button asChild>
        <Link href={"/"}>Home</Link>
      </Button>
    </div>
  );
};

export default error;
