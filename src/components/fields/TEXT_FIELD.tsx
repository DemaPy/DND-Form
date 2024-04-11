import React, { useEffect } from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { MdTextFields } from "react-icons/md";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useDesigner from "../hooks/useDesigner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";

const type: ElementsType = "TEXT_FIELD";

const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeholder: "Value here...",
};

const TEXT_FIELD_FORM_ELEMENT: FormElement = {
  type: type,
  construct: (id) => {
    return {
      id: id,
      type: "TEXT_FIELD",
      extraAttributes: extraAttributes,
    };
  },
  designerButtonElement: {
    icon: <MdTextFields className="h-8 w-8 text-primary cursor-grab" />,
    label: "Text field",
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div className="text-white">Form component</div>,
  properties: PropertiesComponent,
};

const propertiesSchema = z.object({
  label: z.string().min(4).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
});

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { updateElement } = useDesigner();
  const element = elementInstance as FormElementInstance & {
    extraAttributes: typeof extraAttributes;
  };

  const form = useForm<z.infer<typeof propertiesSchema>>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeholder: element.extraAttributes.placeholder,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);
  const applyChanges = (values: z.infer<typeof propertiesSchema>) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...values,
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(ev) => ev.preventDefault()}
        onBlur={form.handleSubmit(applyChanges)}
      >
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>The label of the field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
          name="label"
          control={form.control}
        />

        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>The placeholder of the field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
          name="placeholder"
          control={form.control}
        />

        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper text</FormLabel>
              <FormControl>
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>The helper text of the field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
          name="helperText"
          control={form.control}
        />

        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-2">Is field required</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Decide whether the field is required
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          name="required"
          control={form.control}
        />
      </form>
    </Form>
  );
}

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as FormElementInstance & {
    extraAttributes: typeof extraAttributes;
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {elementInstance?.extraAttributes?.label || "Default"}
        {elementInstance?.extraAttributes?.required && "*"}
      </Label>
      <Input
        readOnly
        disabled
        placeholder={elementInstance?.extraAttributes?.placeholder || ""}
      />
      {elementInstance?.extraAttributes?.helperText && (
        <p className="text-muted-foreground text-[0.8rem]">
          {elementInstance?.extraAttributes?.helperText}
        </p>
      )}
    </div>
  );
}

export default TEXT_FIELD_FORM_ELEMENT;
