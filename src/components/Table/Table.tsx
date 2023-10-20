import "./styles.css";

interface CustomTableProps {
  title: string;
  data: Record<string, string>[];
  onDeleteRow: (rowIndex: number) => void;
  onEditRow?: (rowIndex: number) => void;
  onDetailRow?: (rowIndex: number) => void;
  hideEditIcon?: boolean;
  hideEyeIcon?: boolean;
  hideTrashIcon?: boolean;
}

export default function CustomTable({
  title,
  data,
  onDeleteRow = () => {},
  onEditRow = () => {},
  onDetailRow = () => {},
  hideEditIcon = false,
  hideEyeIcon = false,
  hideTrashIcon = false,
}: CustomTableProps) {
  if (data.length === 0) return null;
  const columns = Object.keys(data[0]);

  return (
    <div
      className="br-table"
      data-search="data-search"
      data-selection="data-selection"
      data-collapse="data-collapse"
      data-random="data-random"
    >
      <div className="table-header">
        <div className="top-bar">
          <div className="table-title">{title}</div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th className="column-checkbox" scope="col">
              <div className="br-checkbox hidden-label">
                <input
                  id="check-all-29127"
                  name="check-all-29127"
                  type="checkbox"
                  aria-label="Selecionar tudo"
                  data-parent="check-01-29127"
                />
                <label htmlFor="check-all-29127">
                  Selecionar todas as linhas
                </label>
              </div>
            </th>
            {columns.map((element) => (
              <th scope="col">{element}</th>
            ))}
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr>
              <td>
                <div className="br-checkbox hidden-label">
                  <input
                    id={rowIndex.toString()}
                    name={rowIndex.toString()}
                    type="checkbox"
                    aria-label="Selecionar linha 1"
                    data-child={rowIndex.toString()}
                  />
                  <label htmlFor={rowIndex.toString()}>Selecionar linha</label>
                </div>
              </td>
              {columns.map((column, colIndex) => (
                <td data-th={colIndex}>{item[column]}</td>
              ))}
              <td>
                <div className="icon-row">
                  {!hideEditIcon && (
                    <i
                      className="fas fa-edit"
                      aria-hidden="true"
                      onClick={() => onEditRow(rowIndex)}
                    />
                  )}
                  {!hideEyeIcon && (
                    <i
                      className="fas fa-eye"
                      aria-hidden="true"
                      onClick={() => onDetailRow(rowIndex)}
                    />
                  )}
                  {!hideTrashIcon && (
                    <i
                      className="fas fa-trash-alt"
                      aria-hidden="true"
                      onClick={() => onDeleteRow(rowIndex)}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        <nav
          className="br-pagination"
          aria-label="Paginação de resultados"
          data-total="50"
          data-current="1"
          data-per-page="20"
        >
          <div className="pagination-per-page">
            <div className="br-select">
              <div className="br-input">
                <label htmlFor="per-page-selection-random-94892">Exibir</label>
                <input
                  id="per-page-selection-random-94892"
                  type="text"
                  placeholder=" "
                />
                <button
                  className="br-button"
                  type="button"
                  aria-label="Exibir lista"
                  tabIndex={-1}
                  data-trigger="data-trigger"
                >
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </button>
              </div>
              <div className="br-list" tabIndex={0}>
                <div className="br-item" tabIndex={-1}>
                  <div className="br-radio">
                    <input
                      id="per-page-10-random-94892"
                      type="radio"
                      name="per-page-random-94892"
                      value="per-page-10-random-94892"
                      checked={true}
                    />
                    <label htmlFor="per-page-10-random-94892">10</label>
                  </div>
                </div>
                <div className="br-item" tabIndex={-1}>
                  <div className="br-radio">
                    <input
                      id="per-page-20-random-94892"
                      type="radio"
                      name="per-page-random-94892"
                      value="per-page-20-random-94892"
                    />
                    <label htmlFor="per-page-20-random-94892">20</label>
                  </div>
                </div>
                <div className="br-item" tabIndex={-1}>
                  <div className="br-radio">
                    <input
                      id="per-page-30-random-94892"
                      type="radio"
                      name="per-page-random-94892"
                      value="per-page-30-random-94892"
                    />
                    <label htmlFor="per-page-30-random-94892">30</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="br-divider d-none d-sm-block mx-3"></span>
          <div className="pagination-inhtmlFormation d-none d-sm-flex">
            <span className="current">1</span>&ndash;
            <span className="per-page">20</span>&nbsp;de&nbsp;
            <span className="total">50</span>&nbsp;itens
          </div>
          <div className="pagination-go-to-page d-none d-sm-flex ml-auto">
            <div className="br-select">
              <div className="br-input">
                <label htmlFor="go-to-selection-random-18328">Página</label>
                <input
                  id="go-to-selection-random-18328"
                  type="text"
                  placeholder=" "
                />
                <button
                  className="br-button"
                  type="button"
                  aria-label="Exibir lista"
                  tabIndex={-1}
                  data-trigger="data-trigger"
                >
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </button>
              </div>
              <div className="br-list" tabIndex={0}>
                <div className="br-item" tabIndex={-1}>
                  <div className="br-radio">
                    <input
                      id="go-to-1-random-18328"
                      type="radio"
                      name="go-to-random-18328"
                      value="go-to-1-random-18328"
                      checked={true}
                    />
                    <label htmlFor="go-to-1-random-18328">1</label>
                  </div>
                </div>
                <div className="br-item" tabIndex={-1}>
                  <div className="br-radio">
                    <input
                      id="go-to-2-random-18328"
                      type="radio"
                      name="go-to-random-18328"
                      value="go-to-2-random-18328"
                    />
                    <label htmlFor="go-to-2-random-18328">2</label>
                  </div>
                </div>
                <div className="br-item" tabIndex={-1}>
                  <div className="br-radio">
                    <input
                      id="go-to-3-random-18328"
                      type="radio"
                      name="go-to-random-18328"
                      value="go-to-3-random-18328"
                    />
                    <label htmlFor="go-to-3-random-18328">3</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="br-divider d-none d-sm-block mx-3"></span>
          <div className="pagination-arrows ml-auto ml-sm-0">
            <button
              className="br-button circle"
              type="button"
              aria-label="Voltar página"
            >
              <i className="fas fa-angle-left" aria-hidden="true"></i>
            </button>
            <button
              className="br-button circle"
              type="button"
              aria-label="Avançar página"
            >
              <i className="fas fa-angle-right" aria-hidden="true"></i>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
