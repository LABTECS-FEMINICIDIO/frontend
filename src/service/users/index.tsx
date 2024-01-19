import { api } from "../api";

export function createUser(data: any){
    return api.post('/api/usuarios/', data)
}

export function findManyUsers(){
    return api.get('/api/usuarios/')
}
export function createPassword(userId: string){
    return api.post('/api/usuarios/reset/', userId)
}