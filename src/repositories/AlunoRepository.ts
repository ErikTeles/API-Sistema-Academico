import { AppDataSource } from "../data-source";
import { Aluno } from "../models/Aluno";

export const AlunoRepository = AppDataSource.getRepository(Aluno);
