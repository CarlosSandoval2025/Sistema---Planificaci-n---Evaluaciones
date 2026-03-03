import express from "express";
import path from "path";

import { RepositorioDocentes } from "../../Infraestructura/Repositorios/RepositorioDocentes";
import { RepositorioHorarios } from "../../Infraestructura/Repositorios/RepositorioHorarios";
import { RepositorioEvaluaciones } from "../../Infraestructura/Repositorios/RepositorioEvaluaciones";

import { ServicioDocentes } from "../../Aplicacion/Servicios/ServicioDocentes";
import { ServicioHorarios } from "../../Aplicacion/Servicios/ServicioHorarios";
import { ServicioEvaluaciones } from "../../Aplicacion/Servicios/ServicioEvaluaciones";

import { Docente } from "../../Dominio/Modelos/Docente";
import { Curso } from "../../Dominio/Modelos/Curso";
import { Horario } from "../../Dominio/Modelos/Horario";
import { EvaluacionAcademica } from "../../Dominio/Modelos/EvaluacionAcademica";
import { TipoEvaluacion } from "../../Dominio/Enums/TipoEvaluacion";
import { EstadoEvaluacion } from "../../Dominio/Enums/EstadoEvaluacion";

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const servicioDocentes = new ServicioDocentes(new RepositorioDocentes());
const servicioHorarios = new ServicioHorarios(new RepositorioHorarios());
const servicioEvaluaciones = new ServicioEvaluaciones(new RepositorioEvaluaciones());

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "public", "index.html"));
});

// DOCENTES
app.get("/docentes", (req, res) => res.json(servicioDocentes.getDocentes()));
app.post("/docentes", (req, res) => {
const { dni, nombre, correo, especialidad } = req.body;
servicioDocentes.agregarDocente(new Docente(dni, nombre, correo, especialidad));
res.json({ mensaje: "Docente creado" });
});

// CURSOS
app.post("/cursos", (req, res) => {
const { id, nombre, creditos } = req.body;
const docente = new Docente("000","Temporal","temp@temp.com","General");
res.json({ mensaje: "Curso creado" });
});

// HORARIOS
app.get("/horarios", (req, res) => res.json(servicioHorarios.getHorarios()));
app.post("/horarios", (req, res) => {
const { id, dia, inicio, fin, aula } = req.body;
const docente = new Docente("000","Temporal","temp@temp.com","General");
const curso = new Curso(1,"Temporal",docente,3);
servicioHorarios.agregarHorario(new Horario(id,dia,inicio,fin,aula,docente,curso));
res.json({ mensaje: "Horario creado" });
});

// EVALUACIONES
app.get("/evaluaciones", (req, res) => res.json(servicioEvaluaciones.getEvaluaciones()));
app.post("/evaluaciones", (req, res) => {
const { titulo, fecha } = req.body;
const docente = new Docente("000","Temporal","temp@temp.com","General");
const curso = new Curso(1,"Temporal",docente,3);
const horario = new Horario(1,"Lunes","08:00","10:00","A1",docente,curso);

servicioEvaluaciones.agregarEvaluacion(
new EvaluacionAcademica(
Date.now(),
titulo,
TipoEvaluacion.EXAMEN,
new Date(fecha),
60,
EstadoEvaluacion.PROGRAMADA,
horario
)
);

res.json({ mensaje: "Evaluación creada" });
});

app.delete("/evaluaciones/:id", (req,res)=>{
servicioEvaluaciones.eliminarEvaluacion(Number(req.params.id));
res.json({mensaje:"Eliminada"});
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
