import { Request, Response } from "express";
import { CursaRepository } from "../repositories/CursaRepository";

export class CursaService {
  // Busca todos os alunos da tabela Aluno
  async allCursas(req: Request, res: Response) {
    return res.status(200).json(await CursaRepository.find());
  }

  async createCursa(req: Request, res: Response) {
    const { id_aluno, id_disciplina, in_ano, in_semestre } = req.body;

    try {
      const newCursa = CursaRepository.create({
        id_aluno,
        id_disciplina,
        in_ano,
        in_semestre,
      });

      await CursaRepository.save(newCursa);

      return res.status(201).json(newCursa);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ message: "Erro ao atribuir disciplina ao aluno!" });
    }
  }

  async updateCursa(req: Request, res: Response) {
    const { id_aluno, id_disciplina } = req.params;
    const {
      in_ano,
      in_semestre,
      in_faltas,
      nm_nota1,
      nm_nota2,
      nm_nota3,
      bl_aprovado,
    } = req.body;

    try {
      const cursa = await CursaRepository.findOneBy({
        id_aluno: Number(id_aluno),
        id_disciplina: Number(id_disciplina),
      });

      if (!cursa) {
        return res
          .status(404)
          .json({ message: "Disciplina atribuída ao aluno não encontrada!" });
      }

      await CursaRepository.update(
        { id_aluno: Number(id_aluno), id_disciplina: Number(id_disciplina) },
        {
          in_ano,
          in_semestre,
          in_faltas,
          nm_nota1,
          nm_nota2,
          nm_nota3,
          bl_aprovado,
        }
      );

      return res.status(200).json({
        message: "Disciplina atribuída ao aluno atualizada com sucesso!",
      });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ message: "Erro ao atualizar disciplina atribuída ao aluno!" });
    }
  }

  async deleteCursa(req: Request, res: Response) {
    const { id_aluno, id_disciplina } = req.params;

    try {
      const cursa = await CursaRepository.findOneBy({
        id_aluno: Number(id_aluno),
        id_disciplina: Number(id_disciplina),
      });

      if (!cursa) {
        return res
          .status(404)
          .json({ message: "Disciplina atribuída ao aluno não encontrada!" });
      }

      await CursaRepository.delete({
        id_aluno: Number(id_aluno),
        id_disciplina: Number(id_disciplina),
      });

      return res.status(200).json({
        message: "Disciplina atribuída ao aluno deletada com sucesso!",
      });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ message: "Erro ao deletar disciplina atribuída ao aluno!" });
    }
  }
}
