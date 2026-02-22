export class Horario {
    id;
    dia;
    horaInicio;
    horaFin;
    aula;
    constructor(id, dia, horaInicio, horaFin, aula) {
        this.id = id;
        this.dia = dia;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.aula = aula;
    }
    getResumen() {
        return "Dia: " + this.dia + "\n" +
            "Inicio: " + this.horaInicio + "\n" +
            "Fin: " + this.horaFin + "\n" +
            "Aula: " + this.aula + "\n";
    }
}
//# sourceMappingURL=Horario.js.map