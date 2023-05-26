import React from "react";
interface ButtonComponentProps{
    nome?: string;
    cor?: string;
    cor_borda?: string ; 
    cor_letra?: string;
    margin?: string;
    largura?: string
};

export default function ButtonComponent(props: ButtonComponentProps){
    const estilo = {
        backgroundColor: props.cor,
        borderColor: props.cor_borda,
        color: props.cor_letra,
        width: props.largura,
        paddingTop: '2%',
        paddingBottom: '2%',
        paddingLeft: '13%',
        paddingRight: '13%',
        borderRadius: '20px',
        boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25)',
        border: '0',
        transform: '0.3s',
        cursor: 'pointer',
        
        fontFamily: 'Rawline SemiBold',
        fontSize: '15px',
        lineHeight: '21px',
        textalign: 'center',
      };
    return(
        <button style={estilo} >
            {props.nome}
        </button>
    );
}