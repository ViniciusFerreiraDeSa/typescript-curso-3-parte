export abstract class View<T>{
    // modificador protected só a view tem acesso a essa propriedade, mas os herdeiros de view tem acesso a essa propriedade
    protected elemento: HTMLElement;
    constructor(seletor: string){
        const elemento = document.querySelector(seletor);
         if(elemento){
            this.elemento = elemento as HTMLInputElement;
         }else{
            throw Error('Seletor de elemento não definido no DOM. Verifique');
         }
    }
    // @Inspecionar()
    // @LogarTempoDeExecucao(true)
    public update(modelo: T): void{
        let template = this.template(modelo);

        this.elemento.innerHTML = template;
    }
    // no método abstrato, a classe pai não sabe oque vai ser implementado a classe herdeira 
    // protected também resolveria o problema, porém o método privado só a classe pode trabalhar com o método
    protected abstract template(modelo: T):string;
    
}