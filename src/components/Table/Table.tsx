import { ReactNode, useState } from "react";
import "./styles.css";

interface CustomTableProps {
  title: string;
  initialItemsPerPage: number;
  columsTitle: string[];
  children: ReactNode[];
}

interface CustomTableRowsProps {
  data: Record<string, string>;
  id: number;
  hideEditIcon?: boolean;
  hideEyeIcon?: boolean;
  hideTrashIcon?: boolean;
  onDeleteRow?: (rowIndex: number) => void;
  onEditRow?: (rowIndex: number) => void;
  onDetailRow?: (rowIndex: number) => void;
}

export function CustomTableRow({
  data,
  id,
  onDeleteRow = () => {},
  onEditRow = () => {},
  onDetailRow = () => {},
  hideEditIcon = false,
  hideEyeIcon = false,
  hideTrashIcon = false,
}: CustomTableRowsProps) {
  const columns = Object.keys(data);

  return (
    <tr>
      {columns.map((column, colIndex) => (
        <td data-th={colIndex}>{data[column]}</td>
      ))}
      <td>
        <div className="icon-row">
          {!hideEditIcon && (
            <i
              className="fas fa-edit"
              aria-hidden="true"
              onClick={() => onEditRow(id)}
            />
          )}
          {!hideEyeIcon && (
            <i
              className="fas fa-eye"
              aria-hidden="true"
              onClick={() => onDetailRow(id)}
            />
          )}
          {!hideTrashIcon && (
            <i
              className="fas fa-trash-alt"
              aria-hidden="true"
              onClick={() => onDeleteRow(id)}
            />
          )}
        </div>
      </td>
    </tr>
  );
}

export default function CustomTable({
  title,
  children,
  columsTitle,
  initialItemsPerPage,
}: CustomTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [isPageItemsOpen, setPageItemsOpen] = useState(false);
  const [isPageIndexOpen, setPageIndexOpen] = useState(false);

  const indexOfLastItem =
    currentPage * itemsPerPage > children.length
      ? children.length
      : currentPage * itemsPerPage;

  const indexOfFirstItem = Math.max(indexOfLastItem - itemsPerPage, 0);
  const currentItems = children.slice(indexOfFirstItem, indexOfLastItem);
  
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(children.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  if (children.length === 0) return null;

  const dataSize = children.length;

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
      className="br-table ml-3 mr-3"
      data-search="data-search"
      data-selection="data-selection"
      data-collapse="data-collapse"
      data-random="data-random"
    >
      <div className="table-header">
        <div className="top-bar">
          <div className="table-title mb-1">{title}</div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {columsTitle.map((element) => (
              <th scope="col" style={{color: "#1351B4", fontWeight: "bold"}}>{element}</th>
            ))}
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{currentItems.map((item, _) => item)}</tbody>
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
              <div className="br-input select-div">
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
                    return element <= dataSize * 2 ? (
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
            <span className="current">
              {`${
                indexOfFirstItem + 1
              }-${indexOfLastItem} de ${dataSize} itens`}
            </span>
          </div>
        <div className="pagination-go-to-page d-none d-sm-flex ml-auto">
          <div className="br-select">
            <div className="br-input select-div">
              <label htmlFor="per-page-selection-random-94892">Página</label>
              <select
                className="select-expand"
                aria-label="Exibir página"
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
