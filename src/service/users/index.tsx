import { api, apiAuth } from "../api";

export function createUser(data: any){
    return apiAuth.post('/api/v1/users', data)
}
export function registerUser(data: any){
    const dataWithRole = {
        ...data,
        role: 2
    }
    return apiAuth.post('/api/v1/users', dataWithRole)
}
export function findManyUsers(){
    return apiAuth.get('/api/v1/users')
}
export async function findById(id: string) {
    return api.get('api/usuarios/' + id);
}
export function createPassword(userId: string){
    return apiAuth.post('/api/v1/auth/password-reset', {
        email: userId
    })
}
export function deleteUser(userId: string){
    return apiAuth.delete('/api/v1/users/'+userId)
}
export function updateUser(userId?: string, data?: any){
    const dict: any = {
        Administrador: 1,
        Digitador: 4,
        Editor: 3,
        Visualizador: 2
    }

    if (Object.keys(data).includes("role")){
        data.role = dict[data.role] 
    }

    return apiAuth.patch('/api/v1/users/'+userId, data)
}
