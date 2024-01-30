import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const schema = Yup.object()
  .shape({
    datadofato: Yup.string().matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Formato inválido. Use dd/mm/aaaa"
    ),
    diah: Yup.string().oneOf(
      ["dom", "seg", "ter", "qua", "qui", "sex", "sab"],
      "Opção inválida. Use dom/seg/ter/qua/qui/sex/sab"
    ),
    horario: Yup.string().matches(
      /^([01]\d|2[0-3]):[0-5]\d$/,
      "Formato inválido. Use hora:minutos"
    ),
    turno: Yup.string().oneOf(
      ["madrugada", "manha", "tarde", "noite"],
      "Opção inválida. Use madrugada/manha/tarde/noite"
    ),
    nome: Yup.string(),
    idade: Yup.number().positive("A idade deve ser um número positivo"),
    racacor1: Yup.string().oneOf(
      ["branca", "indigena", "parda", "amarela", "preta"],
      "Opção inválida. Use branca/indigena/parda/amarela/preta"
    ),
    estciv2: Yup.string().oneOf(
      [
        "solteira",
        "casada",
        "viuva",
        "separada judicialmente-divorciada",
        "uniao estavel",
      ],
      "Opção inválida. Use solteira/casada/viuva/separada judicialmente-divorciada/uniao estavel"
    ),
    bairro: Yup.string(),
    rua_beco_travessa_estrada_ramal: Yup.string(),
    endcomplemento: Yup.string(),
    tipoarma1: Yup.string().oneOf(
      [
        "faca",
        "vidro",
        "pedra",
        "tercado",
        "enxada",
        "corda",
        "fio eletrico",
        "chave de fenda",
        "arma de fogo",
        "forca corporal",
        "substancias inflamaveis",
        "objeto de madeira",
        "submersão em coleção hídrica",
      ],
      "Opção inválida. Use faca/vidro/pedra/tercado/enxada/corda/fio eletrico/chave de fenda/arma de fogo/forca corporal/substancias inflamaveis/objeto de madeira/submersão em coleção hídrica"
    ),
    tipoarma2: Yup.string().oneOf(
      [
        "faca",
        "vidro",
        "pedra",
        "tercado",
        "enxada",
        "corda",
        "fio eletrico",
        "chave de fenda",
        "arma de fogo",
        "forca corporal",
        "substancias inflamaveis",
        "objeto de madeira",
        "submersão em coleção hídrica",
      ],
      "Opção inválida. Use faca/vidro/pedra/tercado/enxada/corda/fio eletrico/chave de fenda/arma de fogo/forca corporal/substancias inflamaveis/objeto de madeira/submersão em coleção hídrica"
    ),
    loclesao1: Yup.string().oneOf(
      ["cabeca", "pescoco", "torax", "mmss", "mmii"],
      "Opção inválida. Use cabeca/pescoco/torax/mmss/mmii"
    ),
    loclesao2: Yup.string().oneOf(
      ["cabeca", "pescoco", "torax", "mmss", "mmii"],
      "Opção inválida. Use cabeca/pescoco/torax/mmss/mmii"
    ),
    loclesao3: Yup.string().oneOf(
      ["cabeca", "pescoco", "torax", "mmss", "mmii"],
      "Opção inválida. Use cabeca/pescoco/torax/mmss/mmii"
    ),
    hospitalizacao: Yup.string().oneOf(
      ["sim", "nao"],
      "Opção inválida. Use sim/nao"
    ),
    violsexual: Yup.string().oneOf(
      ["sim", "nao"],
      "Opção inválida. Use sim/nao"
    ),
    latrocinio: Yup.string().oneOf(
      ["sim", "nao"],
      "Opção inválida. Use sim/nao"
    ),
    localdeocorrencia: Yup.string().oneOf(
      [
        "domicilio",
        "via publica",
        "estabelecimento comercial",
        "sistema penitenciario",
        "delegacia",
        "terreno abandonado em area residencial",
        "casa ou edificacao abandonada",
        "area de mata dentro na zona urbana",
        "area de mata na zona rural",
        "coleção hídrica",
      ],
      "Opção inválida. Use domicilio/via publica/estabelecimento comercial/sistema penitenciario/delegacia/terreno abandonado em area residencial/casa ou edificacao abandonada/area de mata dentro na zona urbana/area de mata na zona rural/coleção hídrica"
    ),
    presencafilhofamiliar: Yup.string().oneOf(
      ["sim", "nao"],
      "Opção inválida. Use sim/nao"
    ),
    compexcomp: Yup.string().oneOf(
      ["sim", "nao"],
      "Opção inválida. Use sim/nao"
    ),
    gestacao: Yup.string().oneOf(["sim", "nao"], "Opção inválida. Use sim/nao"),
    filhosdescrever: Yup.number().positive(
      "O número de filhos deve ser um número positivo"
    ),
    latLng: Yup.string(),
  })
  .required();
