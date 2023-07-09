import { createContext, useContext, useState } from "react";

interface EscolasCadastradasContextType {
  escolasCadastradas: string[];
  setEscolasCadastradas: (value: string[]) => void;
}

const EscolasCadastradasContext = createContext<
  EscolasCadastradasContextType | undefined
>(undefined);

const EscolasCadastradasProvider = ({ children }: any) => {
  const [escolasCadastradas, setEscolasCadastradas] = useState<string[]>([]);

  const contextValue: EscolasCadastradasContextType = {
    escolasCadastradas,
    setEscolasCadastradas,
  };

  return (
    <EscolasCadastradasContext.Provider value={contextValue}>
      {children}
    </EscolasCadastradasContext.Provider>
  );
};

const useEscolasCadastradas = (): EscolasCadastradasContextType => {
  const context = useContext(EscolasCadastradasContext);

  if (!context) {
    throw new Error(
      "useEscolasCadastradas must be used within a EscolasCadastradasProvider"
    );
  }

  return context;
};

export { EscolasCadastradasProvider, useEscolasCadastradas };