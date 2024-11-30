"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";

import { BsFileEarmark } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { FormSchemaType, formSchema } from "../../schemas/form";
import { createForm } from "../../actions/form";
import { useRouter } from "next/navigation";

const CreateFormBtn = () => {
  const router = useRouter();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormSchemaType) => {
    try {
      const formId = await createForm(values);
      toast.success("Form created successfully.");
      router.push(`/builder/${formId}`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4">
          <BsFileEarmark className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
            Create new form
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create form</DialogTitle>
          <DialogDescription>
            Create new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name{" "}
                    <span className="text-xs text-primary">(required)</span>
                    <FormControl>
                      <Input placeholder="Enter form name" {...field} />
                    </FormControl>
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description{" "}
                    <span className="text-xs text-muted-foreground">
                      (optional)
                    </span>
                    <FormControl>
                      <Textarea
                        placeholder="Enter form description"
                        rows={8}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormLabel>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="w-full mt-4"
          >
            {!form.formState.isSubmitting && <span>Save</span>}
            {form.formState.isSubmitting && (
              <ImSpinner2 className="animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormBtn;
