import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categorias') // Nombre de la tabla en la base de datos
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, type: 'varchar', unique: true }) // El nombre de la categoría debería ser único
  nombre: string; // Ej: "Empanadas", "Gaseosas", "Pizzas"
}
