import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import { Collapse, CollapseItem, CollapseCheckBox } from '../../components/Collapse'; 

describe('Testes para o Collapse e seus componentes', () => {
  it('Deve renderizar o Collapse corretamente', () => {
    const itens = [false, false, false];
    let todosSelecionados = false;

    const { getByText } = render(
      <Collapse titulo="Título do Collapse" readOnly={false} selected={false} onSelect={()=> todosSelecionados= !todosSelecionados}>
        {itens.map((i,index) => <CollapseItem readOnly={false} selected={i} onSelect={() => itens[index] = !i}>Item {index + 1}</CollapseItem>)}
      </Collapse>
    );
    const buttom = getByText("Título do Collapse");
    fireEvent.click(buttom);

    expect(getByText('Título do Collapse')).toBeInTheDocument();
    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
  });

  it('Teste para CollapseCheckBox', () => {
    const onSelect = jest.fn();
    const { getByRole } = render(<CollapseCheckBox readOnly={false} selected={true} onSelect={onSelect} />);
    
    const checkbox = getByRole('checkbox');
    expect(checkbox).toHaveAttribute('checked');
    
    fireEvent.click(checkbox);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});

