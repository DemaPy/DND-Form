"use client";

import { Form } from "@prisma/client";
import SaveFormBtn from "../SaveFormBtn";
import PublishFormBtn from "../PublishFormBtn";
import PreviewDialogBtn from "../PreviewDialogBtn";
import Designer from "../Designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "../DragOverlayWrapper";
import { useEffect } from "react";
import useDesigner from "../hooks/useDesigner";
import PublishedForm from "../PublishedForm";
import FormBuilderTitle from "./FormBuilderTitle";

const FormBuilder = ({ form }: { form: Form }) => {
  const { setElements } = useDesigner();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    const JSONElements = JSON.parse(form.content);
    setElements(JSONElements);
  }, [form]);

  if (form.published) {
    return <PublishedForm form={form} />;
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <FormBuilderTitle title={form.name} />
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
                <PublishFormBtn id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/bg.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
