"use client";

import { PropsWithChildren, createContext, useState } from "react";
import { FormElementInstance } from "../FormElements";

type DesignerContext = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
};

export const DesignerContext = createContext<DesignerContext | null>(null);

export default function DesignerContextProvider({
  children,
}: PropsWithChildren) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const prevElements = [...prev];
      prevElements.splice(index, 0, element);
      return prevElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <DesignerContext.Provider value={{ elements, addElement, removeElement }}>
      {children}
    </DesignerContext.Provider>
  );
}
