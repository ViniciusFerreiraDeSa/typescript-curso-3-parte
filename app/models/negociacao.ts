import { Modelo } from "../interfaces/meuObjeto.js";

export default class negociacao implements Modelo<negociacao> {
    constructor(
        private readonly _data: Date,
        public readonly quantidade: number,
        public readonly valor: number
    )  {} 
    public static criaDe(dataString: string, quantidadeString: string, valorString: string): negociacao {
        const exp = /-/g;
        const data = new Date(dataString.replace(exp, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new negociacao(data, quantidade, valor);
    }
    get volume(): number {
        return this.quantidade * this.valor;
    }
    get data(): Date {
        const data = new Date(this._data.getTime());
        return data
    }
    public paraTexto(): string {
        return`Data ${this.data}
        , Quantidade ${this.quantidade}
        , Valor ${this.valor}`;
    }
    public ehIgual(negociacao: negociacao): boolean{
        return this.data.getDate() === negociacao.data.getDate() &&  this.data.getMonth() === negociacao.data.getMonth() && this.data.getFullYear() === negociacao.data.getFullYear();
    }
}

