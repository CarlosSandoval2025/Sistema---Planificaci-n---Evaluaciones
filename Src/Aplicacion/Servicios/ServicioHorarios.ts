import { Horario } from "../../Dominio/Modelos/Horario";
import { RepositorioHorarios } from "../../Infraestructura/Repositorios/RepositorioHorarios";

export class ServicioHorarios {

    constructor(
        private repositorio: RepositorioHorarios
    ) {}

    agregarHorario(horario: Horario): void {

        if (this.verificarConflictoAula(horario)) {
            console.log("Conflicto detectado en aula.");
            return;
        }

        if (this.verificarConflictoDocente(horario)) {
            console.log("Conflicto detectado: el docente ya tiene clase en ese horario.");
            return;
        }

        if (this.verificarConflictoCurso(horario)) {
            return;
        }

        this.repositorio.agregar(horario);
        console.log("Horario registrado correctamente.");
    }

    listarHorarios(): void {

        const horarios = this.repositorio.obtenerTodos();
        if(horarios.length === 0) {
            console.log("No hay horarios registrados.");
            return;
        }

        horarios.forEach((h, index) => {
            console.log("\nHorario #" + (index + 1));
            console.log(h.getResumen());
        });
    }

    private verificarConflictoAula(nuevo: Horario): boolean {

        const horarios = this.repositorio.obtenerTodos();

        for(const h of horarios) {
            const mismoDia = h.getDia() === nuevo.getDia();
            const mismaAula = h.getAula() === nuevo.getAula();
            
            const inicio1 = h.getHoraInicio();
            const fin1 = h.getHoraFin();
            const inicio2 = nuevo.getHoraInicio();
            const fin2 = nuevo. getHoraFin();

            const hayCruce = inicio1 < fin2 && fin1 > inicio2;

            if(mismoDia && mismaAula && hayCruce) {
                return true;
            }
        }
        return false;
    }
    
    private verificarConflictoDocente(nuevo: Horario): boolean {

        const horarios = this.repositorio.obtenerTodos();

        for (const h of horarios) {

            const mismoDia = h.getDia() === nuevo.getDia();
            const mismoDocente = h.getDocente().getDni() === nuevo.getDocente().getDni();
            
            const inicio1 = h.getHoraInicio();
            const fin1 = h.getHoraFin();
            const inicio2 = nuevo.getHoraInicio();
            const fin2 = nuevo. getHoraFin();

            const hayCruce = inicio1 < fin2 && fin1 > inicio2;

            if (mismoDia && mismoDocente && hayCruce) {
                return true;
            }
        }

        return false;
    }

    private verificarConflictoCurso(nuevo: Horario): boolean {

        const horarios = this.repositorio.obtenerTodos();

        for (const h of horarios) {

            const mismoDia = h.getDia() === nuevo.getDia();
            const mismoCurso = h.getCurso().getId() === nuevo.getCurso().getId();
             
            const inicio1 = h.getHoraInicio();
            const fin1 = h.getHoraFin();
            const inicio2 = nuevo.getHoraInicio();
            const fin2 = nuevo. getHoraFin();

            const hayCruce = inicio1 < fin2 && fin1 > inicio2;

            if (mismoDia && mismoCurso && hayCruce) {
                console.log("Conflicto detectado: el curso ya tiene clase en ese horario.");
                return true;
            }
        }

        return false;
    }

    public getHorarios(): Horario[] {
        return this.repositorio.obtenerTodos();
    }

    eliminarHorario(id: number): void {
        this.repositorio.eliminar(id);
        console.log("Horario eliminado correctamente.");
    }

    modificarDocente(
        idHorario: number,
        nuevoNombre?: string,
        nuevoCorreo?: string,
        nuevaEspecialidad?: string
    ):  void {
        
        const horario= this.repositorio.obtenerTodos()
           .find(h => h.getId() === idHorario);

        if(!horario) {
            console.log("Horario no encontrado.");
            return;
        }

        const docente=  horario.getDocente();

        if (nuevoNombre) docente.actualizarNombre(nuevoNombre);
        if (nuevoCorreo) docente.actualizarCorreo(nuevoCorreo);
        if (nuevaEspecialidad) docente.actualizarEspecialidad(nuevaEspecialidad);

        this.repositorio.guardarCambios();
        console.log("Docente actualizado correctamente.");
    }

    modificarCurso(
        idHorario: number,
        nuevoNombre?: string,
        nuevosCreditos?: number
    ): void {

        const horario = this.repositorio.obtenerTodos()
            .find(h => h.getId() === idHorario);

        if (!horario) {
            console.log("Horario no encontrado.");
            return;
        }

        const curso = horario.getCurso();

        if (nuevoNombre) curso.actualizarNombre(nuevoNombre);
        if (nuevosCreditos !== undefined)
            curso.actualizarCreditos(nuevosCreditos);

        this.repositorio.guardarCambios();
        console.log("Curso actualizado correctamente.");
    }
}
