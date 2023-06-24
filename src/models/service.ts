export interface FederativeUnit {
  id: number;
  sigla: string;
  descricao: string;
}

export interface LoginData {
  email: string;
  senha: string;
  nome: string;
  uf: number;
}

export interface RegisterData {
  email: string;
  senha: string;
  nome: string;
  uf: number;
}

export interface RegisterSchoolData {
  nome: string,
  rede: string,
  codigo: string,
  uf: number,
  cep: string,
  telefone: string,
  ciclos: string,
  porte: string,
  endereco: string,
  municipio: string,
  localizacao: string,
  longitude: string,
  latitude: string,
  numeroAlunos: string,
  numeroDocentes: string
}