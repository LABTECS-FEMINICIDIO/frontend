import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import { findContent } from "../../service/link";
import React from "react";

interface IContent {
  idSite: string;
  props: string;
}

export function Content(props: IContent) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [contentData, setContentData] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = async () => {
    try {
      setOpen(true);
      setLoading(true);
      // Faz a requisição GET para buscar o conteúdo HTML
      const response = await findContent(props.idSite);
      if (response.status === 200 && response.data.conteudo !== null) {
        // Atualizar o estado com o conteúdo HTML retornado
        setContentData(response.data.conteudo);
      } else {
        // Se a requisição não foi bem-sucedida ou não há conteúdo, fecha o modal
        //setOpen(false);
      }
    } catch (error) {
      console.error("Erro na requisição GET:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
{/*       {contentData !== null && (
        <IconButton onClick={handleClickOpen}>
          <IntegrationInstructionsIcon />
        </IconButton>
      )} */}

      <IconButton onClick={handleClickOpen}>
        <IntegrationInstructionsIcon />
      </IconButton>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="xl"
        sx={{
          "& .css-1s23xog-MuiDialogContent-root": {
            width: "1280px",
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: 600 }}>
          {"Conteúdo do link"}
        </DialogTitle>
        <Divider sx={{ marginBottom: 2 }} />
        <DialogContent sx={{ display: "grid", gap: 2 }}>
          {loading ? (
             <CircularProgress sx={{ml: 7.5}}/>
          ) : contentData !== null ? (
            <Box dangerouslySetInnerHTML={{ __html: contentData }} />
          ) : (
            <Typography variant="body1">Não há conteúdo para ser exibido.</Typography>
          )}
        </DialogContent>
        <DialogActions
          sx={{ marginBottom: 3, marginTop: 3, marginRight: "35px" }}
        >
          <Button variant="contained" onClick={handleClose}>
            Voltar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
