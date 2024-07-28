import {
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
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import { findById, updateUser } from "../../service/users";
import { IUser } from "../../models/users";
import { useRefresh } from "../../shared/hooks/useRefresh";

const schema = Yup.object()
  .shape({
    name: Yup.string()
      .trim()
      .matches(/^[a-zA-Z\s]*$/, 'Nome deve conter apenas letras')
      .optional(),
    email: Yup.string()
      .email("E-mail deve ter um formato válido: exemplo@mail.com.br")
      .optional(),
    contact: Yup.string()
      .matches(/^[0-9]+$/, 'Telefone deve conter apenas números')
      .optional(),
    role: Yup.string().optional(),
    password: Yup.string().optional(),
  })
  .required();

type FormData = Yup.InferType<typeof schema>;

export function EditUser({ id, user }: { id: string , user: any}) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [userData, setUserData] = useState<IUser | null>(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(true)
  const { addCount } = useRefresh();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await handleUpadateUser(data);
  };

  const handleUpadateUser = async (data: Yup.InferType<typeof schema>) => {
    setLoading(true);
    try {
      await updateUser(id, data);
      toast.success("Informações do usuário atualizadas com sucesso");
      addCount();
      handleClose();
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response.data.detail || "Erro ao atualizar usuário");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    fillUserData();
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const fetchUserData = () => {
  //   findById(id)
  //     .then((response) => {
  //       if (response && response.data) {
  //         setUserData(response.data);
  //         setValue("nome", response.data.nome);
  //         setValue("email", response.data.email);
  //         setValue("perfil", response.data.perfil);
  //         setValue("telefone", response.data.telefone);
  //         setLoading(false);
  //       } else {
  //         console.error(
  //           "Erro ao buscar os dados do usuário: Resposta inválida"
  //         );
  //       }
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       console.error("Erro ao buscar os dados do usuário:", error);
  //     });
  // };

  const fillUserData = () => {
    console.log("user dasta", user)
    setValue("name", user.name)
    setValue("email", user.email);
    setValue("role", user.role);
    setValue("contact", user.contact);
    setLoading(false);
}
  const handleEditButtonClick = () => {
    setLoading(true);
    fillUserData();
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <EditIcon onClick={handleEditButtonClick} />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {user && (  // Verifica se os dados do usuário estão definidos
          <>
            <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: 600 }}>
              {"Editar informações do usuário"}
            </DialogTitle>
            <Typography
              sx={{
                marginLeft: 3,
                marginRight: 3,
                marginBottom: 3,
              }}
            >
              {"Personalize as informações do usuário conforme desejado."}
            </Typography>
            <Divider />
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
                  <InputLabel>Perfil</InputLabel>
                  <Select
                    label={errors.role?.message ?? "Perfil"}
                    {...register("role")}
                    error={!!errors.role?.message}
                    defaultValue={user?.role}
                  >
                    <MenuItem value={"Administrador"}>Administrador</MenuItem>
                    <MenuItem value={"Digitador"}>Digitador</MenuItem>
                    <MenuItem value={"Pesquisador"}>Editor</MenuItem>
                    <MenuItem value={"Visualizador"}>Visualizador</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions sx={{ marginRight: "20px", marginBottom: 3 }}>
                <Button autoFocus onClick={handleClose}>
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" autoFocus>
                  Editar
                </Button>
              </DialogActions>
            </Box>
          </>
        )}
      </Dialog>
    </>
  );
  
}
