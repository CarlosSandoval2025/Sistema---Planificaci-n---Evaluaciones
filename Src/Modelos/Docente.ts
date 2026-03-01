import { Persona } from "./Persona";

export class Docente extends Persona{
    private especialidad: string;

    constructor(dni: string, nombre: string, correo: string, especialidad: string){
        super(dni, nombre, correo);
        this.especialidad = especialidad;
    }

    getResumen(): string{
        return "Docente: " + this.nombre + "\n" + 
        "Correo: " + this.correo + "\n" +
        "Especialidad: " + this.especialidad + "\n";
    }

}