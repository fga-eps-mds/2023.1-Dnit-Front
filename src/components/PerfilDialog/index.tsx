import {fetchPermissoesCategoria} from "../../service/usuarioApi";
import { Permissao, PermissaoCategoria, TipoPerfil } from "../../models/auth";
import Modal from "../Modal";
import ReactLoading from "react-loading";
import { Collapse, CollapseItem } from "../Collapse";
import {fetchCadastroPerfil} from "../../service/usuarioApi";
import {fetchObtemPerfil} from "../../service/usuarioApi";
import {fetchAtualizaPerfil} from "../../service/usuarioApi";
import { useEffect, useState } from "react";
import { notification } from "antd";
import { PerfilModel } from "../../models/perfil";

interface PermissaoDto {
  codigo: Permissao;
  descricao: string;
  selecionada: boolean;
}

interface PermissaoCategoriaDto {
  categoria: string;
  permissoes: PermissaoDto[];
  selecionada: boolean;
}

export interface PerfilDialogProps {
  id: string | null;
  readOnly: boolean;
  closeDialog: (perfil: PerfilModel | null) => void;
}

export default function PerfilDialog({ id, readOnly, closeDialog }: PerfilDialogProps) {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState<PermissaoCategoriaDto[]>([]);
  const [canEdit, setCanEdit] = useState(!readOnly);
  const [notificationApi, contextHolder] = notification.useNotification();

  const preencherPerfil = (perfil: PerfilModel) => {
    if (perfil.tipo === TipoPerfil.Administrador) {
      setCanEdit(false);
    }
    setCategorias(c => {
      const categorias = [...c];
      return categorias.map(categoria => {
        const novaCategoria = { ...categoria };
        const permissoes = perfil.categoriasPermissao
          ?.find(pc => pc.categoria === categoria.categoria)
          ?.permissoes
          ?.map(p => p.codigo) ?? [];
        novaCategoria.permissoes = novaCategoria.permissoes.map(p => { return { ...p, selecionada: p.selecionada = permissoes.includes(p.codigo) } });
        novaCategoria.selecionada = novaCategoria.permissoes.every(p => p.selecionada);
        return novaCategoria;
      });
    });
    setNome(perfil.nome);
  }

  const preencherCategorias = (categorias: PermissaoCategoria[]) => {
    setCategorias(categorias.map(p => {
      const categoriaDto = {
        categoria: p.categoria,
        selecionada: false,
        permissoes: p.permissoes.map(permissao => {
          return {
            ...permissao,
            selecionada: false,
          };
        })
      } as PermissaoCategoriaDto;
      return categoriaDto;
    }))
  }

  useEffect(() => {
    setLoading(true);
    fetchPermissoesCategoria()
      .then(permissoes => preencherCategorias(permissoes))
      .then(() => {
        if (!id) {
          return;
        }
        return fetchObtemPerfil(id)
          .then(perfil => preencherPerfil(perfil))
          .catch(error => notificationApi.error({message: 'Falha na busca pelo perfil. ' + (error?.response?.data ?? '')}));
      })
      .catch(error => notificationApi.error({message: 'Falha na listagem de permissoes. ' + (error?.response?.data ?? '')}))
      .finally(() => setLoading(false));
  }, []);

  const salvarPerfil = () => {
    if (!nome.trim()) {
      return;
    }
    setLoading(true);

    const permissoes = categorias.flatMap(c => c.permissoes.filter(p => p.selecionada).map(p => p.codigo));
    const perfil = {
      nome: nome.trim(),
      permissoes
    };

    if (!id) {
      fetchCadastroPerfil(perfil)
        .then(p => {
          notification.success({message: 'O perfil foi cadastrado com sucesso!'});
          closeDialog(p);
        })
        .catch(error => {
          notificationApi.error({message: 'Falha no cadastro de perfil. ' + (error?.response?.data ?? ''), duration: 30});
        })
        .finally(() => setLoading(false));
      return;
    }
    fetchAtualizaPerfil(id, perfil)
      .then(p => {
        notification.success({message: 'O perfil foi alterado com sucesso!'});
        closeDialog(p);
      })
      .catch(error => notificationApi.error({message: 'Falha na edição do perfil. ' + (error?.response?.data ?? ''), duration: 30}))
      .finally(() => setLoading(false));
  }

  const selecionarTodasPermissoes = (index: number) => {
    const nova = [...categorias];
    nova[index].selecionada = !nova[index].selecionada;
    nova[index].permissoes.forEach(p => p.selecionada = nova[index].selecionada);
    setCategorias(nova);
  }

  const selecionarPermissao = (categoria: number, permissao: number) => {
    const nova = [...categorias];
    const novaCategoria = nova[categoria];
    novaCategoria.permissoes[permissao].selecionada = !novaCategoria.permissoes[permissao].selecionada;
    novaCategoria.selecionada = novaCategoria.permissoes.every(p => p.selecionada);
    setCategorias(nova);
  };

  return (
    <Modal className="dialog-create-perfil">
      {contextHolder}
      <div className="d-flex justify-content-between">
        {id && <h4 className="text-center mt-1">{readOnly ? 'Detalhes do Perfil' : 'Edição de Perfil'}</h4>}
        {!id && <h4 className="text-center mt-1">Criação de Perfil</h4>}
        <button className="br-button close circle" type="button" aria-label="Close" onClick={() => closeDialog(null)}>
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>
      </div>
      {loading && <div data-testid="loading" className="d-flex justify-content-center m-3"><ReactLoading type="spinningBubbles" color="#000000" /></div>}
      {
        !loading &&
        <form className="d-flex flex-column" onSubmit={e => { e.preventDefault(); }}>
          <section className="d-flex align-items-center w-100">
            <div className="input-label mt-2"><label className="mr-2">Perfil:</label></div>
            <div className="br-input small">
              <input data-testid='perfil-nome' className="w-100" placeholder="Digite o nome" value={nome} onChange={e => setNome(e.target.value)} type="text" readOnly={!canEdit} style={{border: !canEdit? "none": ""}} />
            </div>
          </section>
          <section className="mt-4">
            <label>Permissões</label>
            {categorias.map((p, indexCategoria) =>
              <Collapse key={p.categoria} readOnly={!canEdit} titulo={p.categoria} selected={p.selecionada} onSelect={() => selecionarTodasPermissoes(indexCategoria)}>
                {p.permissoes.map((permissao, indexPermissao) =>
                  <CollapseItem key={`${p.categoria}-${permissao.codigo}`} readOnly={!canEdit} selected={permissao.selecionada} onSelect={() => selecionarPermissao(indexCategoria, indexPermissao)}>
                    {permissao.descricao}
                  </CollapseItem>
                )}
              </Collapse>
            )}
          </section>
          <section className="d-flex justify-content-end mt-3">
            {canEdit && <>
              <button className="br-button secondary" type="button" onClick={() => closeDialog(null)}>Cancelar</button>
              <button className="br-button primary" type="submit" disabled={loading} onClick={salvarPerfil}>Salvar</button>
            </>}
            {!canEdit && <button className="br-button primary" type="submit" disabled={loading} onClick={() => closeDialog(null)}>Fechar</button>}
          </section>
        </form>
      }
    </Modal>
  );
}
