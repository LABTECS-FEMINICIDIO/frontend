import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { createProgramSearch } from "../../service/site";
import { toast } from "react-toastify";

const schema = Yup.object().shape({
  dias: Yup.number().required("Data é obrigatória"),
}).required();
type FormData = Yup.InferType<typeof schema>;

export function CreateProgram() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: FormData) => { handleCreateProgramSearch(data) };

  const handleCreateProgramSearch = async (data: Yup.InferType<typeof schema>) => {
    try {
      const response = await createProgramSearch(data);
     toast.success('Cadastrado com sucesso');
      reset();
      handleClose();
    } catch (error: any) {
      toast.error(error.response.data.message);
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
      <Button
        variant="outlined"
        endIcon={<AccessTimeFilledIcon />}
        onClick={handleClickOpen}
      >
        Programar
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: 600 }}>
          {"Programar pesquisas"}
        </DialogTitle>
        <Typography
          sx={{
            marginLeft: 3,
            marginRight: 3,
            marginBottom: 3,
          }}
        >
          {"Selecione data e hora para as pesquisas."}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ display: "grid", gap: 2 }}>
            <TextField
              type="number"
              fullWidth
              label={errors.dias?.message ?? "Dias"}
              {...register("dias")}
              error={!!errors.dias?.message}
              variant="filled"
              InputLabelProps={{
                shrink: true,
              }}
            />
        </DialogContent>
        <DialogActions sx={{ marginBottom: 3, marginRight: "20px" }}>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" onClick={handleClose} autoFocus>
            Salvar
          </Button>
        </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}