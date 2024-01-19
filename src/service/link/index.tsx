import { api } from "../api";

export function createVictims(data: any){
    return api.post('/api/vitimas/', data)
}