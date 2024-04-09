"use client";

import { PropsWithChildren, createContext, useState } from "react";
import { FormElementInstance } from "../FormElements";

type DesignerContext = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;

  selectedElement: FormElementInstance | null;
  setSelectedElement: (element: FormElementInstance | null) => void;
  updateElement: (id: string, data: FormElementInstance) => void;
};

export const DesignerContext = createContext<DesignerContext | null>(null);

export default function DesignerContextProvider({
  children,
}: PropsWithChildren) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);

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

  const _setSelectedElement = (element: FormElementInstance | null) => {
    setSelectedElement(element);
  };

  const updateElement = (id: string, data: FormElementInstance) => {
    setElements((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return data;
        }
        return item;
      });
    });
  };

  return (
    <DesignerContext.Provider
      value={{
        updateElement,
        setSelectedElement: _setSelectedElement,
        selectedElement,
        elements,
        addElement,
        removeElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
