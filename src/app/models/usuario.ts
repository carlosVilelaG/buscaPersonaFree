export interface Usuario {
    id: number;
    nombres: string;
    email: string;
    pasword: string;
    rol: number;
    estado?: string;
    identificacion:string;
    tipoIdentificacion:string;
}