type FormData = Yup.InferType<typeof schema>;

export function Form() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const onSubmit = (data: FormData) => { handleCreateUser(data) };

  return (
    <>
    <Box sx={{ display: "grid", gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
      <TextField
        type="date"
        label={errors.datadofato?.message ?? "datadofato"}
        {...register("datadofato")}
        error={!!errors.datadofato?.message}
        variant="filled"
        InputLabelProps={{ shrink: true }}
      />
      <FormControl variant="filled">
        <InputLabel>{errors.diah?.message ?? "diah"}</InputLabel>
        <Select
          label={errors.diah?.message ?? "diah"}
          {...register("diah")}
          error={!!errors.diah?.message}
          defaultValue={""}
        >
          <MenuItem value={"Dom"}>Dom</MenuItem>
          <MenuItem value={"Seg"}>Seg</MenuItem>
          <MenuItem value={"Ter"}>Ter</MenuItem>
          <MenuItem value={"Qua"}>Qua</MenuItem>
          <MenuItem value={"Qui"}>Qui</MenuItem>
          <MenuItem value={"Sex"}>Sex</MenuItem>
          <MenuItem value={"Sab"}>Sab</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label={errors.horario?.message ?? "horario"}
        {...register("horario")}
        error={!!errors.horario?.message}
        variant="filled"
      />
      <FormControl variant="filled">
        <InputLabel>{errors.turno?.message ?? "turno"}</InputLabel>
        <Select
          label={errors.turno?.message ?? "turno"}
          {...register("turno")}
          error={!!errors.turno?.message}
          defaultValue={""}
        >
          <MenuItem value={"madrugada"}>madrugada</MenuItem>
          <MenuItem value={"manha"}>manha</MenuItem>
          <MenuItem value={"tarde"}>tarde</MenuItem>
          <MenuItem value={"noite"}>noite</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label={errors.nome?.message ?? "nome"}
        {...register("nome")}
        error={!!errors.nome?.message}
        variant="filled"
      />
      <TextField
        label={errors.idade?.message ?? "idade"}
        {...register("idade")}
        error={!!errors.idade?.message}
        variant="filled"
      />
      <FormControl variant="filled">
        <InputLabel>{errors.racacor1?.message ?? "racacor1"}</InputLabel>
        <Select
          label={errors.racacor1?.message ?? "racacor1"}
          {...register("racacor1")}
          error={!!errors.racacor1?.message}
          defaultValue={""}
        >
          <MenuItem value={"branca"}>branca</MenuItem>
          <MenuItem value={"indigena"}>indigena</MenuItem>
          <MenuItem value={"parda"}>parda</MenuItem>
          <MenuItem value={"amarela"}>amarela</MenuItem>
          <MenuItem value={"preta"}>preta</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled">
        <InputLabel>{errors.estciv2?.message ?? "estciv2"}</InputLabel>
        <Select
          label={errors.estciv2?.message ?? "estciv2"}
          {...register("estciv2")}
          error={!!errors.estciv2?.message}
          defaultValue={""}
        >
          <MenuItem value={"solteira"}>solteira</MenuItem>
          <MenuItem value={"casada"}>casada</MenuItem>
          <MenuItem value={"viuva"}>viuva</MenuItem>
          <MenuItem value={"separada"}>separada</MenuItem>
          <MenuItem value={"judicialmente-divorciada"}>
            judicialmente-divorciada
          </MenuItem>
          <MenuItem value={"uniao-estavel"}>uniao estavel</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label={errors.bairro?.message ?? "bairro"}
        {...register("bairro")}
        error={!!errors.bairro?.message}
        variant="filled"
      />
      <TextField
        label={
          errors.rua_beco_travessa_estrada_ramal?.message ??
          "rua_beco_travessa_estrada_ramal"
        }
        {...register("rua_beco_travessa_estrada_ramal")}
        error={!!errors.rua_beco_travessa_estrada_ramal?.message}
        variant="filled"
      />
      <TextField
        label={errors.endcomplemento?.message ?? "endcomplemento"}
        {...register("endcomplemento")}
        error={!!errors.endcomplemento?.message}
        variant="filled"
      />
      <FormControl variant="filled">
        <InputLabel>{errors.tipoarma1?.message ?? "tipoarma1"}</InputLabel>
        <Select
          label={errors.tipoarma1?.message ?? "tipoarma1"}
          {...register("tipoarma1")}
          error={!!errors.tipoarma1?.message}
          defaultValue={""}
        >
          <MenuItem value={"faca"}>faca</MenuItem>
          <MenuItem value={"vidro"}>vidro</MenuItem>
          <MenuItem value={"pedra"}>pedra</MenuItem>
          <MenuItem value={"tercado"}>tercado</MenuItem>
          <MenuItem value={"enxada"}>enxada</MenuItem>
          <MenuItem value={"corda"}>corda</MenuItem>
          <MenuItem value={"fio-eletrico"}>fio eletrico</MenuItem>
          <MenuItem value={"chave-de-fenda"}>chave de fenda</MenuItem>
          <MenuItem value={"arma-de-fogo"}>arma de fogo</MenuItem>
          <MenuItem value={"forca-corporal"}>forca corporal</MenuItem>
          <MenuItem value={"substancias-inflamaveis"}>
            substancias inflamaveis
          </MenuItem>
          <MenuItem value={"objeto-de-madeira"}>objeto de madeira</MenuItem>
          <MenuItem value={"submersao-em-colecao-hidrica"}>
            submersao em colecao hidrica
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled">
        <InputLabel>{errors.tipoarma2?.message ?? "tipoarma2"}</InputLabel>
        <Select
          label={errors.tipoarma2?.message ?? "tipoarma2"}
          {...register("tipoarma2")}
          error={!!errors.tipoarma2?.message}
          defaultValue={""}
        >
          <MenuItem value={"faca"}>faca</MenuItem>
          <MenuItem value={"vidro"}>vidro</MenuItem>
          <MenuItem value={"pedra"}>pedra</MenuItem>
          <MenuItem value={"tercado"}>tercado</MenuItem>
          <MenuItem value={"enxada"}>enxada</MenuItem>
          <MenuItem value={"corda"}>corda</MenuItem>
          <MenuItem value={"fio-eletrico"}>fio eletrico</MenuItem>
          <MenuItem value={"chave-de-fenda"}>chave de fenda</MenuItem>
          <MenuItem value={"arma-de-fogo"}>arma de fogo</MenuItem>
          <MenuItem value={"forca-corporal"}>forca corporal</MenuItem>
          <MenuItem value={"substancias-inflamaveis"}>
            substancias inflamaveis
          </MenuItem>
          <MenuItem value={"objeto-de-madeira"}>objeto de madeira</MenuItem>
          <MenuItem value={"submersao-em-colecao-hidrica"}>
            submersao em colecao hidrica
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled">
        <InputLabel>{errors.loclesao1?.message ?? "loclesao1"}</InputLabel>
        <Select
          label={errors.loclesao1?.message ?? "loclesao1"}
          {...register("loclesao1")}
          error={!!errors.loclesao1?.message}
          defaultValue={""}
        >
          <MenuItem value={"cabeca"}>cabeca</MenuItem>
          <MenuItem value={"pescoco"}>pescoco</MenuItem>
          <MenuItem value={"pedra"}>pedra</MenuItem>
          <MenuItem value={"torax"}>torax</MenuItem>
          <MenuItem value={"mmss"}>mmss</MenuItem>
          <MenuItem value={"mmii"}>mmii</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled">
        <InputLabel>{errors.loclesao2?.message ?? "loclesao2"}</InputLabel>
        <Select
          label={errors.loclesao2?.message ?? "loclesao2"}
          {...register("loclesao2")}
          error={!!errors.loclesao2?.message}
          defaultValue={""}
        >
          <MenuItem value={"cabeca"}>cabeca</MenuItem>
          <MenuItem value={"pescoco"}>pescoco</MenuItem>
          <MenuItem value={"pedra"}>pedra</MenuItem>
          <MenuItem value={"torax"}>torax</MenuItem>
          <MenuItem value={"mmss"}>mmss</MenuItem>
          <MenuItem value={"mmii"}>mmii</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled">
        <InputLabel>{errors.loclesao3?.message ?? "loclesao3"}</InputLabel>
        <Select
          label={errors.loclesao3?.message ?? "loclesao3"}
          {...register("loclesao3")}
          error={!!errors.loclesao3?.message}
          defaultValue={""}
        >
          <MenuItem value={"cabeca"}>cabeca</MenuItem>
          <MenuItem value={"pescoco"}>pescoco</MenuItem>
          <MenuItem value={"pedra"}>pedra</MenuItem>
          <MenuItem value={"torax"}>torax</MenuItem>
          <MenuItem value={"mmss"}>mmss</MenuItem>
          <MenuItem value={"mmii"}>mmii</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled">
        <InputLabel>
          {errors.hospitalizacao?.message ?? "hospitalizacao"}
        </InputLabel>
        <Select
          label={errors.hospitalizacao?.message ?? "hospitalizacao"}
          {...register("hospitalizacao")}
          error={!!errors.hospitalizacao?.message}
          defaultValue={""}
        >
          <MenuItem value={"sim"}>sim</MenuItem>
          <MenuItem value={"nao"}>nao</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled">
        <InputLabel>{errors.violsexual?.message ?? "violsexual"}</InputLabel>
        <Select
          label={errors.violsexual?.message ?? "violsexual"}
          {...register("violsexual")}
          error={!!errors.violsexual?.message}
          defaultValue={""}
        >
          <MenuItem value={"sim"}>sim</MenuItem>
          <MenuItem value={"nao"}>nao</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled">
        <InputLabel>{errors.latrocinio?.message ?? "latrocinio"}</InputLabel>
        <Select
          label={errors.latrocinio?.message ?? "latrocinio"}
          {...register("latrocinio")}
          error={!!errors.latrocinio?.message}
          defaultValue={""}
        >
          <MenuItem value={"sim"}>sim</MenuItem>
          <MenuItem value={"nao"}>nao</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled">
        <InputLabel>
          {errors.localdeocorrencia?.message ?? "localdeocorrencia"}
        </InputLabel>
        <Select
          label={errors.localdeocorrencia?.message ?? "localdeocorrencia"}
          {...register("localdeocorrencia")}
          error={!!errors.localdeocorrencia?.message}
          defaultValue={""}
        >
          <MenuItem value={"domicilio"}>domicilio</MenuItem>
          <MenuItem value={"viapublica"}>via publica</MenuItem>
          <MenuItem value={"estabelecimento-comercial"}>
            estabelecimento comercial
          </MenuItem>
          <MenuItem value={"sistema-penitenciario"}>
            sistema penitenciario
          </MenuItem>
          <MenuItem value={"delegacia"}>delegacia</MenuItem>
          <MenuItem value={"terreno-abandonado-em-area-residencial"}>
            terreno abandonado em area residencial
          </MenuItem>
          <MenuItem value={"casa-ou-edificacao-abandonada"}>
            casa ou edificacao abandonada
          </MenuItem>
          <MenuItem value={"area-de-mata-dentro-na-zona-urbana"}>
            area de mata dentro na zona urbana
          </MenuItem>
          <MenuItem value={"area-de-mata-na-zona-rural"}>
            area de mata na zona rural
          </MenuItem>
          <MenuItem value={"colecao-hidrica"}>coleção hidrica</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled">
        <InputLabel>
          {errors.presencafilhofamiliar?.message ?? "presencafilhofamiliar"}
        </InputLabel>
        <Select
          label={
            errors.presencafilhofamiliar?.message ?? "presencafilhofamiliar"
          }
          {...register("presencafilhofamiliar")}
          error={!!errors.presencafilhofamiliar?.message}
          defaultValue={""}
        >
          <MenuItem value={"sim"}>sim</MenuItem>
          <MenuItem value={"nao"}>nao</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled">
        <InputLabel>{errors.gestacao?.message ?? "gestacao"}</InputLabel>
        <Select
          label={errors.gestacao?.message ?? "gestacao"}
          {...register("gestacao")}
          error={!!errors.gestacao?.message}
          defaultValue={""}
        >
          <MenuItem value={"sim"}>sim</MenuItem>
          <MenuItem value={"nao"}>nao</MenuItem>
        </Select>
      </FormControl>
      <TextField
        type="number"
        label={errors.filhosdescrever?.message ?? "filhosdescrever"}
        {...register("filhosdescrever")}
        error={!!errors.filhosdescrever?.message}
        variant="filled"
      />
      <TextField
        label={errors.latLng?.message ?? "lat e lng"}
        {...register("latLng")}
        error={!!errors.latLng?.message}
        variant="filled"
      />
    </Box>
      <Box sx={{marginLeft: '180px', marginTop: '10px'}}>
        <Button variant="contained" type="submit" >Salvar</Button>
      </Box>
    </>
  );
}
