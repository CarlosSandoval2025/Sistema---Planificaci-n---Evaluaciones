class AlertaConflicto{
    private id: number;
    private mensaje: string; 
    private fecha: Date;
    private tipo: string;
    private activo: boolean;
    
    constructor(id: number, mensaje: string, fecha: Date, tipo: string, activo: boolean){
        this.id = id;
        this.mensaje = mensaje;
        this.fecha = fecha;
        this.tipo = tipo;
        this.activo = activo;
    }

    getResumen(): string{
        return "Alerta: " + this.mensaje + "\n" + 
        "Tipo: " + this.tipo + "\n" +
        "Fecha: " + this.fecha.toDateString() + "\n" +
        "Activa: " + (this.activo ? "Si" : "No");
    }
}