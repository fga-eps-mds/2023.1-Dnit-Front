import React from 'react';
import { Btn } from './styles';


export default function Button(
  { ...props }
){

  return (
    <Btn disabled={props.disabled}
      {...props} onClick={props.click}>
      {props.nome}
    </Btn>
  );
}