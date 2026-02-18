var Curso = /** @class */ (function () {
    function Curso(id, nombre, docente, creditos) {
        this.id = id;
        this.nombre = nombre;
        this.docente = docente;
        this.creditos = creditos;
    }
    Curso.prototype.getResumen = function () {
        return this.nombre + " - Docente: " + this.docente + " - Creditos: " + this.creditos;
    };
    return Curso;
}());
var myCurso = new Curso(1, "Programacion", "Carlos", 4);
console.log(myCurso.getResumen());
