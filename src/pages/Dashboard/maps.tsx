import React, { useEffect } from 'react';
import { Paper } from '@mui/material';

export function Maps(){

  useEffect(() => {
    const inicializar = () => {
      const coordenadas = { lat: -22.912869, lng: -43.228963 };

      const mapa = new window.google.maps.Map(document.getElementById('mapa')!, {
        zoom: 15,
        center: coordenadas,
      });

      const marker = new window.google.maps.Marker({
        position: coordenadas,
        map: mapa,
        title: 'Meu marcador',
      });
    };

    // Carrega o script do Google Maps
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=SUA_CHAVE_API_DO_GOOGLE&callback=inicializar`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Limpeza ao desmontar o componente
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Paper id="mapa">
      <Maps/>
    </Paper>
  );
};