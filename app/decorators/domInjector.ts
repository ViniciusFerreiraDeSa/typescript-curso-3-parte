export function DomInjector(seletor: string){
    return function (target: any, propertyKey: string){
        let elemento: HTMLElement | null = null
        const getter = function(){
            if(!elemento){
                // esse cara nunca vai ser nulo
                elemento =  <HTMLElement> document.querySelector(seletor);
                console.log(`Buscando elemento do Dom com o seletor ${seletor} para injetar em ${propertyKey}`);
            }

            return elemento;
        }
        
        Object.defineProperty(target,propertyKey,{
            get: getter
        })
    }
}