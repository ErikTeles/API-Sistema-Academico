import { Router } from "express";
import { InstituicaoService } from "../services/InstituicaoService";

const routesInstituicao = Router();

// CRUD da tabela Instituicao
routesInstituicao.get("/", new InstituicaoService().allInstituicoes);

routesInstituicao.post("/", new InstituicaoService().createInstituicao);

routesInstituicao.put("/:id", new InstituicaoService().updateInstituicao);

routesInstituicao.delete("/:id", new InstituicaoService().deleteInstituicao);

export default routesInstituicao;