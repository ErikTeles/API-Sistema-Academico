import { Router } from "express";
import alunoRoutes from "./controllers/AlunoController";
import tituloRoutes from "./controllers/TituloController";
import instituicaoRoutes from "./controllers/InstituicaoController";
import tipoCursoRoutes from "./controllers/TipoCursoController";
import tipoDisciplinaRoutes from "./controllers/TipoDisciplinaController";
import cursaRoutes from "./controllers/CursaController";
import cursoRoutes from "./controllers/CursoController";
import disciplinaRoutes from "./controllers/DisciplinaController";
import professorRoutes from "./controllers/ProfessorController";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json("API está funcionado e o banco de dados está conectado!");
});

routes.use("/aluno", alunoRoutes);
routes.use("/titulo", tituloRoutes);
routes.use("/instituicao", instituicaoRoutes);
routes.use("/tipo_curso", tipoCursoRoutes);
routes.use("/tipo_disciplina", tipoDisciplinaRoutes);
routes.use("/cursa", cursaRoutes);
routes.use("/curso", cursoRoutes);
routes.use("/disciplina", disciplinaRoutes);
routes.use("/professor", professorRoutes);

export default routes;
