import {
  Box,
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
import { toast } from "react-toastify";
import { createSite } from "../../service/site";
import { useRefresh } from "../../shared/hooks/useRefresh";

const schema = Yup.object().shape({
  nome: Yup.string().required("O nome do site é obrigatório"),
  link: Yup.string().required("Link é obrigatório"),
}).required();
type FormData = Yup.InferType<typeof schema>;;

export function CreateSite() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const { addCount } = useRefresh();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: FormData) => { handleCreateSite(data) };

  const handleCreateSite = (data: Yup.InferType<typeof schema>) => {
    createSite(data)
      .then(() => {
        toast.success('Site cadastrado com sucesso');
        reset();
        addCount();
        handleClose();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.detail || 'Erro ao cadastrar site');
      });
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
            marginBottom: 2,
          }}
        >
          {"Preencha as informações para cadastrar uma nova tag."}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Box component="form" onSubmit={handleSubmit(onSubmit)} >
          <DialogContent sx={{ display: "grid", gap: 2 }}>
            <TextField
              label={errors.nome?.message ?? "Nome do site"}
              {...register("nome")}
              error={!!errors.nome?.message}
              variant="filled"
            />
            <TextField
              label={errors.link?.message ?? "Link"}
              {...register("link")}
              error={!!errors.link?.message}
              variant="filled"
            />
          </DialogContent>
          <DialogActions sx={{ marginBottom: 3, marginRight: "20px" }}>
            <Button autoFocus onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" onClick={handleClose} autoFocus>
              Salvar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
