
import { DomInjector } from "../decorators/domInjector.js";
import { Inspecionar } from "../decorators/inspecionar.js";
import { LogarTempoDeExecucao } from "../decorators/tempoDeExecucao.js";
import { DiasDaSemana } from "../enums/diasDaSemana.js";
import negociacao from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesServices } from "../services/negociacoesService.js";
import { Imprimir } from "../utils/imprimir.js";
import { MensagemViw } from "../views/mensagemViw.js";
import { NegociacoesViw } from "../views/negociacoesViw.js";

export class NegociacaoController {
    @DomInjector('#data')
    private _inputData: HTMLInputElement;
    @DomInjector('#quantidade')
    private _inputQuantidade: HTMLInputElement;
    @DomInjector('#valor')
    private _inputValor: HTMLInputElement;
    private _negociacoes = new Negociacoes();      
    private _negociacoesViw = new NegociacoesViw('#negociacoesViw'); // quero fazer o escape da  
    private _mensagemViw = new MensagemViw('#mensagemView');
    private _negociacaoService = new NegociacoesServices();

    constructor(){
        this._negociacoesViw.update(this._negociacoes);

    }
    @Inspecionar()
    @LogarTempoDeExecucao()
    public adiciona(): void{
        
                            // chamando o método diretamente da classe negociacao
        const Negociacao = negociacao.criaDe(
            this._inputData.value,
            this._inputQuantidade.value,
            this._inputValor.value,
        )
        // se nçao for dia útil eu ja faço logo o retorno da mensagem
        if(!this.ehDiaUtil(Negociacao.data)){
            this._mensagemViw.update('Negociações feitas apenas em dias úteis!');
            return
        }
            this._negociacoes.adiconaPortaDeEntrada(Negociacao);
            Imprimir(Negociacao, this._negociacoes);
            this.limparForm();
            this.atualizaView();    
       
    }
    // Verifica se é dia útil
    public importarDados():void{
        this._negociacaoService
        .obterNegociacoesDoDia()
        .then(negociacoesDeHoje =>{
            return negociacoesDeHoje.filter(negociacaoDeHoje => {
                return !this._negociacoes.listaDeNegociacoes()
                .some(negociacao => negociacao.ehIgual(negociacaoDeHoje));
            });
        })
        .then(negociacoesDeHoje =>{
            for(let negociacao of negociacoesDeHoje){
                this._negociacoes.adiconaPortaDeEntrada(negociacao);
            }
            this._negociacoesViw.update(this._negociacoes);
        });
    }


    private ehDiaUtil(data:Date){
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }

    // Limpar o formulario e adicionar o foco denovo em data

    private limparForm(): void{
        this._inputData.value = '',
        this._inputQuantidade.value = '',
        this._inputValor.value= '',
        this._inputData.focus();
    }
    private atualizaView(): void {
        this._negociacoesViw.update(this._negociacoes);
        this._mensagemViw.update("Negociação feita com sucesso")
    }
}
