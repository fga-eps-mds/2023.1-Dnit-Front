export class ExcessoesApi extends Error {
     
    constructor(
        readonly codeStr:string ,
        readonly message:string,
        readonly details: {
            [key:string] : string;
        }
        ) { super( ) };
    
    
}