interface ButtonComponentProps {
  nome?: string;
  cor?: string;
  cor_borda?: string;
  cor_letra?: string;
  margin?: string;
  largura?: string;
  disabled?: boolean;
  click?: () => void;
}

export default function ButtonComponent({
  click,
  cor,
  cor_borda,
  cor_letra,
  largura,
  nome,
  disabled,
}: ButtonComponentProps) {
  const buttonStyle = {
    backgroundColor: cor,
    borderColor: cor_borda,
    color: cor_letra,
     width: largura,
  //   padding: "4% 13%",
  //   borderRadius: "20px",
  //   boxShadow: "1px 2px 4px var(--black1)",
  //   border: "0",
  //   transform: "0.3s",
  //   cursor: "pointer",
  //   fontSize: "15px",
  //   lineHeight: "21px",
  //   textalign: "center",
  //   marginTop: "5px",
  };
  return (
    <button disabled={disabled} className="btn" style={buttonStyle} onClick={click}>
      {nome}
    </button>
  );
}
