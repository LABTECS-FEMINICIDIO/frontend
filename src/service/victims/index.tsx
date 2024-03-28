import { api } from "../api";

export function deleteVictims(vitimaId: string){
    return api.delete('/api/vitimas/'+vitimaId)
}
export function updateVictims(vitimaId: string, data: any){
    return api.patch('/api/vitimas/'+vitimaId, data)
}
export async function findById(vitimaId: string) {
    return api.get('api/vitimas/' + vitimaId);
}
export function createVictim(data: any){
    api.post("/api/vitimas/", data)
}