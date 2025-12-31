import { Request, Response } from "express";
import { TipoCursoRepository } from "../repositories/TipoCursoRepository";

export class TipoCursoService {
  // Busca todos os alunos da tabela Aluno
  async allTipoCurso(req: Request, res: Response) {
    return res.status(200).json(await TipoCursoRepository.find());
  }

  async createTipoCurso(req: Request, res: Response) {
    const { tx_descricao } = req.body;

    try {
      const newTipoCurso = TipoCursoRepository.create({
        tx_descricao,
      });

      await TipoCursoRepository.save(newTipoCurso);

      return res.status(201).json(newTipoCurso);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao criar tipo de curso!" });
    }
  }

  async updateTipoCurso(req: Request, res: Response) {
    const { id } = req.params;
    const { tx_descricao } = req.body;

    try {
      const tipoCurso = await TipoCursoRepository.findOneBy({
        id_tipo_curso: Number(id),
      });

      if (!tipoCurso) {
        return res.status(404).json({ message: "Tipo de curso não encontrado!" });
      }

      await TipoCursoRepository.update(
        { id_tipo_curso: Number(id) },
        {
          tx_descricao,
        }
      );

      return res.status(200).json({ message: "Tipo de curso atualizado com sucesso!" });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao atualizar tipo de curso!" });
    }
  }

  async deleteTipoCurso(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const tipoCurso = await TipoCursoRepository.findOneBy({
        id_tipo_curso: Number(id),
      });

      if (!tipoCurso) {
        return res.status(404).json({ message: "Tipo de curso não encontrado!" });
      }

      await TipoCursoRepository.delete({ id_tipo_curso: Number(id) });

      return res.status(200).json({ message: "Tipo de curso deletado com sucesso!" });
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({ message: "Erro ao deletar tipo de curso!" });
    }
  }
}
