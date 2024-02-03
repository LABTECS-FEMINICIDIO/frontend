import { IUser } from "../../models/users";
import { api } from "../api";

export function createUser(data: any){
    return api.post('/api/usuarios/', data)
}
export function registerUser(data: any){
    return api.post('/api/usuarios/visualizador/', data)
}
export function findManyUsers(){
    return api.get('/api/usuarios/')
}
export async function findById(id: string) {
    return api.get('api/usuarios/' + id);
}
export function createPassword(userId: string){
    return api.post('/api/usuarios/reset/' +userId)
}
export function deleteUser(userId: string){
    return api.delete('/api/usuarios/'+userId)
}
export function updateUser(userId: string, data: IUser){
    return api.patch('/api/usuarios/'+userId, data)
}