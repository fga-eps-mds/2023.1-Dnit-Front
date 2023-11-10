/* eslint-disable testing-library/render-result-naming-convention */
import { render, fireEvent } from "@testing-library/react";
import CustomTable, { CustomTableRow } from "../../components/Table";

describe("CustomTable Component", () => {
  const rowsData = [
    {
      id: "1",
      name: "John",
      age: "30",
    },
    {
      id: "2",
      name: "Alice",
      age: "28",
    },
    {
      id: "3",
      name: "Bob",
      age: "35",
    },
    {
      id: "4",
      name: "Eve",
      age: "22",
    },
  ];

  test("renders CustomTable component", () => {
    const screen = render(
      <CustomTable
        title="Test Table"
        initialItemsPerPage={2}
        columsTitle={["Name", "Age"]}
      >
        {rowsData.map((element, index) => (
          <CustomTableRow
            data={element}
            id={2}
            hideEditIcon={index === 2 ? true : false}
          />
        ))}
      </CustomTable>
    );

    // Check if the table title is rendered
    const tableTitle = screen.getByText("Test Table");
    expect(tableTitle).toBeInTheDocument();

    // Check if column titles are rendered
    const columnName = screen.getByText("Name");
    expect(columnName).toBeInTheDocument();
    const columnAge = screen.getByText("Age");
    expect(columnAge).toBeInTheDocument();
  });

  test("changes items per page", () => {
    const screen = render(
      <CustomTable
        title="Test Table"
        initialItemsPerPage={2}
        columsTitle={["Name", "Age"]}
      >
        {rowsData.map((element, index) => (
          <CustomTableRow data={element} id={2} />
        ))}
      </CustomTable>
    );

    const itemsPerPageSelect = screen.getAllByLabelText("Exibir lista");
    fireEvent.click(itemsPerPageSelect[0]);

    const itemsPerPageOption = screen.getAllByText("2");
    fireEvent.click(itemsPerPageOption[1]);

    // Check if items per page has changed
    const itemsPerPage = screen.getAllByLabelText("Exibir lista");
    expect(itemsPerPage[0]).toHaveValue("2");
  });

  test("pagination works", () => {
    const screen = render(
      <CustomTable
        title="Test Table"
        initialItemsPerPage={2}
        columsTitle={["Name", "Age"]}
      >
        {rowsData.map((element, index) => (
          <CustomTableRow
            data={element}
            id={2}
            hideEditIcon={index === 2 ? true : false}
          />
        ))}
      </CustomTable>
    );

    // Go to the next page
    const nextPageButton = screen.getByLabelText("Avançar página");
    fireEvent.click(nextPageButton);

    // Check if the next page is displayed
    const pageRange = screen.getByText("3-4 de 4 itens");
    expect(pageRange).toBeInTheDocument();

    // Go to the previous page
    const previousPageButton = screen.getByLabelText("Voltar página");
    fireEvent.click(previousPageButton);
  });

  test("renders rows in the table", () => {
    const screen = render(
      <CustomTable
        title="Test Table"
        initialItemsPerPage={2}
        columsTitle={["Name", "Age"]}
      >
        {rowsData.map((element, index) => (
          <CustomTableRow
            data={element}
            id={2}
            hideEditIcon={index === 2 ? true : false}
          />
        ))}
      </CustomTable>
    );

    // Check if data rows are rendered
    const nameRow = screen.getByText("John");
    const ageRow = screen.getByText("30");
    expect(nameRow).toBeInTheDocument();
    expect(ageRow).toBeInTheDocument();
  });

  test("page buttons", () => {});
});
