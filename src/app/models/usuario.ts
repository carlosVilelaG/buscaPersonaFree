export interface Usuario {
    id: number;
    nombres: string;
    email: string;
    password: string;
    rol: number;
    estado?: string;
    identificacion:string;
    tipoIdentificacion:string;
}
