import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productos') // Nombre de la tabla en la base de datos
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string; // Ej: "Empanada de Pollo", "Coca-Cola Zero"

  @Column({
    type: 'enum',
    enum: ['EMPANADA', 'GASEOSA'], // Categorías de productos
    default: 'EMPANADA',
  })
  categoria: 'EMPANADA' | 'GASEOSA';

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Precio con hasta 2 decimales
  precio: number;

  @Column({ nullable: true }) // URL de la imagen del producto para mostrar en la app
  urlImagen: string | null;

  @Column({ default: true }) // Indica si el producto está disponible para la venta (true) o agotado/temporalmente fuera (false)
  estaDisponible: boolean;

  // Propiedad específica para el tipo 'EMPANADA'
  @Column({
    type: 'enum',
    enum: ['POLLO', 'CARNE', 'ARABE', 'CARNE_CORTADA_A_CUCHILLO'],
    nullable: true, // Es nulo si la categoría no es 'EMPANADA'
  })
  saborEmpanada:
    | 'POLLO'
    | 'CARNE'
    | 'ARABE'
    | 'CARNE_CORTADA_A_CUCHILLO'
    | null;

  // Propiedad específica para el tipo 'GASEOSA'
  @Column({
    type: 'enum',
    enum: ['COCA_COLA', 'SPRITE', 'FANTA'],
    nullable: true, // Es nulo si la categoría no es 'GASEOSA'
  })
  tipoGaseosa: 'COCA_COLA' | 'SPRITE' | 'FANTA' | null;
}
