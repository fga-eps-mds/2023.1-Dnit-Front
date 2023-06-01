interface ButtonComponentProps {
  nome?: string;
  cor?: string;
  cor_borda?: string;
  cor_letra?: string;
  margin?: string;
  largura?: string;
}

export default function ButtonComponent(props: ButtonComponentProps) {
  const estilo = {
    backgroundColor: props.cor,
    borderColor: props.cor_borda,
    color: props.cor_letra,
    width: props.largura,
    padding: "2% 13%",
    borderRadius: "20px",
    boxShadow: "1px 2px 4px var(--black1)",
    border: "0",
    transform: "0.3s",
    cursor: "pointer",
    fontSize: "15px",
    lineHeight: "21px",
    textalign: "center",
    marginTop: "5px",
  };
  return <button style={estilo}>{props.nome}</button>;
}
