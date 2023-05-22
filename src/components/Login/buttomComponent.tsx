import React from "react";
interface ButtonComponentProps{
    nome?: string;
    cor?: string;
    cor_borda?: string; 
    cor_letra?: string;
    margin?: string
};

export default function ButtonComponent(props: ButtonComponentProps){
    const estilo = {
        backgroundColor: props.cor,
        borderColor: props.cor_borda,
        color: props.cor_letra,
        paddingTop: '2%',
        paddingBottom: '2%',
        paddingLeft: '13%',
        paddingRight: '13%',
        borderRadius: '20px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',

        fontFamily: 'Rawline SemiBold',
        fontSize: '14px',
        lineHeight: '21px',
        textalign: 'center',
        marginRight: '10%'
      };
    return(
        <button style={estilo}>
            {props.nome}
        </button>
    );
}