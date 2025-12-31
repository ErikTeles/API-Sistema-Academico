import { AppDataSource } from "../data-source";
import { TipoCurso } from "../models/TipoCurso";

export const TipoCursoRepository = AppDataSource.getRepository(TipoCurso);