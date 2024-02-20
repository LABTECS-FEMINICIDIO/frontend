import React, { useState, ChangeEvent, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useTheme } from "@mui/material/styles";
import { caixaTag } from "../../styles";
import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { api } from "../../service/api";
import { toast } from "react-toastify";

export function CreateTag() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const handleRemoverTag = (tagRemovida: string) => {
    setLoading(true);
    api
      .delete("/api/tag/" + tagRemovida)
      .then((response) => {
        if (response.status === 200) {
          const novasTags = tags.filter((tag) => tag !== tagRemovida);
          setTags(novasTags);
          setLoading(false);
          toast.success(`Tag ${tagRemovida} removida com sucesso!`);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAdicionarTag = () => {
    setLoading(true);
    if (inputValue.trim() !== "") {
      api
        .post("/api/tag/", { nome: inputValue })
        .then(() => {
          toast.success("Tag criada com sucesso");
          setTags([...tags, inputValue]);
          setInputValue("");
          setLoading(false);
        })
        .catch((error: any) => {
          setLoading(false);
          toast.error(error.message);
        });
    }
  };

  const findTags = () => {
    setLoading(true);
    api
      .get("/api/tag/")
      .then((response) => {
        const tagNames = response.data.map((tag: { nome: string }) => tag.nome);
        setTags(tagNames);
        setLoading(false);
      })
      .catch((error: any) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    findTags();
  }, [open]);

  return (
    <>
      <Button
        variant="outlined"
        endIcon={<AddCircleIcon />}
        onClick={handleClickOpen}
        disabled={loading}
      >
        Adicionar Tags
      </Button>
      <Box component="form">
        <Dialog
          fullScreen={fullScreen}
          open={open}
          aria-labelledby="responsive-dialog-title"
        >
          <Box>
            <DialogTitle sx={{ fontWeight: 600 }}>
              {"Adicionar Tags"}
            </DialogTitle>
            <Typography
              sx={{
                marginLeft: 3,
                marginRight: 3,
                marginBottom: 3,
              }}
            >
              {"Preencha as informações para cadastrar uma nova tag."}
            </Typography>
          </Box>
          <Divider sx={{ marginBottom: 1 }} />
          <DialogContent sx={{ display: "flex", gap: 1 }}>
            <TextField
              label="Tag"
              value={inputValue}
              onChange={handleChangeInput}
              variant="filled"
              fullWidth
            />
            <IconButton onClick={handleAdicionarTag}>
              <AddCircleIcon />
            </IconButton>
          </DialogContent>
          {loading ? (
            <Box sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...caixaTag
            }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={caixaTag}>
              {tags?.length > 0 ? (
                tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleRemoverTag(tag)}
                    sx={{ background: "#fff", mt: 2, mr: 1 }}
                  />
                ))
              ) : (
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "130px",
                  }}
                >
                  Nenhuma tag cadastrada.
                </Typography>
              )}
            </Box>
          )}
          <DialogActions sx={{ marginRight: 2, marginBottom: 2 }}>
            <Button autoFocus onClick={handleClose}>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
