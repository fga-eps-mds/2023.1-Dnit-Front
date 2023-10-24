import {getByText, render} from "@testing-library/react";
import CollapseCustom from "../components/Collapse";
import {screen} from "@testing-library/react";

describe("CollapseCustom Component", () => {
    
    it("should render the component", async () => {
        const { container } = render(
            <CollapseCustom titulo={"TITULO DO COLLAPSE"} opcoes={["Opcao1", "Opcao2"]} />
        );

        const CollapseCustomElement = container.querySelector(".collapse-example");
        expect(CollapseCustomElement).toBeInTheDocument();
        
        expect(await screen.findByText("TITULO DO COLLAPSE")).toBeVisible();
        
    });
    
});
