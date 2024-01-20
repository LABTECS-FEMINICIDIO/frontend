import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import { colors } from "../../shared/theme";
import { borda, container } from "../../styles";
import imagemLogin from '../../assets/laco-login.svg';

export default function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [windowSize, setWindowSize] = React.useState(window?.innerWidth)

  React.useEffect(() => {

    window.addEventListener("resize", () => {
        setWindowSize(window?.innerWidth)
    })
  }, [])



  return (
    <>
      <Box sx={container}>
        <img src={imagemLogin} alt="laço" style={windowSize < 800 ? {display: "none"} :  {position: 'absolute', top: '20px', right: '10px'}}/>
          <Paper sx={{p: 8, width: 400}}>
            <Avatar sx={{ ml: 21, backgroundColor: colors.primary_dark }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{marginLeft: 20}}>
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 19}}
              >
                ENTRAR
              </Button>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3}}>
                  <Link href="#" variant="body2">
                    Não possui cadastro? Registre-se
                  </Link>
                </Box>
                  <Box sx={borda}/>
            </Box>
          </Paper>
        </Box>
    </>
  );
}
