import { Persona } from "./Persona.js";
import { Rango } from "./Rango.js";

export class Autoridad extends Persona {
    private rango:  Rango;

    constructor(dni: string, nombre: string, correo: string, rango: Rango){
        super(dni,nombre,correo);
        this.rango = rango;
    }

    getRango(): string {
        return this.rango;
    }

    getResumen(): string {
        return super.getResumen() +
        `\nRango: ${this.rango}`;
    }
}