import { Permissao } from "../../models/auth";
import { AuthLocalStorage, setPermissoes } from "../../provider/Autenticacao";

export function autenticar(...permissoes: Permissao[]) {
    localStorage.setItem(AuthLocalStorage.Token, "teste");
    setPermissoes(permissoes);
}