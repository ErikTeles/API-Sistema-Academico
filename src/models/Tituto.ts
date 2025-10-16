import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Professor } from "./Professor";

@Entity("titulo")
export class Titulo {
  @PrimaryGeneratedColumn()
  id_titulo: number;

  @Column({ type: "varchar", length: 150, nullable: false, unique: true })
  tx_descricao: string;

  @OneToMany(() => Professor, (professor) => professor.id_titulo)
  professores: Professor[];
}
