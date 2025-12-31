import { Router } from "express";
import { AlunoService } from "../services/AlunoService";

const routesAluno = Router();

// CRUD da tabela Aluno
routesAluno.get("/", new AlunoService().allAlunos);

routesAluno.post("/", new AlunoService().createAluno);

routesAluno.put("/:id", new AlunoService().updateAluno);

routesAluno.delete("/:id", new AlunoService().deleteAluno);

export default routesAluno;