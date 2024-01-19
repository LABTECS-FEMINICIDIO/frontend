import { api } from "../api";

export function findManyImlData(){
    return api.get('/api/imlData/')
}
