import {
  Check,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Titulo } from "./Tituto";
import { Disciplina } from "./Disciplina";

@Entity("professor")
@Check("chk_tx_sexo", "tx_sexo IN ('m', 'f')")
@Check("chk_tx_estado_civil", "tx_estado_civil IN ('s', 'c', 'd')")
export class Professor {
  @PrimaryGeneratedColumn()
  id_professor: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  tx_nome: string;

  @Column({ type: "char", length: 1, nullable: false, default: "m" })
  tx_sexo: string;

  @Column({ type: "char", length: 1, nullable: false, default: "s" })
  tx_estado_civil: string;

  @Column({ type: "date", nullable: false })
  dt_nascimento: Date;

  @Column({ type: "varchar", length: 13, nullable: false })
  tx_telefone: string;

  @ManyToOne(() => Titulo, (titulo) => titulo.professores, { nullable: false })
  @JoinColumn({
    name: "id_titulo",
    foreignKeyConstraintName: "fk_titulo_to_professor",
  })
  id_titulo: Titulo;

  @ManyToMany(() => Disciplina, (disciplina) => disciplina.professores)
  @JoinTable({
    name: "leciona",
    joinColumn: {
      name: "id_professor",
      referencedColumnName: "id_professor",
      foreignKeyConstraintName: "leciona_id_professor_fkey",
    },
    inverseJoinColumn: {
      name: "id_disciplina",
      referencedColumnName: "id_disciplina",
      foreignKeyConstraintName: "leciona_id_disciplina_fkey",
    },
  })
  disciplinas: Disciplina[];
}
