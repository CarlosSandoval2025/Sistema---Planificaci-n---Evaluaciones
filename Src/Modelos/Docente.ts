export class Docente{
    private id: number;
    private nombre: string;
    private correo: string;
    private especialidad: string;

    constructor(id: number, nombre: string, correo: string, especialidad: string){
        this.id = id; 
        this.nombre = nombre;
        this.correo = correo;
        this.especialidad = especialidad;
    }

    getResumen(): string{
        return "Docente: " + this.nombre + "\n" + 
        "Correo: " + this.correo + "\n" +
        "Especialidad: " + this.especialidad + "\n";
    }

}