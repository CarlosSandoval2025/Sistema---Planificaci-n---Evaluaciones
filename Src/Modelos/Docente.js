export class Docente {
    id;
    nombre;
    correo;
    especialidad;
    constructor(id, nombre, correo, especialidad) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.especialidad = especialidad;
    }
    getResumen() {
        return "Docente: " + this.nombre + "\n" +
            "Correo: " + this.correo + "\n" +
            "Especialidad: " + this.especialidad + "\n";
    }
}
//# sourceMappingURL=Docente.js.map