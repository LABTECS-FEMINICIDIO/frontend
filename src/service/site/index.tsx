import { api } from "../api";

export function createProgramSearch(data: any){
    return api.post('/api/agendamento-pesquisa/', data)
}
export function findManyProgramSearch(){
    return api.get('/api/agendamento-pesquisa/')
}