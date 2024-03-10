import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Alert, CircularProgress, Paper } from "@mui/material";
import { colors } from "../../shared/theme";
import { borda, container } from "../../styles";
import imagemLogin from "../../assets/laco-login.svg";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { api } from "../../service/api";

const schema = yup
  .object({
    email: yup.string().email("E-mail inválido").required("E-mail é um campo obrigatório"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;



export default function RecoveryCode() {

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
    
    api.post("/api/recuperarSenha/", data).then((res) => {
        toast.success(res.data.message, {
          autoClose: false
        })
        toast.info("Verifique seu email", {
          autoClose: false,
          theme: "colored"
        })
        setLoading(false)
        reset()
    }).catch((err) => {
        toast.error(err.response.data.detail)
        setLoading(false)
        reset()
    })
  };

  const [windowSize, setWindowSize] = React.useState(window?.innerWidth);

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
          <Alert severity="info" sx={{margin: '20px', background: colors.primary_lightest, color: colors.neutral_dark}}>
          Você receberá um email com o código de redefinição de senha.
          </Alert>
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
                {loading ? <CircularProgress /> : "Enviar código"}
              </Button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Link href="/" variant="body2" sx={{ marginTop: 3 }}>
                  Voltar para login
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
