import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { updateVictims, findById } from "../../service/victims";
import { useRefresh } from "../../shared/hooks/useRefresh";
import { IVictims } from "../../models/victims";
import { colors } from "../../shared/theme";
import { grid1, grid2 } from "../../styles";
import * as Yup from "yup";
import { formatISO } from "date-fns";
import CircularProgress from "@mui/material/CircularProgress";

const schema = Yup.object()
  .shape({
    datadofato: Yup.date(),
    diah: Yup.string(),
    horario: Yup.string(),
    turno: Yup.string(),
    nome: Yup.string(),
    idade: Yup.number(),
    racacor1: Yup.string(),
    estciv2: Yup.string(),
    bairro: Yup.string(),
    rua_beco_travessa_estrada_ramal: Yup.string(),
    endcomplemento: Yup.string(),
    tipoarma1: Yup.string(),
    tipoarma2: Yup.string(),
    loclesao1: Yup.string(),
    loclesao2: Yup.string(),
    zona: Yup.string(),
    loclesao3: Yup.string(),
    hospitalizacao: Yup.string(),
    violsexual: Yup.string(),
    latrocinio: Yup.string(),
    localdeocorrencia: Yup.string(),
    presencafilhofamiliar: Yup.string(),
    compexcomp: Yup.string(),
    gestacao: Yup.string(),
    filhosdescrever: Yup.number()
      .min(0, "Deve ser um número positivo")
      .integer("Deve ser um número inteiro")
      .optional(),
    lat: Yup.string(),
    lng: Yup.string(),
    sites_in_bulk: Yup.string(),
  })
  .required();
type FormData = Yup.InferType<typeof schema>;
interface IPropsForm {
  vitimaId: string;
}

