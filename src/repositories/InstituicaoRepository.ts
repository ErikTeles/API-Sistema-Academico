import { AppDataSource } from "../data-source";
import { Instituicao } from "../models/Instituicao";

export const InstituicaoRepository = AppDataSource.getRepository(Instituicao);