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
  InputLabel,
  MenuItem,
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
import { colors } from "../../shared/theme";
import { createUser } from "../../service/users";
import { toast } from "react-toastify";
import { useRefresh } from "../../shared/hooks/useRefresh";

const schema = Yup.object()
  .shape({
    name: Yup.string()
      .required("Nome é um campo obrigatório")
      .trim()
      .matches(/^[A-Za-z\s]*$/, "Nome deve conter apenas letras"),
    email: Yup.string()
      .required("E-mail é um campo obrigatório")
      .email("E-mail deve ter um formato válido: exemplo@mail.com.br"),
    contact: Yup.string()
      .required("Telefone é um campo obrigatório")
      .matches(/^[0-9]+$/, "Telefone deve conter apenas números"),
    role: Yup.number().required("O perfil é obrigatório"),
  })
  .required();

type FormData = Yup.InferType<typeof schema>;

export function CreateUser() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const { addCount } = useRefresh();
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    handleCreateUser(data);
  };

  const handleCreateUser = async (data: Yup.InferType<typeof schema>) => {
    try {
      setLoading(true);
      await createUser(data);
      setLoading(false);
      toast.success("Usuário cadastrado com sucesso");
      reset();
      addCount();
      handleClose();
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response.data.message);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onError = (errors: any) => {
    console.log('Form Errors:', errors);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Cadastrar Usuário
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: 600 }}>
          {"Cadastrar usuário"}
        </DialogTitle>
        <Typography
          sx={{
            marginLeft: 3,
            marginRight: 3,
            marginBottom: 1,
          }}
        >
          {"Preencha as informações para cadastrar um novo usuário."}
        </Typography>
        <Divider />
        <Box component="form" onSubmit={handleSubmit(onSubmit, onError)}>
          <DialogContent sx={{ display: "grid", gap: 2 }}>
            <TextField
              label={errors.name?.message ?? "Nome"}
              {...register("name")}
              error={!!errors.name?.message}
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
              label={errors.contact?.message ?? "Telefone"}
              {...register("contact")}
              error={!!errors.contact?.message}
              variant="filled"
            />
            <FormControl variant="filled">
              <InputLabel>{errors.role?.message ?? "Perfil"}</InputLabel>
              <Select
                label={errors.role?.message ?? "Perfil"}
                {...register("role")}
                error={!!errors.role?.message}
                defaultValue={""}
              >
                <MenuItem value={1}>Administrador</MenuItem>
                <MenuItem value={4}>Digitador</MenuItem>
                <MenuItem value={3}>Editor</MenuItem>
                <MenuItem value={2}>Visualizador</MenuItem>
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
            letras do seu nome seguidas pelos três primeiros dígitos do seu
            telefone. Após o primeiro login, é altamente recomendável redefinir
            sua senha para garantir a segurança da sua conta.
          </Alert>
          <DialogActions sx={{ marginRight: "20px", marginBottom: 3 }}>
            <Button autoFocus onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" autoFocus>
            {loading ? <CircularProgress /> : "Cadastrar"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
