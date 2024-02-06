import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
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
  nomeSite: Yup.string().required('O nome do site é obrigatório'),
  link: Yup.string().required('Link é obrigatório'),
});

export function CreateSite() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { register, formState: { errors }, } = useForm({
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
        Cadastrar Site
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: 600 }}>
          {"Cadastrar site"}
        </DialogTitle>
        <Typography
          sx={{
            marginLeft: 3,
            marginRight: 3,
            marginBottom: 3,
          }}
        >
          {"Preencha as informações para cadastrar uma nova tag."}
        </Typography>
          <Divider sx={{marginBottom: 2}} />
        <DialogContent sx={{display: 'grid', gap: 2}}>
        <TextField
        label={errors.nomeSite?.message ?? "Nome do site"}
        {...register("nomeSite")}
        error={!!errors.nomeSite?.message}
        variant="filled"
      />
       <TextField
        label={errors.link?.message ?? "Link"}
        {...register("link")}
        error={!!errors.link?.message}
        variant="filled"
      />
        </DialogContent>
        <DialogActions sx={{marginBottom: 3, marginRight: '20px'}}>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant='contained' onClick={handleClose} autoFocus>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
