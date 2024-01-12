import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField } from "@mui/material";

const schema = Yup.object().shape({
    nome: Yup.string().required('O nome é obrigatório'),
    idade: Yup.number().required('A idade é obrigatória').typeError('A idade é obrigatória'),
    telefone: Yup.string().required('O telefone é obrigatório'),
    rua: Yup.string().required('Rua é obrigatório'),
    bairro: Yup.string().required('Bairro é obrigatório'),
    armaUtilizada: Yup.string()
});


export function Form() {

    const { register, handleSubmit, reset, setValue, formState: { errors }, watch } = useForm({
        resolver: yupResolver(schema),
    });
  return (
    <Box sx={{display: "grid",  gridTemplateColumns: '1fr 1fr', gap: 1}}>
      <TextField
        label={errors.nome?.message ?? "Nome Completo"}
        {...register("nome")}
        error={!!errors.nome?.message}
        variant="filled"
      />
       <TextField
        label={errors.idade?.message ?? "Idade"}
        {...register("idade")}
        error={!!errors.idade?.message}
        variant="filled"
      />
       <TextField
        label={errors.telefone?.message ?? "Telefone"}
        {...register("telefone")}
        error={!!errors.telefone?.message}
        variant="filled"
      />
       <TextField
        label={errors.rua?.message ?? "Rua"}
        {...register("rua")}
        error={!!errors.rua?.message}
        variant="filled"
      />
       <TextField
        label={errors.bairro?.message ?? "Bairro"}
        {...register("bairro")}
        error={!!errors.bairro?.message}
        variant="filled"
      />
       <TextField
        label={errors.armaUtilizada?.message ?? "Arma utilizada"}
        {...register("armaUtilizada")}
        error={!!errors.armaUtilizada?.message}
        variant="filled"
      />
    </Box>
  );
}
