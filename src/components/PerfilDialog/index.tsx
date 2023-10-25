import fetchPermissoesCategoria from "../../service/listarPermissoesCategoria";
import { PerfisTabela, Permissao, PermissaoCategoria, TipoPerfil } from "../../models/auth";
import Modal from "../Modal";
import ReactLoading from "react-loading";
import { Collapse, CollapseItem } from "../Collapse";
import fetchCadastroPerfil from "../../service/criarPerfil";
import fetchObterPerfil from "../../service/obterPerfil";
import fetchAtualizarPerfil from "../../service/atualizarPerfil";
import { useEffect, useState } from "react";

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
  closeDialog: (perfil: PerfisTabela | null) => void;
}

export default function PerfilDialog({ id, readOnly, closeDialog }: PerfilDialogProps) {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState<PermissaoCategoriaDto[]>([]);
  const [canEdit, setCanEdit] = useState(!readOnly);

  const preencherPerfil = (perfil: PerfisTabela) => {
    if (perfil.tipo == TipoPerfil.Administrador) {
      setCanEdit(false);
    }
    setCategorias(c => {
      const categorias = [...c];
      return categorias.map(categoria => {
        const novaCategoria = { ...categoria };
        const permissoes = perfil.categoriasPermissao
          ?.find(pc => pc.categoria == categoria.categoria)
          ?.permissoes
          ?.map(p => p.codigo) ?? [];
        novaCategoria.permissoes = novaCategoria.permissoes.map((p, i) => { return { ...p, selecionada: p.selecionada = permissoes.includes(p.codigo) } });
        novaCategoria.selecionada = novaCategoria.permissoes.every(p => p.selecionada);
        return novaCategoria;
      })
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
        return fetchObterPerfil(id)
          .then(perfil => preencherPerfil(perfil));
      })
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
        .then(p => closeDialog(p))
        .catch(() => { }) // TODO: mostrar mensagem de erro
        .finally(() => setLoading(false));
      return;
    }
    fetchAtualizarPerfil(id, perfil)
      .then(p => closeDialog(p))
      .catch(() => { }) // TODO: mostrar mensagem de erro
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
      <h4 className="text-center mt-1">{!id ? 'Criação de Perfil' : 'Edição de Perfil'}</h4>
      {loading && <div className="d-flex justify-content-center m-3"><ReactLoading type="spinningBubbles" color="#000000" /></div>}
      {
        !loading &&
        <form className="d-flex flex-column" onSubmit={e => { e.preventDefault(); }}>
          <section className="d-flex align-items-center w-100">
            <label className="mr-3">Nome:</label>
            <input className="w-100" value={nome} onChange={e => setNome(e.target.value)} type="text" readOnly={!canEdit} />
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
