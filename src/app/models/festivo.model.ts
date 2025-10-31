export interface Pais {
  id: number;
  nombre?: string;
}

export interface TipoFestivo {
  id: number;
  tipo: string;
}

export interface Festivo {
  id: number;
  nombre: string;
  dia: number;
  mes: number;
  diasPascua?: number;
  pais: Pais;
  tipoFestivo: TipoFestivo;
}
