import { Categoria } from "./categoria";

export interface ItemMenu {
    idItemMenu: number;
    nombreItem: string;
    descripcion: string;
    precio: number;
    categoria: Categoria;
  }