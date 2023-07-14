import { createContext, useContext, useState } from "react";

interface SelectedValueContextType {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const SelectedValueContext = createContext<
  SelectedValueContextType | undefined
>(undefined);

const SelectedValueProvider = ({ children }: any) => {
  const [selectedValue, setSelectedValue] = useState('');

  const contextValue: SelectedValueContextType = {
    selectedValue,
    setSelectedValue,
  };

  return (
    <SelectedValueContext.Provider value={contextValue}>
      {children}
    </SelectedValueContext.Provider>
  );
};

const useSelectedValue = (): SelectedValueContextType => {
  const context = useContext(SelectedValueContext);

  if (!context) {
    throw new Error(
      "useSelectedValue must be used within a SelectedValueProvider"
    );
  }

  return context;
};

export { SelectedValueProvider, useSelectedValue };
