import { Router } from "express";
import { TipoCursoService } from "../services/TipoCursoService ";

const routesTipoCurso = Router();

// CRUD da tabela TipoCurso
routesTipoCurso.get("/", new TipoCursoService().allTipoCurso);

routesTipoCurso.post("/", new TipoCursoService().createTipoCurso);

routesTipoCurso.put("/:id", new TipoCursoService().updateTipoCurso);

routesTipoCurso.delete("/:id", new TipoCursoService().deleteTipoCurso);

export default routesTipoCurso;