import { AppDataSource } from "../data-source";
import { Disciplina } from "../models/Disciplina";

export const DisciplinaRepository = AppDataSource.getRepository(Disciplina);
