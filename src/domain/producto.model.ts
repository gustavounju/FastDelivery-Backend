// export interface Producto {
//   id: number;
//   nombre: string;
//   descripcion: string | null;
//   categoria: 'EMPANADA' | 'GASEOSA';
//   precio: number;
//   urlImagen: string | null; // Usamos `string | null` para reflejar `nullable: true`
//   estaDisponible: boolean;
//   saborEmpanada:
//     | 'POLLO'
//     | 'CARNE'
//     | 'ARABE'
//     | 'CARNE_CORTADA_A_CUCHILLO'
//     | null;
//   tipoGaseosa: 'COCA_COLA' | 'SPRITE' | 'FANTA' | null;
// }
// products/dto/producto.dto.ts (o src/domain/producto.model.ts)

export interface ProductoDto {
  id: number;
  nombre: string;
  descripcion: string | null;
  categoriaId: number;
  precio: number;
  urlImagen: string | null;
  estaDisponible: boolean;
  stock: number;
}
