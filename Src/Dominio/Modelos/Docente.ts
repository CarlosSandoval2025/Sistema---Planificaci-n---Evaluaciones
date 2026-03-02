import { Persona } from "./Persona";
import { IReportable } from "../Interfaces/IReportable";

export class Docente extends Persona implements IReportable {
    private especialidad: string;

    constructor(dni: string, nombre: string, correo: string, especialidad: string){
        super(dni, nombre, correo);
        this.especialidad = especialidad;
    }

    actualizarNombre(nuevoNombre: string): void {
        this.nombre = nuevoNombre;
    }

    actualizarCorreo(nuevoCorreo: string): void {
        this.correo = nuevoCorreo;
    }

    actualizarEspecialidad(nuevaEspecialidad: string): void {
        this.especialidad = nuevaEspecialidad;
    }


    getResumen(): string{
        return "Docente: " + this.nombre + "\n" + 
        "Correo: " + this.correo + "\n" +
        "Especialidad: " + this.especialidad + "\n";
    }

}