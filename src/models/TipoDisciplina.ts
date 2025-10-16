import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Disciplina } from "./Disciplina";

@Entity("tipo_disciplina")
export class TipoDisciplina {
  @PrimaryGeneratedColumn()
  id_tipo_disciplina: number;

  @Column({ type: "varchar", length: 150, nullable: false, unique: true })
  tx_descricao: string;

  @OneToMany(() => Disciplina, (disciplina) => disciplina.id_tipo_disciplina)
  disciplinas: Disciplina[];
}
