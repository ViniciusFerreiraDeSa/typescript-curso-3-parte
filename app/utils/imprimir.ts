import { Imprimivel } from "./imprimivel.js";

export function Imprimir(...objetos: Array<Imprimivel>){
    for(let objeto of objetos){
        console.log(objeto.paraTexto());
    }
}