import { Permissao } from "./auth";

export interface PerfilDto {
    nome: string;
    permissoes: Permissao[];
}
