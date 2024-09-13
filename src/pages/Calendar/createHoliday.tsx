import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress
} from "@mui/material";
import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRefresh } from "../../shared/hooks/useRefresh";
import { toast } from "react-toastify";
import { createHoliday } from "../../service/calendar";

const schema = Yup.object()
  .shape({
    dia: Yup.number().required("Dia é obrigatório").positive(),
    mes: Yup.number().required("Mês é obrigatório").positive(),
    ano: Yup.number().required("Ano é obrigatório").positive(),
    type: Yup.string().required("Tipo é obrigatório"),
    name: Yup.string().required("Nome é obrigatório"),
    pontoFacultativo: Yup.boolean().required("Ponto facultativo é obrigatório"),
  })
  .required();
type FormData = Yup.InferType<typeof schema>;

export function CreateHoliday() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [loading, setLoading] = React.useState(false);

  const { addCount } = useRefresh();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    handleCreateHoliday(data);
  };

  const handleCreateHoliday = async (data: Yup.InferType<typeof schema>) => {
    try {
      setLoading(true);
      await createHoliday(data);
      setLoading(false);
      toast.success("Feriado cadastrado com sucesso");
      reset();
      addCount();
      handleClose();
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response.data.detail);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Cadastrar feriado
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: 600 }}>
          {"Cadastrar feriado"}
        </DialogTitle>
        <Typography
          sx={{
            marginLeft: 3,
            marginRight: 3,
            marginBottom: 1,
          }}
        >
          {"Preencha as informações para cadastrar feriado."}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ display: "grid", gap: 1 }}>
            <TextField
              label={errors.name?.message ?? "Nome"}
              {...register("name")}
              error={!!errors.name?.message}
              variant="filled"
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 1,
              }}
            >
              <TextField
                label={errors.dia?.message ?? "Dia"}
                {...register("dia")}
                error={!!errors.dia?.message}
                variant="filled"
                type="number"
              />
              <TextField
                label={errors.mes?.message ?? "Mês"}
                {...register("mes")}
                error={!!errors.mes?.message}
                variant="filled"
                type="number"
              />
              <TextField
                label={errors.ano?.message ?? "Ano"}
                {...register("ano")}
                error={!!errors.ano?.message}
                variant="filled"
                type="number"
              />
            </Box>
            <FormControl variant="filled">
              <InputLabel>{errors.type?.message ?? "Tipo"}</InputLabel>
              <Select
                label={errors.type?.message ?? "Tipo"}
                {...register("type")}
                error={!!errors.type?.message}
                defaultValue={""}
              >
                <MenuItem value={"Nacional"}>Nacional</MenuItem>
                <MenuItem value={"Municipal"}>Municipal</MenuItem>
                <MenuItem value={"Estadual"}>Estadual</MenuItem>
                {/*  <MenuItem value={"3"}>Ponto facultativo</MenuItem> */}
              </Select>
            </FormControl>
            <FormControl sx={{mt: 2}}>
              <FormLabel id="pontoFacultativo"> Ponto facultativo? </FormLabel>
              <RadioGroup
                row
                aria-labelledby="pontoFacultativo"
                name="pontoFacultativo"
              >
                <FormControlLabel
                  value={true}
                  control={<Radio {...register("pontoFacultativo")} />}
                  label="Sim"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio {...register("pontoFacultativo")} />}
                  label="Não"
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ marginBottom: 3, marginRight: "20px" }}>
            <Button autoFocus onClick={handleClose}>
              Cancelar
            </Button>
            
            <Button type="submit" variant="contained">
            {loading ? <CircularProgress /> : "Cadastrar"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
