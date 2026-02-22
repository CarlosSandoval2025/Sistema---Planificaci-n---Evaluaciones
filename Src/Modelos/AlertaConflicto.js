class AlertaConflicto {
    id;
    mensaje;
    fecha;
    tipo;
    activo;
    constructor(id, mensaje, fecha, tipo, activo) {
        this.id = id;
        this.mensaje = mensaje;
        this.fecha = fecha;
        this.tipo = tipo;
        this.activo = activo;
    }
    getResumen() {
        return "Alerta: " + this.mensaje + "\n" +
            "Tipo: " + this.tipo + "\n" +
            "Fecha: " + this.fecha.toDateString() + "\n" +
            "Activa: " + (this.activo ? "Si" : "No");
    }
}
export {};
//# sourceMappingURL=AlertaConflicto.js.map