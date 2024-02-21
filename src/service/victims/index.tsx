import { api } from "../api";

export function deleteVictims(vitimaId: string){
    return api.delete('/api/vitimas/'+vitimaId)
}