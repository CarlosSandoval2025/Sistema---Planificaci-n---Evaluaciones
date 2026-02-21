class EvaluacionAcademica{
    private id: number;
    private titulo: string;
    private tipo: string;
    private fecha: Date;
    private duracionMin: number;
    private estado: string;

    constructor(id: number, titulo: string, tipo: string, fecha: Date, duracionMin: number, estado: string){
        this.id = id;
        this.titulo = titulo;
        this.tipo = tipo;
        this.fecha = fecha;
        this.duracionMin = duracionMin;
        this.estado = estado;
    } 

    getResumen(): string{
        return this.titulo + "\n" + "Tipo: " + this.tipo + "\n" + "Fecha: " + this.fecha.toLocaleDateString + "\n" +
        "Duracion: " + this.duracionMin + "min\n" + "Estado: " + this.estado;
    }

}