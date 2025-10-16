import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "./Curso";

@Entity("instituicao")
export class Instituicao {
  @PrimaryGeneratedColumn()
  id_instituicao: number;

  @Column({ type: "varchar", length: 15, nullable: false, unique: true })
  tx_sigla: string;

  @Column({ type: "varchar", length: 150, nullable: false, unique: true })
  tx_descricao: string;

  @OneToMany(() => Curso, (curso) => curso.id_instituicao)
  cursos: Curso[];
}
