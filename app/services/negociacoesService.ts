import { NegociacoesDoDia } from "../interfaces/negociacaoDoDia.js";
import negociacao from "../models/negociacao.js";

export class NegociacoesServices{
    
    public obterNegociacoesDoDia(): Promise <negociacao[]> {
        return fetch('http://localhost:8080/dados')
            .then(res => res.json())
            .then((dados: NegociacoesDoDia[]) =>{
                return dados.map(dadoDeHoje =>{
                    return new negociacao(
                        new Date(), 
                        dadoDeHoje.vezes, 
                        dadoDeHoje.montante,
                        );
                })
            })
    }
}