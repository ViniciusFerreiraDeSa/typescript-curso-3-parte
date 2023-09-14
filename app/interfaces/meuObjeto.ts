import { Imprimivel } from "../utils/imprimivel.js";
import { Comparavel } from "./comparavel.js";

// Interface que extende uma ou mais interfaces
export interface Modelo <T> extends Imprimivel, Comparavel<T>{

}