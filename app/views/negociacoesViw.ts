import { Escapar } from "../decorators/escapar.js";
import { Negociacoes } from "../models/negociacoes.js";
import { View } from "./viw.js";

export class NegociacoesViw extends View<Negociacoes>{

    // método template serve para declarar o template da minha viw
    @Escapar
    protected template(modelo: Negociacoes): string{
        return ` 
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody> 
                ${modelo.listaDeNegociacoes().map(negociacao => {
                    return `
                        <tr>
                            <td>${this.formatarData(negociacao.data)}</td>
                            <td>${negociacao.quantidade}</td>
                            <td>${negociacao.valor}</td>
                        </tr>
                    `
                }).join('')}
            </tbody>
        </table>
        
        `;
    }
    // protected também resolveria o problema, porém o método privado só a classe pode trabalhar com o método
    private formatarData(data:Date){
       return new Intl.DateTimeFormat().format(data);
    }

    // método update serve para renderizar o template no elemento que capturamos no constructor
    // update(modelo: Negociacoes):void {
    //     const template = this.template(modelo);
    //     console.log(template);
    //     this.elemento.innerHTML = template ;
    // }
}