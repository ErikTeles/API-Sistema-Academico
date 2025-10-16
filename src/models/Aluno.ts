import {
  Check,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cursa } from "./Cursa";

@Entity("aluno")
@Check("chk_tx_sexo", "tx_sexo IN ('m', 'f')")
export class Aluno {
  @PrimaryGeneratedColumn()
  id_aluno: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  tx_nome: string;

  @Column({ type: "char", length: 1, nullable: false })
  tx_sexo: string;

  @Column({ type: "date", nullable: false })
  dt_nascimento: Date;

  @OneToMany(() => Cursa, (cursa) => cursa.id_aluno)
  cursas: Cursa[];
}
