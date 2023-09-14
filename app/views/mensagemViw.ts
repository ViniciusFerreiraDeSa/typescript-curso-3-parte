import { View } from "./viw.js";

export class MensagemViw extends View<string>{

    protected template(modelo: string):string{
        return `
            <p class="alert alert-info">${modelo}</p>
        `
    }

}