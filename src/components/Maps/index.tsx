import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState } from "react";
import { stylesMap } from "./map";
import { styles } from "./theme";
import { SelectComponent } from "./select";
import { TextField } from "@mui/material";

const libraries: any[] = ["places"]; // Define libraries as a constant outside the component

interface maps {
  lat: number;
  lng: number;
  formatted_address?: string;
  index?: number;
}

export function MapPage() {
  const [map, setMap] = useState<google.maps.Map>({} as google.maps.Map);
  const [search, setSearch] = useState<google.maps.places.SearchBox>();
  const [arraylist, setArrayList] = useState<maps[]>([]);
  const [address, setAdress] = useState<maps>({} as maps);
  const [selectType, setSelectType] = useState("hiding");
  //abrir legenda do mapa
  const [isOpen, setIsOpen] = useState(false);
  // centro do mapa
  const [position, setPosition] = useState({
    lat: -3.125761,
    lng: -60.0078073,
  });
  // criando um svg como marcador
  const svgMarker = {
    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "red",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
  };
  // instancia do marker
  /* const [markerRef, marker] = useMarkerRef(); */

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.REACT_APP_API_GOOGLE_KEY}`,
    libraries:libraries,
  });

  function onMapLoad(ref: google.maps.Map) {
    setMap(ref);
  }

  function onLoad(ref: google.maps.places.SearchBox) {
    setSearch(ref);
  }

  function onPlacesChanged() {
    if (search) {
      const places = search?.getPlaces();
      if (places && places.length > 0) {
        const place = places[0]; // Obter o primeiro lugar da lista, por exemplo
        const location = {
          lat: place?.geometry?.location?.lat() || 0,
          lng: place?.geometry?.location?.lng() || 0,
          formatted_address: place.formatted_address,
        };

        // Fazer algo com as informações do local selecionado
        setArrayList([...arraylist, location]);
        setPosition(location);
        map.panTo(location);
      } else {
        console.log("Nenhum lugar encontrado");
      }
    }
  }
  // alterando tipo de mapa
  function handleChangeSelect(event: any) {
    setSelectType(event.target.value);
  }
  function handleOpenMap(items: maps) {
    setIsOpen(!isOpen);
    setAdress(items);
  }
  return (
    <div style={stylesMap.container}>
     
       {isLoaded && (<> <SelectComponent value={selectType} handleChange={handleChangeSelect} />
        <GoogleMap
          onLoad={onMapLoad}
          mapContainerStyle={{ width: "50vw", height: "70vh" }}
          center={position}
          //alterando tipo do mapa
          options={{ styles: styles[selectType] }}
          zoom={15}
        >
          <StandaloneSearchBox // filtro do mapa
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <TextField
              sx={stylesMap.input}
              size="small"
              placeholder="Digite seu endereço"
            />
          </StandaloneSearchBox>
          {arraylist.length > 0 &&
            arraylist.map((item: maps, index: number) => (
              <Marker
                key={index}
                position={item} //posição do marcador
                icon={svgMarker} // pode ser imagem ou svg
                label={""} // adiciona titulo aos marcadores
                onClick={() => handleOpenMap({ ...item, index })}
              >
                {isOpen && address?.index === index && (
                  //legenda do mapa
                  <InfoWindow
                    onCloseClick={() => handleOpenMap({} as maps)}
                    key={index}
                    position={item}
                    anchor={map}
                  >
                    <h4>{address.formatted_address}</h4>
                  </InfoWindow>
                )}
              </Marker>
            ))}
        </GoogleMap></>)}
    </div>
  );
}
