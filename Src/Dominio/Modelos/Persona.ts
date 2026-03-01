export abstract class Persona {
    protected dni: string;
    protected nombre: string;
    protected correo: string;

    constructor(dni: string, nombre: string, correo: string){
        this.dni = dni;
        this.nombre = nombre;
        this.correo = correo;
    }

    getDni(): string {
        return this.dni;
    }

    getNombre(): string {
        return this.nombre;
    }

    getCorreo(): string {
        return this.correo;
    }

    abstract getResumen(): string;
}