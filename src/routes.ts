import { Router } from "express";
import { AlunoController } from "./controllers/AlunoController";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json("API está funcionado e o banco de dados está conectado!");
});

// CRUD da tabela Aluno
routes.get("/alunos", new AlunoController().allAlunos);

routes.post("/aluno", new AlunoController().createAluno);

routes.put("/aluno/:id", new AlunoController().updateAluno);

routes.delete("/aluno/:id", new AlunoController().deleteAluno);

export default routes;
