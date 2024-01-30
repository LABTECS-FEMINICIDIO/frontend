import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
} from "@mui/material";
import { colors } from "../../shared/theme";
import { borda, container } from "../../styles";
import imagemLogin from "../../assets/laco-login.svg";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerUser } from "../../service/users";

const schema = yup
  .object({
    nome: yup.string().required("Nome é um campo obrigatório"),
    email: yup.string().required("E-mail é um campo obrigatório"),
    telefone: yup.string().required("Telefone é um campo obrigatório"),
    senha: yup.string().required("Senha é um campo obrigatório"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => handleRegister(data);

  const handleRegister = async (data: yup.InferType<typeof schema>) => {
    registerUser(data)
    .then((response) => {
      toast.success('Usuário cadastrado com sucesso');
      reset();
    })
    .catch((error) => {
      toast.error(error.response.data.detail);
    });
  };

  const [windowSize, setWindowSize] = React.useState(window?.innerWidth);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window?.innerWidth);
    });
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Box sx={container}>
        <img
          src={imagemLogin}
          alt="laço"
          style={
            windowSize < 800
              ? { display: "none" }
              : { position: "absolute", top: "20px", right: "10px" }
          }
        />
        <Paper sx={{ p: 8, width: 400 }}>
          <Avatar sx={{ ml: '180px', mb: 1, backgroundColor: colors.primary_dark }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ marginLeft: '130px', fontWeight: 'bold' }}>
            Registre-se
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 5 }}
            >
            <TextField
              margin="normal"
              required
              fullWidth
              id="nome"
              label={errors.nome?.message ?? "Nome"}
              error={!!errors.nome?.message}
              {...register("nome")}
              autoComplete="nome"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={errors.email?.message ?? "E-mail"}
              error={!!errors.email?.message}
              {...register("email")}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="telefone"
              label={errors.telefone?.message ?? "Telefone"}
              error={!!errors.telefone?.message}
              {...register("telefone")}
              autoComplete="telefone"
              autoFocus
            />
            <FormControl margin="normal" fullWidth variant="outlined">
              <InputLabel>Senha</InputLabel>
              <OutlinedInput
                {...register("senha")}
                label={errors.senha?.message ?? "Senha"}
                error={!!errors.senha?.message}
                id="senha"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 19 }}
            >
              ENTRAR
            </Button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Link href="/" variant="body2">
                Já possui cadastro? Faça login
              </Link>
            </Box>
            <Box sx={borda} />
          </Box>
        </Paper>
      </Box>
    </>
  );
}
