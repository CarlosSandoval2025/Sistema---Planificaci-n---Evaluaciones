import { Persona } from "./Persona";
import { Rango } from "../Enums/Rango";

export class Autoridad extends Persona {
    private rango:  Rango;

    constructor(dni: string, nombre: string, correo: string, rango: Rango){
        super(dni,nombre,correo);
        this.rango = rango;
    }

    getRango(): Rango {
        return this.rango;
    }

    getResumen(): string {
        return `Autoridad: ${this.getNombre()} - ${this.getCorreo()}`;
    }
}