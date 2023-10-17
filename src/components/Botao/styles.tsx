import styled from 'styled-components';

interface ButtonProps{
  cor?: string,
  cor_borda?: string,
  largura?: string,
  cor_letra?: string,
}

export const Btn = styled.button<ButtonProps>`
  background: ${(props) => (props.cor ? props.cor : 'red')};
  border-color: ${(props) => (props.cor_borda ? props.cor_borda : 'red')};
  color: ${(props) => (props.cor_letra ? props.cor_letra : '')};
  width: ${(props) => (props.largura ? props.largura : '20px')};
  padding: 4% 13%;
  border-radius: 20px;
  box-shadow: 1px 2px 4px var(--black1);
  border: 0;
  font-size: 15px;
  line-height: 21px;
  text-align: center;
  margin-top: 20px;
`;