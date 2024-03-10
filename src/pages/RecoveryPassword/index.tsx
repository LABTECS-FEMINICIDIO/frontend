import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Alert, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper } from "@mui/material";
import { colors } from "../../shared/theme";
import { borda, container } from "../../styles";
import imagemLogin from "../../assets/laco-login.svg";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { api } from "../../service/api";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const schema = yup
  .object({
    email: yup.string().email("E-mail inválido").required("E-mail é um campo obrigatório"),
    recovery_code: yup.string().required("Código de recuperação é um campo obrigatório"),
    new_password: yup.string().required("Senha é um campo obrigatório"),
    confirm_password: yup.string()
    .oneOf([yup.ref('new_password')], 'As senhas devem coincidir')
    .required('Confirme sua senha')
  })
  .required();
type FormData = yup.InferType<typeof schema>;



export default function RecoveryPass() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => handleRegister(data);
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async (data: yup.InferType<typeof schema>) => {
    setLoading(true);

    
    api.post("/api/mudarSenha/", {
        "email": data.email,
        "recovery_code": data.recovery_code,
        "new_password": data.new_password
    }).then((res) => {
        toast.success(res.data.message)
        setLoading(false)
        reset()
        setTimeout(() => {
            toast.info("Você será redirecionado para a página de login")
        }, 3000)
        setTimeout(() => {
            window.location.href = '/';
        }, 6000)
    }).catch((err) => {
        toast.error(err.response.data.detail)
        setLoading(false)
        reset()
    })
  };
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [windowSize, setWindowSize] = React.useState(window?.innerWidth);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  
  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window?.innerWidth);
    });
  }, []);

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
        <Paper
          style={
            windowSize < 800
              ? {
                  display: "grid",
                  margin: "20px",
                  padding: "20px",
                }
              : { padding: "80px", width: "400px" }
          }
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <Avatar
              sx={{ backgroundColor: colors.primary_dark }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              Recuperação de senha
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 2 }}
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
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="recovery_code"
              label={errors.recovery_code?.message ?? "Código de recuperação"}
              error={!!errors.recovery_code?.message}
              {...register("recovery_code")}
              autoComplete="recovery_code"
              autoFocus
            />
            
            <FormControl margin="normal" fullWidth variant="outlined">
                <InputLabel>{errors.new_password?.message ?? "Nova senha"}</InputLabel>
                <OutlinedInput
                  {...register("new_password")}
                  label={errors.new_password?.message ?? "Nova senha"}
                  error={!!errors.new_password?.message}
                  id="new_password"
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
                <InputLabel>{errors.confirm_password?.message ?? "Confirme sua senha"}</InputLabel>
                <OutlinedInput
                  {...register("confirm_password")}
                  label={errors.confirm_password?.message ?? "Confirme sua senha"}
                  error={!!errors.confirm_password?.message}
                  id="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
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
                sx={{ minWidth: 120 }}
              >
                {loading ? <CircularProgress /> : "Redefinir senha"}
              </Button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Link href="/" variant="body2" sx={{ marginBottom: 1 }}>
                  Faça login
                </Link>
              </Box>
              <Box sx={borda} />
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
