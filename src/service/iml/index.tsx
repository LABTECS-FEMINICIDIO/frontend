import { api } from "../api";

export function findManyIml(){
    return api.get('/api/iml/')
}
export function findImlData(){
    return api.get('/api/imlData/')
}
