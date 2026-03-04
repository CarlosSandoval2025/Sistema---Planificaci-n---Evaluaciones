import express from "express";
import path from "path";
import { Docente } from "../../Dominio/Modelos/Docente";
import { Curso } from "../../Dominio/Modelos/Curso";
import { Horario } from "../../Dominio/Modelos/Horario";
import { EvaluacionAcademica } from "../../Dominio/Modelos/EvaluacionAcademica";
import { TipoEvaluacion } from "../../Dominio/Enums/TipoEvaluacion";
import { EstadoEvaluacion } from "../../Dominio/Enums/EstadoEvaluacion";

const app = express();
app.use(express.json());

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// ===== MEMORIA =====
let docentes: Docente[] = [];
let cursos: Curso[] = [];
let horarios: Horario[] = [];
let evaluaciones: EvaluacionAcademica[] = [];

// ===== DOCENTES =====
app.get("/docentes", (req, res) => {
  res.json(docentes.map(d => ({
    dni: d.getDni(),
    nombre: d.getNombre(),
    correo: d.getCorreo(),
    especialidad: (d as any).especialidad ?? "Sin especialidad"
  })));
});

app.post("/docentes", (req, res) => {
  const { dni, nombre, correo, especialidad } = req.body;
  const docente = new Docente(dni, nombre, correo, especialidad);
  docentes.push(docente);
  res.json({ mensaje: "Docente creado" });
});

// ===== CURSOS =====
app.get("/cursos", (req, res) => {
  res.json(cursos.map(c => ({
    id: c.getId(),
    nombre: (c as any).nombre ?? "Sin nombre",
    creditos: (c as any).creditos ?? 0,
    docente: c.getDocente().getNombre()
  })));
});

app.post("/cursos", (req, res) => {
  const { id, nombre, creditos, indiceDocente } = req.body;
  const docente = docentes[indiceDocente];
  if (!docente) return res.status(400).json({ error: "Docente inválido" });

  const curso = new Curso(id, nombre, docente, creditos);
  cursos.push(curso);
  res.json({ mensaje: "Curso creado" });
});

// ===== HORARIOS =====
function minutosAHoraString(minutos: number): string {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m);
}

app.get("/horarios", (req, res) => {
  res.json(horarios.map(h => ({
    id: h.getId(),
    dia: h.getDia(),
    inicio: minutosAHoraString(h.getHoraInicio()),
    fin: minutosAHoraString(h.getHoraFin()),
    aula: h.getAula(),
    curso: (h.getCurso() as any).nombre,
    docente: h.getDocente().getNombre()
  })));
});

app.post("/horarios", (req, res) => {
  const { id, dia, inicio, fin, aula, indiceCurso } = req.body;
  const curso = cursos[indiceCurso];
  if (!curso) return res.status(400).json({ error: "Curso inválido" });

  const docente = curso.getDocente();
  const horario = new Horario(id, dia, inicio, fin, aula, docente, curso);
  horarios.push(horario);

  res.json({ mensaje: "Horario creado" });
});

// ===== EVALUACIONES =====
app.get("/evaluaciones", (req, res) => {
  res.json(evaluaciones.map(e => ({
    id: e.getId(),
    titulo: e.getTitulo(),
    fecha: e.getFecha(),
    duracion: (e as any).duracionMin ?? 0,
    estado: e.getEstado(),
    horario: {
      dia: e.getHorario().getDia(),
      curso: (e.getHorario().getCurso() as any).nombre,
      docente: e.getHorario().getDocente().getNombre()
    }
  })));
});

app.post("/evaluaciones", (req, res) => {
  const { titulo, fecha, duracion, indiceHorario } = req.body;

  if (horarios.length === 0) {
    return res.status(400).json({ error: "No hay horarios registrados." });
  }

  const horario = horarios[indiceHorario];
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

  evaluaciones.push(evaluacion);
  res.json({ mensaje: "Evaluación creada" });
});

app.delete("/evaluaciones/:id", (req, res) => {
  const id = Number(req.params.id);
  evaluaciones = evaluaciones.filter(e => e.getId() !== id);
  res.json({ mensaje: "Evaluación eliminada" });
});

// ===== PUERTO =====
const PORT = 3000;
app.listen(PORT, () => console.log("Servidor corriendo en puerto " + PORT));