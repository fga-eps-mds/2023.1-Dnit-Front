import axios, { AxiosResponse } from "axios";
import * as URL from "../consts/service"
import { PermissaoCategoria, LoginResponse, Permissao, AtualizarTokenDto } from "../models/auth";
import { PerfilDto, PerfilModel } from "../models/perfil";
import { ListarUsuariosQueryParams } from "../models/usuario";
import * as DATA from "../models/service";
import { ResponseStatus, fetchCadastros, fetchModificador, fetchDados } from "./apiUtils";
import { AuthLocalStorage } from "../provider/Autenticacao";

export async function fetchPermissoesCategoria(): Promise<PermissaoCategoria[]> {
    return fetchDados<PermissaoCategoria[]>(URL.listarPermissoesCategoria);
}

export async function fetchCadastroPerfil(perfil: PerfilDto): Promise<PerfilModel> {
    //return fetchCadastros<PerfilModel>(URL.cadastrarPerfilUrl, perfil);
    try {
        const response: AxiosResponse<PerfilModel> = await axios.post(
            URL.cadastrarPerfilUrl,
            perfil
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchPerfis(pagina: number, tamanhoPagina: number, nome: string): Promise<PerfilModel[]> {
    try {
        const response: AxiosResponse<PerfilModel[]> = await axios.get(URL.listarPerfis, {
            params: {
                pageIndex: pagina,
                pageSize: tamanhoPagina,
                nome
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchAtualizaPerfil(id: string, perfil: PerfilDto): Promise<PerfilModel> {
    try {
        const response: AxiosResponse<PerfilModel> = await axios.put(`${URL.atualizarPerfil}/${id}`, perfil);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchExcluiPerfil(id: string): Promise<ResponseStatus> {
    try {
        const response: AxiosResponse<ResponseStatus> = await axios.delete(
            URL.excluiPerfil + "/" + id
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchObtemPerfil(id: string): Promise<PerfilModel> {
    try {
        const response: AxiosResponse<PerfilModel> = await axios.get(`${URL.obterPerfil}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchLogin(data: DATA.LoginData): Promise<LoginResponse> {
    try {
        const response: AxiosResponse<LoginResponse> = await axios.post(
            URL.loginURL,
            data
        );
        localStorage.setItem(AuthLocalStorage.Email, data.email);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchPermissoesDoUsuario(): Promise<Permissao[]> {
    try {
        const response: AxiosResponse<Permissao[]> = await axios.get(URL.listarUsuarioPermissoes);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchAtualizaToken(dados: AtualizarTokenDto): Promise<LoginResponse> {
    try {
        const response: AxiosResponse<LoginResponse> = await axios.post(
            URL.atualizarTokenUrl,
            dados
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchCadastroUsuarioDnit(data: DATA.CadastroUsuarioData): Promise<ResponseStatus> {
    return fetchCadastros<DATA.CadastroUsuarioData>(URL.cadastroUsuarioURL, data);
}

export async function fetchRecuperaSenha(data: DATA.RecuperarSenhaData): Promise<ResponseStatus> {
    return fetchModificador<DATA.RecuperarSenhaData>(URL.recuperarSenhaURL, data);
}

export async function fetchRedefineSenha(data: DATA.RedefinirSenhaData): Promise<ResponseStatus> {
    return fetchModificador<DATA.RedefinirSenhaData>(URL.redefinirSenhaURL, data);
}

export async function fetchUsuarios<T>(params: ListarUsuariosQueryParams): Promise<T> {
    console.log({ params });
    if (params.nome === '') params.nome = undefined
    if (params.perfilId === '') params.perfilId = undefined
    if (params.ufLotacao === '') params.ufLotacao = undefined
    if (params.municipio === '') params.municipio = undefined
    try {
        const response: AxiosResponse<T> = await axios.get(URL.listarUsuarios, {
            params
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchAtualizaTipoPerfil(usuarioId: string, perfilId: string): Promise<void> {
    try {
        const response: AxiosResponse<void> = await axios.patch(
            `${URL.atualizarTipoPerfil}/${usuarioId}/perfil`, { novoPerfilId: perfilId });
    } catch (error) {
        console.log(error);
        throw error;
    }
}
