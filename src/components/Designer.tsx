"use client";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import DesignerSidebar from "./DesignerSidebar";
import { cn } from "@/lib/utils";
import { ElementType, useState } from "react";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./FormElements";
import useDesigner from "./hooks/useDesigner";
import { idGenerator } from "@/lib/idGenerator";
import { Button } from "./ui/button";
import { BiSolidTrash } from "react-icons/bi";

const Designer = () => {
  const { removeElement, addElement, elements } = useDesigner();
  const dropable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (ev: DragEndEvent) => {
      const { active, over } = ev;

      if (!active || !over) return;

      const isDesignerBtnElement =
        active.data?.current?.isDesignerButtonElement;

      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        addElement(0, newElement);
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div
          ref={dropable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col items-center justify-start flex-1 overflow-y-auto",
            dropable.isOver && "ring-2 ring-primary/20"
          )}
        >
          {!dropable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {dropable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper
                  removeElement={removeElement}
                  key={element.id}
                  element={element}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

function DesignerElementWrapper({
  removeElement,
  element,
}: {
  removeElement: (id: string) => void;
  element: FormElementInstance;
}) {
  const [mouseOver, setMouseOver] = useState(false);
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTop: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottom: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
    >
      <div
        ref={topHalf.setNodeRef}
        className={cn(
          "absolute w-full h-1/3 rounded-t-md",
          topHalf.isOver && "bg-slate-50/20"
        )}
      />
      <div
        ref={bottomHalf.setNodeRef}
        className={cn(
          "absolute bottom-0 w-full h-1/3 rounded-b-md",
          bottomHalf.isOver && "bg-slate-50/20"
        )}
      />
      {mouseOver && (
        <>
          <div className="absolute right-0">
            <Button
              onClick={() => removeElement(element.id)}
              variant={"outline"}
              className="flex justify-center h-full border rounded-md"
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      <div className="flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none">
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
}

export default Designer;
