export function formataCustoLogistico(distancia: number){
    switch(true){
        case distancia <= 250:
            return "$";
        case distancia > 250 && distancia <= 500:
            return  "$$"
        case distancia > 500 && distancia <= 1000:
            return "$$$"
        default:
            return "$$$$"
    }
}