import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
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
import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { colors } from "../../shared/theme";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import { updateUser } from "../../service/users";

const schema = Yup.object()
  .shape({
    nome: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().required("Email é obrigatório"),
    telefone: Yup.string().required("O telefone é obrigatório"),
    perfil: Yup.string().required("O perfil é obrigatório"),
    senha: Yup.string(),
  })
  .required();
type FormData = Yup.InferType<typeof schema>;

export function EditUser({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await handleUpadateUser(data);
  };

  const handleUpadateUser = async (data: Yup.InferType<typeof schema>) => {
    try {
      const response = await updateUser(id, data);
      toast.success("Informações do usuário atualizadas com sucesso");
      handleClose();
    } catch (error: any) {
      toast.error(
        error?.response.data.detail || "Erro ao atualizar usuário"
      );
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
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: 600 }}>
          {"Editar usuário"}
        </DialogTitle>
        <Typography
          sx={{
            marginLeft: 3,
            marginRight: 3,
            marginBottom: 3,
          }}
        >
          {"."}
        </Typography>
        <Divider />
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ display: "grid", gap: 2 }}>
            <TextField
              label={errors.nome?.message ?? "Nome"}
              {...register("nome")}
              error={!!errors.nome?.message}
              variant="filled"
              fullWidth
            />
            <TextField
              label={errors.email?.message ?? "E-mail"}
              {...register("email")}
              error={!!errors.email?.message}
              variant="filled"
            />
            <TextField
              label={errors.telefone?.message ?? "Telefone"}
              {...register("telefone")}
              error={!!errors.telefone?.message}
              variant="filled"
            />
            <TextField
              label={errors.senha?.message ?? "Senha"}
              {...register("senha")}
              error={!!errors.senha?.message}
              variant="filled"
            />
            <FormControl variant="filled">
              <InputLabel>{errors.perfil?.message ?? "Perfil"}</InputLabel>
              <Select
                label={errors.perfil?.message ?? "Perfil"}
                {...register("perfil")}
                error={!!errors.perfil?.message}
                defaultValue={""}
              >
                <MenuItem value={"Administrador"}>Administrador</MenuItem>
                <MenuItem value={"Pesquisador"}>Pesquisador</MenuItem>
                <MenuItem value={"Visualizador"}>Visualizador</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <Alert
            severity="info"
            sx={{
              margin: "20px",
              background: colors.primary_lightest,
              color: colors.neutral_dark,
            }}
          >
            Lembre-se, a senha padrão inicial é composta pelas três primeiras
            letras do seu nome seguidas pelos três últimos dígitos do seu
            telefone. Após o primeiro login, é altamente recomendável redefinir
            sua senha para garantir a segurança da sua conta.
          </Alert>
          <DialogActions sx={{ marginRight: "20px", marginBottom: 3 }}>
            <Button autoFocus onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" autoFocus>
              Cadastrar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
