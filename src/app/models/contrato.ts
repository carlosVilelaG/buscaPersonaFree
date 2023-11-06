export interface Contrato {
    id_contrato: number;
    id_usuario_contratante: number;
    estado?: string;
    tipo_contrato : number;
    id_usuario_trabajador: number;
    fecha_inicio:Date;
    fecha_fin:Date;
    descripcion: string;
}