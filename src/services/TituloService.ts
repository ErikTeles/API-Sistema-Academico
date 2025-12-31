import { Request, Response } from "express";
import { TituloRepository } from "../repositories/TituloRepository";

export class TituloService {
  // Busca todos os titulos da tabela Titulo
  async allTitulos(req: Request, res: Response) {
    return res.status(200).json(await TituloRepository.find());
  }

  async createTitulo(req: Request, res: Response) {
    const { tx_descricao } = req.body;

    try {
      const newTitulo = TituloRepository.create({
        tx_descricao,
      });

      await TituloRepository.save(newTitulo);

      return res.status(201).json(newTitulo);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao criar titulo!" });
    }
  }

  async updateTitulo(req: Request, res: Response) {
    const { id } = req.params;
    const { tx_descricao } = req.body;

    try {
      const titulo = await TituloRepository.findOneBy({
        id_titulo: Number(id),
      });

      if (!titulo) {
        return res.status(404).json({ message: "Titulo não encontrado!" });
      }

      await TituloRepository.update(
        { id_titulo: Number(id) },
        {
          tx_descricao,
        }
      );

      return res.status(200).json({ message: "Titulo atualizado com sucesso!" });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao atualizar titulo!" });
    }
  }

  async deleteTitulo(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const titulo = await TituloRepository.findOneBy({
        id_titulo: Number(id),
      });

      if (!titulo) {
        return res.status(404).json({ message: "Titulo não encontrado!" });
      }

      await TituloRepository.delete({ id_titulo: Number(id) });

      return res.status(200).json({ message: "Titulo deletado com sucesso!" });
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({ message: "Erro ao deletar titulo!" });
    }
  }
}
