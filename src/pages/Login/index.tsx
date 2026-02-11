import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
} from "@mui/material";
import { borda, container } from "../../styles";
import imagemLogin from "../../assets/testeimagemlogin.png";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useToken } from "../../shared/hooks/auth";
import { toast } from "react-toastify";
import logo from "../../assets/I.V FEM. VERTICAL.svg";
import WelcomeRobot from "../../components/WelcomeRobot";

const schema = yup
  .object({
    email: yup
      .string()
      .required("E-mail é um campo obrigatório")
      .email("E-mail deve ter um formato válido, exemplo@mail.com.br"),
    senha: yup.string().required("Senha é um campo obrigatório"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [windowSize, setWindowSize] = React.useState(window?.innerWidth);
  const { Login, token, permission, handleSelectedState } = useToken();
  const [cidade, setCidade] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => handleLogin(data);

  const handleLogin = async (data: yup.InferType<typeof schema>) => {
    setLoading(true);
    if (cidade === "") {
      toast.error("Selecione uma cidade");
      setLoading(false);
      return;
    }
    await Login(data);
    setLoading(false);
  };

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window?.innerWidth);
    });
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChangeState = (state: string) => {
    handleSelectedState(state);
    setCidade(state);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
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
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(8px)", // 👈 aqui
            }}
          />
          <Paper
            sx={{
              position: "relative",
              zIndex: 10,
              p: { xs: 3, sm: 4, md: 5 },
              width: {
                xs: "90%",
                sm: "80%",
                md: 450,
                lg: 500,
              },
              maxWidth: "95vw",

              // 👇 reduz só em telas médias (notebook)
              transform: {
                xs: "scale(1)",
                md: "scale(0.6)",
                lg: "scale(0.9)",
              },
              transformOrigin: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={logo} alt="logo: vigifeminicidio" width="120px" />
              <WelcomeRobot />
            </Box>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
              <FormControl margin="normal" fullWidth variant="outlined">
                <InputLabel>{"Selecione a cidade"}</InputLabel>
                <Select
                  label={"Selecione a cidade"}
                  onChange={(e) => handleChangeState(e.target.value)}
                  defaultValue={""}
                >
                  <MenuItem value={"Manaus"}>Manaus</MenuItem>
                  <MenuItem value={"Porto-velho"}>Porto Velho</MenuItem>
                  <MenuItem value={"Rio-branco"}>Rio Branco</MenuItem>
                  <MenuItem value={"Rio-de-janeiro"}>Rio de Janeiro</MenuItem>
                  <MenuItem value={"Boa-vista"}>Boa Vista</MenuItem>
                </Select>
              </FormControl>
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 3,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ minWidth: 100 }}
                >
                  {loading ? <CircularProgress /> : "ENTRAR"}
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Link href="/register" variant="body2" sx={{ marginTop: 2 }}>
                    Não possui cadastro? Registre-se
                  </Link>
                  <Link
                    href="/recoveryCode"
                    variant="body2"
                    sx={{ marginTop: 1 }}
                  >
                    Esqueci minha senha
                  </Link>
                </Box>
                <Box sx={borda} />
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
}
