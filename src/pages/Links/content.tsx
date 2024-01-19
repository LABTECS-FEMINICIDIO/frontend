import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

interface IContent {
  props: string;
}

export function Content(props: IContent) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
       {props.props && (
        <IconButton onClick={handleClickOpen}>
          <IntegrationInstructionsIcon/>
        </IconButton>
      )}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth='xl' 
        sx={{
          "& .css-1s23xog-MuiDialogContent-root": {
            width: "1280px",
          }
        }}
      >
        <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: 600 }}>
          {"Conteúdo do link"}
        </DialogTitle>
        <Divider sx={{marginBottom: 2}} />
        <DialogContent sx={{display: 'grid', gap: 2}}>
          <Box dangerouslySetInnerHTML={{ __html: props.props }} />
        </DialogContent>
        <DialogActions sx={{marginBottom: 3, marginTop: 3, marginRight: '35px'}}>
          <Button variant="contained" autoFocus onClick={handleClose}>
            Voltar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