export function EditVictims(props: IPropsForm) {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<IVictims | null>(null);
  const { addCount } = useRefresh();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    control,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const datadofato = watch("datadofato");

  useEffect(() => {
    if (datadofato) {
      const date = new Date(datadofato);
      const weekdays = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
      const dayOfWeek = weekdays[date.getDay()];
      setValue("diah", dayOfWeek);
    }
  }, [datadofato, setValue]);

  const handleOpenDialog = async () => {
    console.log("Opening dialog...");
    setLoading(true);
    try {
      const response = await findById(props.vitimaId);
      if (response && response.data) {
        setUserData(response.data);
        populateFormValues(response.data);
        setOpen(true);
      } else {
        console.error("Erro ao buscar os dados da vítima");
      }
    } catch (error: any) {
      toast.error("Erro ao buscar os dados da vítima: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const populateFormValues = (data: IVictims) => {
    Object.entries(data).forEach(([key, value]) => {
      if (key === "datadofato") {
        const date = new Date(value as string);
        const formattedDate = date.toISOString().split("T")[0];
        setValue(key as keyof IVictims, formattedDate || "");
      } else {
        setValue(key as keyof IVictims, value || "");
      }
    });
  };

  const onSubmit = async (data: FormData) => {
    try {
      const { datadofato, ...restData } = data;
      let formattedDate;

      if (datadofato) {
        formattedDate = formatISO(new Date(datadofato), {
          representation: "complete",
        });
      } else {
        throw new Error("Data do fato não está definida");
      }

      const formattedData = {
        ...restData,
        datadofato: formattedDate,
      };

      await updateVictims(props.vitimaId, formattedData);
      toast.success("Informações da vítima atualizadas com sucesso");
      addCount();
      handleClose();
      reset();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.detail ||
          error.message ||
          "Erro ao atualizar dados da vítima"
      );
    }
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <>
      <IconButton onClick={handleOpenDialog}>
        <EditIcon />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="xl"
        sx={{
          "& .css-1s23xog-MuiDialogContent-root": {
            width: "1280px",
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: 600 }}>
          {"Editar dados da vítima"}
        </DialogTitle>
        <Divider />
        {loading ? (
         
            <CircularProgress />
          
        ) : (
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <Typography sx={{ color: colors.neutral_dark, mb: 3 }}>
                Informações Básicas
              </Typography>
              <Box sx={grid1}>
                <TextField
                  sx={{ width: 355 }}
                  label={errors.nome?.message ?? "nome"}
                  {...register("nome")}
                  error={!!errors.nome?.message}
                  variant="filled"
                />
                <TextField
                  label={errors.idade?.message ?? "idade"}
                  {...register("idade")}
                  error={!!errors.idade?.message}
                  variant="filled"
                />
              </Box>
              <Box sx={grid2}>
                <FormControl variant="filled">
                  <InputLabel>
                    {errors.racacor1?.message ?? "racacor1"}
                  </InputLabel>
                  <Select
                    label={errors.racacor1?.message ?? "racacor1"}
                    {...register("racacor1")}
                    error={!!errors.racacor1?.message}
                    defaultValue={
                      userData
                        ? userData.racacor1 !== null &&
                          userData.racacor1 !== "N/A"
                          ? userData.racacor1
                          : ""
                        : ""
                    }
                  >
                    <MenuItem value={"NA"}>NA</MenuItem>
                    <MenuItem value={"branca"}>branca</MenuItem>
                    <MenuItem value={"indigena"}>indigena</MenuItem>
                    <MenuItem value={"parda"}>parda</MenuItem>
                    <MenuItem value={"amarela"}>amarela</MenuItem>
                    <MenuItem value={"preta"}>preta</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="filled">
                  <InputLabel>
                    {errors.estciv2?.message ?? "estciv2"}
                  </InputLabel>
                  <Select
                    label={errors.estciv2?.message ?? "estciv2"}
                    {...register("estciv2")}
                    error={!!errors.estciv2?.message}
                    defaultValue={
                      userData
                        ? userData.estciv2 !== null &&
                          userData.estciv2 !== "N/A"
                          ? userData.estciv2
                          : ""
                        : ""
                    }
                  >
                    <MenuItem value={"NA"}>NA</MenuItem>
                    <MenuItem value={"solteira"}>solteira</MenuItem>
                    <MenuItem value={"casada"}>casada</MenuItem>
                    <MenuItem value={"viuva"}>viuva</MenuItem>
                    <MenuItem value={"separada judicialmente-divorciada"}>
                      separada judicialmente-divorciada
                    </MenuItem>
                    <MenuItem value={"uniao-estavel"}>uniao estavel</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  type="date"
                  label={errors.datadofato?.message ?? "datadofato"}
                  {...register("datadofato")}
                  error={!!errors.datadofato?.message}
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl variant="filled">
                  <InputLabel>{errors.diah?.message ?? "diah"}</InputLabel>
                  <Controller
                    name="diah"
                    control={control}
                    defaultValue={
                      userData
                        ? userData.diah !== null && userData.diah !== "N/A"
                          ? userData.diah
                          : ""
                        : ""
                    }
                    render={({ field }) => (
                      <Select {...field} error={!!errors.diah?.message}>
                        <MenuItem value={"NA"}>NA</MenuItem>
                        <MenuItem value={"dom"}>dom</MenuItem>
                        <MenuItem value={"seg"}>seg</MenuItem>
                        <MenuItem value={"ter"}>ter</MenuItem>
                        <MenuItem value={"qua"}>qua</MenuItem>
                        <MenuItem value={"qui"}>qui</MenuItem>
                        <MenuItem value={"sex"}>sex</MenuItem>
                        <MenuItem value={"sab"}>sab</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
                <TextField
                  label={errors.horario?.message ?? "horario"}
                  {...register("horario")}
                  error={!!errors.horario?.message}
                  variant="filled"
                />
                <FormControl variant="filled">
                  <InputLabel>{errors.turno?.message ?? "turno"}</InputLabel>
                  <Select
                    label={errors.turno?.message ?? "turno"}
                    {...register("turno")}
                    error={!!errors.turno?.message}
                    defaultValue={
                      userData
                        ? userData.turno !== null && userData.turno !== "N/A"
                          ? userData.turno
                          : ""
                        : ""
                    }
                  >
                    <MenuItem value={"NA"}>NA</MenuItem>
                    <MenuItem value={"madrugada"}>madrugada</MenuItem>
                    <MenuItem value={"manha"}>manha</MenuItem>
                    <MenuItem value={"tarde"}>tarde</MenuItem>
                    <MenuItem value={"noite"}>noite</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Typography sx={{ color: colors.neutral_dark, mb: 3, mt: 3 }}>
                Detalhes da Localização
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 1,
                  mb: 2,
                  mt: 1,
                }}
              >
                <TextField
                  label={errors.bairro?.message ?? "bairro"}
                  {...register("bairro")}
                  error={!!errors.bairro?.message}
                  variant="filled"
                />
                <TextField
                  label={
                    errors.rua_beco_travessa_estrada_ramal?.message ??
                    "rua_beco_travessa_estrada_ramal"
                  }
                  {...register("rua_beco_travessa_estrada_ramal")}
                  error={!!errors.rua_beco_travessa_estrada_ramal?.message}
                  variant="filled"
                />
                <TextField
                  label={errors.endcomplemento?.message ?? "endcomplemento"}
                  {...register("endcomplemento")}
                  error={!!errors.endcomplemento?.message}
                  variant="filled"
                />
                <FormControl variant="filled">
                  <InputLabel>{errors.zona?.message ?? "Zona"}</InputLabel>
                  <Select
                    label={errors.zona?.message ?? "Zona"}
                    {...register("zona")}
                    error={!!errors.zona?.message}
                    defaultValue={
                      userData
                        ? userData.zona !== null && userData.zona !== "N/A"
                          ? userData.zona
                          : ""
                        : ""
                    }
                  >
                    <MenuItem value={"NA"}>NA</MenuItem>
                    <MenuItem value={"norte"}>norte</MenuItem>
                    <MenuItem value={"oeste"}>oeste</MenuItem>
                    <MenuItem value={"leste"}>leste</MenuItem>
                    <MenuItem value={"sul"}>sul</MenuItem>
                    <MenuItem value={"centrooeste"}>centrooeste</MenuItem>
                    <MenuItem value={"centrosul"}>centrosul</MenuItem>
                    <MenuItem value={"rural"}>rural</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label={errors.lat?.message ?? "Y_lat"}
                  {...register("lat")}
                  error={!!errors.lat?.message}
                  variant="filled"
                />
                <TextField
                  label={errors.lng?.message ?? "X_long"}
                  {...register("lng")}
                  error={!!errors.lng?.message}
                  variant="filled"
                />
              </Box>
              <Typography sx={{ color: colors.neutral_dark, mb: 3, mt: 3 }}>
                Detalhes da Morte
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 1,
                  mt: 1,
                }}
              >
                <FormControl variant="filled">
                  <InputLabel>
                    {errors.tipoarma1?.message ?? "tipoarma1"}
                  </InputLabel>
                  <Select
                    label={errors.tipoarma1?.message ?? "tipoarma1"}
                    {...register("tipoarma1")}
                    error={!!errors.tipoarma1?.message}
                    defaultValue={
                      userData
                        ? userData.tipoarma1 !== null &&
                          userData.tipoarma1 !== "N/A"
                          ? userData.tipoarma1
                          : ""
                        : ""
                    }
                  >
                    <MenuItem value={"NA"}>NA</MenuItem>
                    <MenuItem value={"faca"}>faca</MenuItem>
                    <MenuItem value={"vidro"}>vidro</MenuItem>
                    <MenuItem value={"pedra"}>pedra</MenuItem>
                    <MenuItem value={"tercado"}>tercado</MenuItem>
                    <MenuItem value={"enxada"}>enxada</MenuItem>
                    <MenuItem value={"corda"}>corda</MenuItem>
                    <MenuItem value={"fio eletrico"}>fio eletrico</MenuItem>
                    <MenuItem value={"chave de fenda"}>chave de fenda</MenuItem>
                    <MenuItem value={"arma de fogo"}>arma de fogo</MenuItem>
                    <MenuItem value={"forca corporal"}>forca corporal</MenuItem>
                    <MenuItem value={"substancias inflamaveis"}>
                      substancias inflamaveis
                    </MenuItem>
                    <MenuItem value={"objeto de madeira"}>
                      objeto de madeira
                    </MenuItem>
                    <MenuItem value={"submersao em colecao hidrica"}>
                      submersao em colecao hidrica
                    </MenuItem>
                    <MenuItem
                      value={"ligadura ou laco com outro material sintetico"}
                    >
                      ligadura ou laco com outro material sintetico
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="filled">
                  <InputLabel>
                    {errors.tipoarma2?.message ?? "tipoarma2"}
                  </InputLabel>
                  <Select
                    label={errors.tipoarma2?.message ?? "tipoarma2"}
                    {...register("tipoarma2")}
                    error={!!errors.tipoarma2?.message}
                    defaultValue={
                      userData
                        ? userData.tipoarma2 !== null &&
                          userData.tipoarma2 !== "N/A"
                          ? userData.tipoarma2
                          : ""
                        : ""
                    }
                  >
                    <MenuItem value={"NA"}>NA</MenuItem>
                    <MenuItem value={"faca"}>faca</MenuItem>
                    <MenuItem value={"vidro"}>vidro</MenuItem>
                    <MenuItem value={"pedra"}>pedra</MenuItem>
                    <MenuItem value={"tercado"}>tercado</MenuItem>
                    <MenuItem value={"enxada"}>enxada</MenuItem>
                    <MenuItem value={"corda"}>corda</MenuItem>
                    <MenuItem value={"fio eletrico"}>fio eletrico</MenuItem>
                    <MenuItem value={"chave de fenda"}>chave de fenda</MenuItem>
                    <MenuItem value={"arma de fogo"}>arma de fogo</MenuItem>
                    <MenuItem value={"forca corporal"}>forca corporal</MenuItem>
                    <MenuItem value={"substancias inflamaveis"}>
                      substancias inflamaveis
                    </MenuItem>
                    <MenuItem value={"objeto de madeira"}>
                      objeto de madeira
                    </MenuItem>
                    <MenuItem value={"submersao em colecao hidrica"}>
                      submersao em colecao hidrica
                    </MenuItem>
                    <MenuItem
                      value={"ligadura ou laco com outro material sintetico"}
                    >
                      ligadura ou laco com outro material sintetico
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 1,
                  mb: 1,
                  mt: 1,
                }}
              >
                <FormControl variant="filled">
                  <InputLabel>
                    {errors.loclesao1?.message ?? "loclesao1"}
                  </InputLabel>
                  <Select
                    label={errors.loclesao1?.message ?? "loclesao1"}
                    {...register("loclesao1")}
                    error={!!errors.loclesao1?.message}
                    defaultValue={
                      userData
                        ? userData.loclesao1 !== null &&
                          userData.loclesao1 !== "N/A"
                          ? userData.loclesao1
                          : ""
                        : ""
                    }
                  >
                    <MenuItem value={"NA"}>NA</MenuItem>
                    <MenuItem value={"cabeca"}>cabeca</MenuItem>
                    <MenuItem value={"pescoco"}>pescoco</MenuItem>
                    <MenuItem value={"torax"}>torax</MenuItem>
                    <MenuItem value={"mmss"}>mmss</MenuItem>
                    <MenuItem value={"mmii"}>mmii</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="filled">
                  <InputLabel>
                    {errors.loclesao2?.message ?? "loclesao2"}
                  </InputLabel>
                  <Select
                    label={errors.loclesao2?.message ?? "loclesao2"}
                    {...register("loclesao2")}
                    error={!!errors.loclesao2?.message}
                    defaultValue={
                      userData
                        ? userData.loclesao2 !== null &&
                          userData.loclesao2 !== "N/A"
                          ? userData.loclesao2
                          : ""
                        : ""
                    }
                  >
                    <MenuItem value={"NA"}>NA</MenuItem>
                    <MenuItem value={"cabeca"}>cabeca</MenuItem>
                    <MenuItem value={"pescoco"}>pescoco</MenuItem>
                    <MenuItem value={"torax"}>torax</MenuItem>
                    <MenuItem value={"mmss"}>mmss</MenuItem>
                    <MenuItem value={"mmii"}>mmii</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="filled">
                  <InputLabel>
                    {errors.loclesao3?.message ?? "loclesao3"}
                  </InputLabel>
                  <Select
                    label={errors.loclesao3?.message ?? "loclesao3"}
                    {...register("loclesao3")}
                    error={!!errors.loclesao3?.message}
                    defaultValue={
                      userData
                        ? userData.loclesao3 !== null &&
                          userData.loclesao3 !== "N/A"
                          ? userData.loclesao3
                          : ""
                        : ""
                    }
                  >
                    <MenuItem value={"NA"}>NA</MenuItem>
                    <MenuItem value={"cabeca"}>cabeca</MenuItem>
                    <MenuItem value={"pescoco"}>pescoco</MenuItem>
                    <MenuItem value={"torax"}>torax</MenuItem>
                    <MenuItem value={"mmss"}>mmss</MenuItem>
                    <MenuItem value={"mmii"}>mmii</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="filled">
                  <InputLabel>
                    {errors.hospitalizacao?.message ?? "hospitalizacao"}
                  </InputLabel>
                  <Select
                    label={errors.hospitalizacao?.message ?? "hospitalizacao"}
                    {...register("hospitalizacao")}
                    error={!!errors.hospitalizacao?.message}
                    defaultValue={
                      userData
                        ? userData.hospitalizacao !== null &&
                          userData.hospitalizacao !== "N/A"
                          ? userData.hospitalizacao
                          : ""
                        : ""
                    }
                  >
                    <MenuItem value={"NA"}>NA</MenuItem>
                    <MenuItem value={"sim"}>sim</MenuItem>
                    <MenuItem value={"nao"}>nao</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="filled">
                  <InputLabel>
                    {errors.violsexual?.message ?? "violsexual"}
                  </InputLabel>
                  <Select
                    label={errors.violsexual?.message ?? "violsexual"}
                    {...register("violsexual")}
                    error={!!errors.violsexual?.message}
                    defaultValue={
                      userData
                        ? userData.violsexual !== null &&
                          userData.violsexual !== "N/A"
                          ? userData.violsexual
                          : ""
                        : ""
                    }
                  >
                    <MenuItem value={"NA"}>NA</MenuItem>
                    <MenuItem value={"sim"}>sim</MenuItem>
                    <MenuItem value={"nao"}>nao</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="filled">
                  <InputLabel>
                    {errors.latrocinio?.message ?? "latrocinio"}
                  </InputLabel>
                  <Select
                    label={errors.latrocinio?.message ?? "latrocinio"}
                    {...register("latrocinio")}
                    error={!!errors.latrocinio?.message}
                    defaultValue={
                      userData
                        ? userData.latrocinio !== null &&
                          userData.latrocinio !== "N/A"
                          ? userData.latrocinio
                          : ""
                        : ""
                    }
                  >
                    <MenuItem value={"NA"}>NA</MenuItem>
                    <MenuItem value={"sim"}>sim</MenuItem>
                    <MenuItem value={"nao"}>nao</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl variant="filled" fullWidth>
                  <InputLabel>
                    {errors.localdeocorrencia?.message ?? "localdeocorrencia"}
                  </InputLabel>
                  <Select
                    label={
                      errors.localdeocorrencia?.message ?? "localdeocorrencia"
                    }
                    {...register("localdeocorrencia")}
                    error={!!errors.localdeocorrencia?.message}
                    defaultValue={
                      userData
                        ? userData.localdeocorrencia !== null &&
                          userData.localdeocorrencia !== "N/A"
                          ? userData.localdeocorrencia
                          : ""
                        : ""
                    }
                  >
                    <MenuItem value={"NA"}>NA</MenuItem>
                    <MenuItem value={"domicilio"}>domicilio</MenuItem>
                    <MenuItem value={"viapublica"}>via publica</MenuItem>
                    <MenuItem value={"estabelecimento comercial"}>
                      estabelecimento comercial
                    </MenuItem>
                    <MenuItem value={"sistema penitenciario"}>
                      sistema penitenciario
                    </MenuItem>
                    <MenuItem value={"delegacia"}>delegacia</MenuItem>
                    <MenuItem value={"terreno abandonado em area residencial"}>
                      terreno abandonado em area residencial
                    </MenuItem>
                    <MenuItem value={"casa ou edificacao abandonada"}>
                      casa ou edificacao abandonada
                    </MenuItem>
                    <MenuItem value={"area de mata dentro na zona urbana"}>
                      area de mata dentro na zona urbana
                    </MenuItem>
                    <MenuItem value={"area de mata na zona rural"}>
                      area de mata na zona rural
                    </MenuItem>
                    <MenuItem value={"colecao hidrica"}>
                      colecao hidrica
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Typography sx={{ color: colors.neutral_dark, mb: 3, mt: 3 }}>
                Detalhes da Família
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 1,
                  mb: 2,
                  mt: 1,
                }}
              >
                <FormControl variant="filled">
                  <InputLabel>
                    {errors.compexcomp?.message ?? "compexcomp"}
                  </InputLabel>
                  <Select
                    label={errors.compexcomp?.message ?? "compexcomp"}
                    {...register("compexcomp")}
                    error={!!errors.compexcomp?.message}
                    defaultValue={
                      userData
                        ? userData.compexcomp !== null &&
                          userData.compexcomp !== "N/A"
                          ? userData.compexcomp
                          : ""
                        : ""
                    }
                  >
                    <MenuItem value={"sim"}>sim</MenuItem>
                    <MenuItem value={"nao"}>nao</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="filled">
                  <InputLabel>
                    {errors.presencafilhofamiliar?.message ??
                      "presencafilhofamiliar"}
                  </InputLabel>
                  <Select
                    label={
                      errors.presencafilhofamiliar?.message ??
                      "presencafilhofamiliar"
                    }
                    {...register("presencafilhofamiliar")}
                    error={!!errors.presencafilhofamiliar?.message}
                    defaultValue={
                      userData
                        ? userData.presencafilhofamiliar !== null &&
                          userData.presencafilhofamiliar !== "N/A"
                          ? userData.presencafilhofamiliar
                          : ""
                        : ""
                    }
                  >
                    <MenuItem value={"sim"}>sim</MenuItem>
                    <MenuItem value={"nao"}>nao</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="filled">
                  <InputLabel>
                    {errors.gestacao?.message ?? "gestacao"}
                  </InputLabel>
                  <Select
                    label={errors.gestacao?.message ?? "gestacao"}
                    {...register("gestacao")}
                    error={!!errors.gestacao?.message}
                    defaultValue={
                      userData
                        ? userData.gestacao !== null &&
                          userData.gestacao !== "N/A"
                          ? userData.gestacao
                          : ""
                        : ""
                    }
                  >
                    <MenuItem value={"sim"}>sim</MenuItem>
                    <MenuItem value={"nao"}>nao</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label={errors.filhosdescrever?.message ?? "filhosdescrever"}
                  {...register("filhosdescrever")}
                  error={!!errors.filhosdescrever?.message}
                  variant="filled"
                  type="number"
                  inputProps={{ min: 0 }}
                />
              </Box>
              <Typography sx={{ color: colors.neutral_dark, mb: 1 }}>
                Link de Referência:
              </Typography>
              <Box>
                <TextField
                  variant="filled"
                  label={errors.sites_in_bulk?.message ?? "Link"}
                  sx={{ width: "93%", mb: 1 }}
                  {...register("sites_in_bulk")}
                  error={!!errors.sites_in_bulk?.message}
                />
              </Box>
              <Box sx={{ marginTop: "10px", marginLeft: "75%" }}>
                <Button onClick={handleClose} variant="text">
                  Cancelar
                </Button>
                <Button variant="contained" type="submit">
                  Salvar
                </Button>
              </Box>
            </DialogContent>
          </Box>
        )}
      </Dialog>
    </>
  );
}
