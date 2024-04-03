import { api } from "../api";

export function createHoliday(data: any){
    return api.post('/api/feriados/', data)
}
export function findManyHoliday(){
    return api.get('/api/feriados/')
}
export function deleteHoliday(id: string){
    return api.delete('/api/feriados/' +id)
}