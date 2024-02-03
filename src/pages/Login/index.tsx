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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useToken } from "../../shared/hooks/auth";

const schema = yup
  .object({
    email: yup.string().required("E-mail é um campo obrigatório"),
    senha: yup.string().required("Senha é um campo obrigatório"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [windowSize, setWindowSize] = React.useState(window?.innerWidth);
  const { Login, token, permission } = useToken();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => handleLogin(data);

  const handleLogin = async (data: yup.InferType<typeof schema>) => {
    await Login(data);
  };

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
      {!permission && !token && (
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
            <Avatar sx={{ ml: '170px', backgroundColor: colors.primary_dark }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ marginLeft: '160px', marginTop: 1, fontWeight: 'bold'  }}>
              Login
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
                id="email"
                label={errors.email?.message ?? "E-mail"}
                error={!!errors.email?.message}
                {...register("email")}
                autoComplete="email"
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
                <Link href="/register" variant="body2">
                  Não possui cadastro? Registre-se
                </Link>
              </Box>
              <Box sx={borda} />
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
}
