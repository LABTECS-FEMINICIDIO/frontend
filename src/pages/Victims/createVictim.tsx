import * as Yup from "yup";
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
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { toast } from "react-toastify";
import React, { useEffect } from "react";
import { useRefresh } from "../../shared/hooks/useRefresh";
import { colors } from "../../shared/theme";
import { grid1, grid2 } from "../../styles";
import { api } from "../../service/api";

interface IPropsForm {
  vitimaId?: string;
  idSite?: string;
}

export const schema = Yup.object()
  .shape({
    datadofato: Yup.date().required(),
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

export function CreateVictim(props: IPropsForm) {
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const { addCount } = useRefresh();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue,
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

  const onSubmit = (data: any) => {
    api.post("/api/vitimas/", data).then((res) => {
      addCount();
      handleClose();
      toast.success("Vítima criada com sucesso!");
    });
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Cadastrar vítima
      </Button>
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
          {"Cadastrar vítima"}
        </DialogTitle>
        <Divider />
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
                  defaultValue={""}
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
                <InputLabel>{errors.estciv2?.message ?? "estciv2"}</InputLabel>
                <Select
                  label={errors.estciv2?.message ?? "estciv2"}
                  {...register("estciv2")}
                  error={!!errors.estciv2?.message}
                  defaultValue={""}
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
                  defaultValue=""
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
                  defaultValue={""}
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
                <InputLabel>{errors.zona?.message ?? "zona"}</InputLabel>
                <Select
                  label={errors.zona?.message ?? "zona"}
                  {...register("zona")}
                  error={!!errors.zona?.message}
                  defaultValue={""}
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
                  defaultValue={""}
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
                  defaultValue={""}
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
                  defaultValue={""}
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
                  defaultValue={""}
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
                  defaultValue={""}
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
                  defaultValue={""}
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
                  defaultValue={""}
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
                  defaultValue={""}
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
                  defaultValue={""}
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
                  <MenuItem value={"colecao hidrica"}>coleção hidrica</MenuItem>
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
                  defaultValue={""}
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
                  defaultValue={""}
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
                  defaultValue={""}
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
      </Dialog>
    </>
  );
}
