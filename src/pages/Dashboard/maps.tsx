import { Box } from "@mui/material";
import { MapPage } from "../../components/Maps";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../service/api";
import { Cards } from "./cards";

export function Maps() {
  const [rowsFiltered, setRowsFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState({ column: "", value: "" });
  const [loading, setLoading] = useState(true);
  const [vitimas, setVitimas] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    api
      .get("/api/vitimas/")
      .then((res) => {
        setVitimas(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleValue = (event: any) => {
    setSearch((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleColumn = (event: any) => {
    setSearch((state) => ({
      ...state,
      [event.target.name]: event.target.value.trim(),
    }));
  };

  const handleClear = () => {
    setSearch({ column: "", value: "" });
    setRowsFiltered([]);
  };

  const handleSearch = () => {
    if (search.column === "" || search.value === "") {
      toast.error("Campo coluna e pesquisa não pode ser vazio");
    } else {
      if (search.column == "mes") {
        const findRows = vitimas.filter(
          (item) => item?.datadofato?.split("-")[1] == search.value
        );
        if (findRows.length === 0) {
          toast.error("Nenhum resultado encontrado para esta pesquisa.");
        }
        setRowsFiltered(findRows);
      } else {
        const findRows = vitimas.filter(
          (item) => item?.datadofato?.split("-")[0] == search.value
        );
        if (findRows.length === 0) {
          toast.error("Nenhum resultado encontrado para esta pesquisa.");
        }
        setRowsFiltered(findRows);
      }
    }
  };

  return (
    <Box>
      <Cards vitimas={rowsFiltered.length > 0 ? rowsFiltered : vitimas} />
      <MapPage vitimas={rowsFiltered.length > 0 ? rowsFiltered : vitimas} />
    </Box>
  );
}
