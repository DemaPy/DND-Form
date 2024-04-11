"use client";

import Confetti from "react-confetti";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Form } from "@prisma/client";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type TPublishedForm = {
  form: Form;
};

const PublishedForm = ({ form }: TPublishedForm) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  let url = `${window.location.origin}/submit/${form.shareUrl}`;
  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={1000}
      />
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="max-w-md">
          <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
            🎊🎊 Form Published 🎊🎊
          </h1>
          <h2 className="text-2xl">Share this form</h2>
          <h3 className="text-xl text-muted-foreground border-b pb-10">
            Anyone with the link can view and submit the form
          </h3>
          <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
            <Input className="w-full" readOnly value={url} />
            <Button
              className="mt-2 w-full"
              onClick={() => {
                navigator.clipboard.writeText(url);
                toast.success("Link copied to clipboard");
              }}
            >
              Copy link
            </Button>
          </div>
          <div className="flex justify-between">
            <Button variant={"link"} asChild>
              <Link href={"/"} className="gap-2">
                <BsArrowLeft />
                Go back home
              </Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link href={`/forms/${form.id}`} className="gap-2">
                Form details
                <BsArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublishedForm;
