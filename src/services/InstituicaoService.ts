import { Request, Response } from "express";
import { InstituicaoRepository } from "../repositories/InstituicaoRepository";

export class InstituicaoService {
  // Busca todos os alunos da tabela Aluno
  async allInstituicoes(req: Request, res: Response) {
    return res.status(200).json(await InstituicaoRepository.find());
  }

  async createInstituicao(req: Request, res: Response) {
    const { tx_sigla, tx_descricao } = req.body;

    try {
      const newInstituicao = InstituicaoRepository.create({
        tx_sigla,
        tx_descricao,
      });

      await InstituicaoRepository.save(newInstituicao);

      return res.status(201).json(newInstituicao);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao criar instituição!" });
    }
  }

  async updateInstituicao(req: Request, res: Response) {
    const { id } = req.params;
    const { tx_sigla, tx_descricao } = req.body;

    try {
      const instituicao = await InstituicaoRepository.findOneBy({
        id_instituicao: Number(id),
      });

      if (!instituicao) {
        return res.status(404).json({ message: "Instituição não encontrada!" });
      }

      await InstituicaoRepository.update(
        { id_instituicao: Number(id) },
        {
          tx_sigla,
          tx_descricao,
        }
      );

      return res.status(200).json({ message: "Instituição atualizada com sucesso!" });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao atualizar instituição!" });
    }
  }

  async deleteInstituicao(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const instituicao = await InstituicaoRepository.findOneBy({
        id_instituicao: Number(id),
      });

      if (!instituicao) {
        return res.status(404).json({ message: "Instituição não encontrada!" });
      }

      await InstituicaoRepository.delete({ id_instituicao: Number(id) });

      return res.status(200).json({ message: "Instituição deletada com sucesso!" });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao deletar instituição!" });
    }
  }
}
