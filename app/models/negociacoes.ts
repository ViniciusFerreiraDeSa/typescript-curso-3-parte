import { Modelo } from "../interfaces/meuObjeto.js";
import negociacao from "./negociacao.js";

export class Negociacoes implements Modelo<Negociacoes> {
                            // T = type Array<negociacao> mesma coisa que negociacao [];
    private _negociacoes : negociacao[] = [] ;

    // métodos para mecher com as negociações
    public adiconaPortaDeEntrada(negociacao: negociacao){
        this._negociacoes.push(negociacao);
    }
                            // ReadOnlyArray método do TypeScript
                            // ReadonlyArray<negociacao> mesma coisa que readonly negociacao [];
    public listaDeNegociacoes() : ReadonlyArray<negociacao> {
        return this._negociacoes; //  [...this._negociacoes] poderiamos usar esse método de JavaScript tbm usando o spread operator
    }
    public paraTexto(): string {
        return JSON.stringify(this._negociacoes, null, 2)
    }
    public ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this._negociacoes) === JSON.stringify(negociacoes.listaDeNegociacoes());           
    }
}

// const negociacoes = new Negociacoes();
// // negociacoes.adiconaPortaDeEntrada(new negociacao())
// negociacoes.listaDeNegociacoes().forEach(n =>{
//     n.
// });