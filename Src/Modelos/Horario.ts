export class Horario{
    private id: number;
    private dia: string;
    private horaInicio: string;
    private horaFin: string;
    private aula: string;

    constructor(id: number, dia: string, horaInicio: string, horaFin: string, aula: string){
        this.id = id;
        this.dia =dia;
        this.horaInicio = horaInicio;
        this.horaFin =horaFin;
        this.aula = aula;
    }

    getResumen(): string{
        return "Dia: " + this.dia + "\n" + 
        "Inicio: " + this.horaInicio + "\n" +
        "Fin: " + this.horaFin + "\n" +
        "Aula: " + this.aula + "\n" ;
    }
}