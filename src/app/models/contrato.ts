export interface Contrato {
    id_contrato?: number;
    id_usuario_contratante: number;
    estado?: string;
    tipo_contrato : number;
    id_usuario_trabajador: number;
    fecha_inicio:string;
    fecha_fin:string;
    descripcion: string;
}