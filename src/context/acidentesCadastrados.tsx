import { createContext, useContext, useState } from "react";

interface AcidentesContextType {
  acidentes: number[];
  setAcidentes: (value: number[]) => void;
}

const AcidentesContext = createContext<
AcidentesContextType | undefined
>(undefined);

const AcidentesProvider = ({ children }: any) => {
  const [acidentes, setAcidentes] = useState<number[]>([]);

  const contextValue: AcidentesContextType = {
    acidentes,
    setAcidentes,
  };

  return (
    <AcidentesContext.Provider value={contextValue}>
      {children}
    </AcidentesContext.Provider>
  );
};

const useAcidentes = (): AcidentesContextType => {
  const context = useContext(AcidentesContext);

  if (!context) {
    throw new Error(
      "useAcidentes must be used within a AcidentesProvider"
    );
  }

  return context;
};

export { AcidentesProvider, useAcidentes };