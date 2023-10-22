import { useState } from "react";
import "./styles.css";

interface CustomTableProps {
  title: string;
  data: Record<string, string>[];
  initialItemsPerPage: number;
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
  initialItemsPerPage,
  onDeleteRow = () => {},
  onEditRow = () => {},
  onDetailRow = () => {},
  hideEditIcon = false,
  hideEyeIcon = false,
  hideTrashIcon = false,
}: CustomTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [isPageItemsOpen, setPageItemsOpen] = useState(false);
  const [isPageIndexOpen, setPageIndexOpen] = useState(false);

  const indexOfLastItem =
    currentPage * itemsPerPage > data.length
      ? data.length
      : currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  if (data.length === 0) return null;

  const columns = Object.keys(data[0]);
  const dataSize = data.length;

  const changeItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(event.target.value));
    setPageItemsOpen(false);
  };

  function previousPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  }

  const pageOptions = [1, 2, 5, 10, 25, 100, 150, 200, 500, 1000, 2000];

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
          {currentItems.map((item, rowIndex) => (
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
          data-total={dataSize}
          data-current={currentPage}
          data-per-page={itemsPerPage}
        >
          <div className="pagination-per-page">
            <div className="br-select">
              <div
                className="br-input select-div"
                onClick={() => console.log("teste")}
              >
                <label htmlFor="per-page-selection-random-94892">Exibir</label>
                <select
                  className="select-expand"
                  aria-label="Exibir lista"
                  tabIndex={-1}
                  data-trigger="data-trigger"
                  onChange={(value) => changeItemsPerPage(value)}
                  onFocus={() => setPageItemsOpen(true)}
                  onBlur={() => setPageItemsOpen(false)}
                >
                  {pageOptions.map((element) => {
                    return element <= dataSize ? (
                      <option
                        value={element}
                        selected={itemsPerPage === element}
                      >
                        {element}
                      </option>
                    ) : null;
                  })}
                </select>
                <i
                  className={
                    isPageItemsOpen
                      ? "fas fa-angle-down select-icon"
                      : "fas fa-angle-up select-icon"
                  }
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
          <span className="br-divider d-none d-sm-block mx-3"></span>
          <div className="pagination-inhtmlFormation d-none d-sm-flex">
            <span className="current">{indexOfFirstItem + 1}</span>&ndash;
            <span className="per-page">{indexOfLastItem}</span>&nbsp;de&nbsp;
            <span className="total">{dataSize}</span>&nbsp;itens
          </div>
          <div className="pagination-go-to-page d-none d-sm-flex ml-auto">
            <div className="br-select">
              <div className="br-input select-div">
                <label htmlFor="per-page-selection-random-94892">Página</label>
                <select
                  className="select-expand"
                  aria-label="Exibir lista"
                  tabIndex={-1}
                  data-trigger="data-trigger"
                  onChange={(value) => {
                    setCurrentPage(Number(value.target.value));
                    setPageIndexOpen(false);
                  }}
                  onFocus={() => setPageIndexOpen(true)}
                  onBlur={() => setPageIndexOpen(false)}
                >
                  {pageNumbers.map((element) => (
                    <option value={element} selected={currentPage === element}>
                      {element}
                    </option>
                  ))}
                </select>
                <i
                  className={
                    isPageIndexOpen
                      ? "fas fa-angle-down select-icon"
                      : "fas fa-angle-up select-icon"
                  }
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <span className="br-divider d-none d-sm-block mx-3"></span>
          <div className="pagination-arrows ml-auto ml-sm-0">
            <button
              className="br-button circle"
              type="button"
              aria-label="Voltar página"
              onClick={previousPage}
            >
              <i className="fas fa-angle-left" aria-hidden="true"></i>
            </button>
            <button
              className="br-button circle"
              type="button"
              aria-label="Avançar página"
              onClick={nextPage}
            >
              <i className="fas fa-angle-right" aria-hidden="true"></i>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
