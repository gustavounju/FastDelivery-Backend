export interface Producto {
  id: number;
  nombre: string;
  // descripcion: string;
  categoria: 'EMPANADA' | 'GASEOSA';
  precio: number;
  urlImagen: string | null; // Usamos `string | null` para reflejar `nullable: true`
  estaDisponible: boolean;
  saborEmpanada:
    | 'POLLO'
    | 'CARNE'
    | 'ARABE'
    | 'CARNE_CORTADA_A_CUCHILLO'
    | null;
  tipoGaseosa: 'COCA_COLA' | 'SPRITE' | 'FANTA' | null;
}
