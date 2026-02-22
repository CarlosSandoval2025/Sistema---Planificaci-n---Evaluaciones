import { Docente } from "./Docente.js";
import { EvaluacionAcademica } from "./EvaluacionAcademica.js";
class Curso {
    id;
    nombre;
    docente;
    creditos;
    evaluaciones;
    constructor(id, nombre, docente, creditos) {
        this.id = id;
        this.nombre = nombre;
        this.docente = docente;
        this.creditos = creditos;
        this.evaluaciones = [];
    }
    getResumen() {
        return this.nombre + " - Docente: " + this.docente.getResumen() + " - Creditos: " + this.creditos;
    }
}
//# sourceMappingURL=Curso.js.map