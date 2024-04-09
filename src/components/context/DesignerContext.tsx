"use client";

import { PropsWithChildren, createContext, useState } from "react";
import { FormElementInstance } from "../FormElements";

type DesignerContext = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
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

  return (
    <DesignerContext.Provider
      value={{ elements, addElement }}
    ></DesignerContext.Provider>
  );
}
