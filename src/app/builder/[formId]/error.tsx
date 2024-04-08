"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const error = ({ error }: { error: Error }) => {
  return (
    <div className="flex w-full h-full flex-col items-center justify-center">
      <h2 className="text-destructive text-4xl">
        Something went wrong! Please try again later.
      </h2>
      <Button asChild>
        <Link href={"/"}>Home</Link>
      </Button>
    </div>
  );
};

export default error;
