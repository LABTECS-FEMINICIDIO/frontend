import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import React from "react";
  import { useForm } from "react-hook-form";
  import { toast } from "react-toastify";
  import LockResetIcon from "@mui/icons-material/LockReset";
  import { createPassword } from "../../service/users";
  
  // Você não precisa mais do Yup neste código, então vamos removê-lo
  
  export function ResetPassword({ userId }: { userId: string }) { // Adicionamos userId como prop
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  
    const { handleSubmit } = useForm();
  
    const handleResetPassword = async () => {
      try {
        // Aqui você faz a requisição para resetar a senha, passando o userId no corpo da requisição
        const response = await createPassword(userId);
        toast.success('Senha atualizada com sucesso');
        handleClose();
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Erro ao redefinir a senha');
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
          <LockResetIcon />
        </IconButton>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Deseja realmente resetar a senha deste usuário?"}
          </DialogTitle>
          <Box component="form" onSubmit={handleSubmit(handleResetPassword)}>
            <DialogActions sx={{ marginRight: "20px", marginBottom: 3 }}>
              <Button autoFocus onClick={handleClose}>
                Não
              </Button>
              <Button type="submit" variant="contained" autoFocus>
                Sim
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </>
    );
  }