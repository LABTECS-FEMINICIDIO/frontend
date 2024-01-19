export interface Iiml{
    horaEntrada: string
    idade: string
    dataEntrada: string
    causaMorte: string
    sexo: string
    id: string
    bairroDaRemocao: string
}

export interface UpdateImlListProps {
    updateImlList: (iml: Iiml) => void;
  }