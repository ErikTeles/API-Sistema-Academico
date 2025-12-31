import { Request, Response } from "express";
import { CursoRepository } from "../repositories/CursoRepository";

export class CursoService {
  // Busca todos os alunos da tabela Aluno
  async allCursos(req: Request, res: Response) {
    return res.status(200).json(await CursoRepository.find());
  }

  async createCurso(req: Request, res: Response) {
    const { id_instituicao, id_tipo_curso, tx_descricao } = req.body;

    try {
      const newCurso = CursoRepository.create({
        id_instituicao,
        id_tipo_curso,
        tx_descricao,
      });

      await CursoRepository.save(newCurso);

      return res.status(201).json(newCurso);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao criar curso!" });
    }
  }

  async updateCurso(req: Request, res: Response) {
    const { id_curso } = req.params;
    const { id_instituicao, id_tipo_curso, tx_descricao } = req.body;

    try {
      const curso = await CursoRepository.findOneBy({
        id_curso: Number(id_curso),
      });

      if (!curso) {
        return res.status(404).json({ message: "Curso não encontrado!" });
      }

      await CursoRepository.update(
        { id_curso: Number(id_curso) },
        {
          id_instituicao,
          id_tipo_curso,
          tx_descricao,
        }
      );

      return res.status(200).json({
        message: "Curso atualizado com sucesso!",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao atualizar curso!" });
    }
  }

  async deleteCurso(req: Request, res: Response) {
    const { id_curso } = req.params;

    try {
      const curso = await CursoRepository.findOneBy({
        id_curso: Number(id_curso),
      });

      if (!curso) {
        return res.status(404).json({ message: "Curso não encontrado!" });
      }

      await CursoRepository.delete({
        id_curso: Number(id_curso),
      });

      return res.status(200).json({
        message: "Curso deletado com sucesso!",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao deletar curso!" });
    }
  }
}
