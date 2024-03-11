export const formatarData = (dataString: any) => {
    const data = new Date(dataString);
    
    // Obtendo dia, mês e ano
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // Lembrando que os meses começam do zero
    const ano = data.getFullYear();
  
    // Formatando para 'DD/MM/YYYY'
    const dataFormatada = `${dia}/${mes}/${ano}`;
  
    return dataFormatada;
}