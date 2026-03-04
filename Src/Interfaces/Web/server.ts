import express from "express";
import path from "path";

// ===== MODELOS =====
import { Docente } from "../../Dominio/Modelos/Docente";
import { Curso } from "../../Dominio/Modelos/Curso";
import { Horario } from "../../Dominio/Modelos/Horario";
import { EvaluacionAcademica } from "../../Dominio/Modelos/EvaluacionAcademica";
import { TipoEvaluacion } from "../../Dominio/Enums/TipoEvaluacion";
import { EstadoEvaluacion } from "../../Dominio/Enums/EstadoEvaluacion";

// ===== REPOSITORIOS =====
import { RepositorioDocentes } from "../../Infraestructura/Repositorios/RepositorioDocentes";
import { RepositorioCursos } from "../../Infraestructura/Repositorios/RepositorioCursos";
import { RepositorioHorarios } from "../../Infraestructura/Repositorios/RepositorioHorarios";
import { RepositorioEvaluaciones } from "../../Infraestructura/Repositorios/RepositorioEvaluaciones";

// ===== SERVICIOS =====
import { ServicioCursos } from "../../Aplicacion/Servicios/ServicioCursos";
import { ServicioHorarios } from "../../Aplicacion/Servicios/ServicioHorarios";
import { ServicioEvaluaciones } from "../../Aplicacion/Servicios/ServicioEvaluaciones";

const app = express();
app.use(express.json());

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// ===== INSTANCIAS =====
const repoDocentes = new RepositorioDocentes();
const repoCursos = new RepositorioCursos();
const repoHorarios = new RepositorioHorarios();
const repoEvaluaciones = new RepositorioEvaluaciones();

const servicioCursos = new ServicioCursos(repoCursos);
const servicioHorarios = new ServicioHorarios(repoHorarios);
const servicioEvaluaciones = new ServicioEvaluaciones(repoEvaluaciones);

// ================= DOCENTES =================
app.get("/docentes", (req, res) => {
  res.json(repoDocentes.obtenerTodos());
});

app.post("/docentes", (req, res) => {
  const { dni, nombre, correo, especialidad } = req.body;
  const docente = new Docente(dni, nombre, correo, especialidad);
  repoDocentes.agregar(docente);
  res.json({ mensaje: "Docente creado correctamente" });
});

// ================= CURSOS =================
app.get("/cursos", (req, res) => {
  res.json(servicioCursos.getCursos());
});

app.post("/cursos", (req, res) => {
  try {
    const { id, nombre, creditos, indiceDocente } = req.body;

    const docente = repoDocentes.obtenerTodos()[indiceDocente];
    if (!docente) {
      return res.status(400).json({ error: "Docente inválido" });
    }

    const curso = new Curso(id, nombre, docente, creditos);
    servicioCursos.agregarCurso(curso);

    res.json({ mensaje: "Curso creado correctamente" });

  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// ================= HORARIOS =================
app.get("/horarios", (req, res) => {

  const horarios = servicioHorarios.getHorarios().map(h => ({
    id: h.getId(),
    dia: h.getDia(),
    inicio: h.getHoraInicioTexto(),
    fin: h.getHoraFinTexto(),
    aula: h.getAula(),
    curso: h.getCurso().getNombre(),
    docente: h.getDocente().getNombre()
  }));

  res.json(horarios);
});

app.post("/horarios", (req, res) => {
  try {

    console.log("BODY RECIBIDO:", req.body);

    const { id, dia, horaInicio, horaFin, aula, indiceCurso } = req.body;

    const curso = repoCursos.obtenerTodos()[indiceCurso];
    if (!curso) {
      return res.status(400).json({ error: "Curso inválido" });
    }

    const docente = curso.getDocente();

    const horario = new Horario(
      id,
      dia,
      horaInicio,
      horaFin,
      aula,
      docente,
      curso
    );

    servicioHorarios.agregarHorario(horario);

    console.log("✅ Horario guardado correctamente");

    res.json({ mensaje: "Horario creado correctamente" });

  } catch (error: any) {
    console.error("ERROR:", error);
    res.status(400).json({ error: error.message });
  }
});

// ================= EVALUACIONES =================
app.get("/evaluaciones", (req, res) => {
  res.json(servicioEvaluaciones.getEvaluaciones());
});

app.post("/evaluaciones", (req, res) => {
  const { titulo, fecha, duracion, indiceHorario } = req.body;

  const horario = servicioHorarios.getHorarios()[indiceHorario];
  if (!horario) return res.status(400).json({ error: "Horario inválido" });

  const evaluacion = new EvaluacionAcademica(
    Date.now(),
    titulo,
    TipoEvaluacion.EXAMEN,
    new Date(fecha),
    duracion ?? 60,
    EstadoEvaluacion.PROGRAMADA,
    horario
  );

  servicioEvaluaciones.agregarEvaluacion(evaluacion);
  servicioEvaluaciones.verificarAlertas();
  servicioEvaluaciones.verificarConflictos();

  res.json({ mensaje: "Evaluación creada correctamente" });
});

app.delete("/evaluaciones/:id", (req, res) => {
  const id = Number(req.params.id);
  servicioEvaluaciones.eliminarEvaluacion(id);
  res.json({ mensaje: "Evaluación eliminada correctamente" });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log("Servidor corriendo en puerto " + PORT)
);