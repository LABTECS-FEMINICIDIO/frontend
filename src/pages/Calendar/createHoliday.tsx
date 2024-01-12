import {
  Button,
  Dialog,
  DialogActions,
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
import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  date: Yup.string().required('Data é obrigatório'),
  type: Yup.string().required('Tipo é obrigatório'),
  name: Yup.string().required('Link é obrigatório'),
});

export function CreateHoliday() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { register, handleSubmit, reset, setValue, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
});

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
            marginBottom: 3,
          }}
        >
          {"Preencha as informações para cadastrar feriado."}
        </Typography>
          <Divider sx={{marginBottom: 2}} />
        <DialogContent sx={{display: 'grid', gap: 2}}>
        <TextField
        label={errors.date?.message ?? "Data"}
        {...register("date")}
        error={!!errors.date?.message}
        variant="filled"
      />
       <TextField
        label={errors.name?.message ?? "Nome"}
        {...register("name")}
        error={!!errors.name?.message}
        variant="filled"
      />
      <FormControl variant="filled">
            <InputLabel>
              {errors.type?.message ?? "Tipo"}
            </InputLabel>
            <Select
              label={errors.type?.message ?? "Tipo"}
              {...register("type")}
              error={!!errors.type?.message}
              defaultValue={""}
            >
              <MenuItem value={"0"}>Nacional</MenuItem>
              <MenuItem value={"1"}>Local</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{marginBottom: 3, marginRight: '20px'}}>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant='contained' onClick={handleClose} autoFocus>
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
