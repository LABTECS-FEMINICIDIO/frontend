import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import React from "react";
  import * as Yup from "yup";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

  interface IContent{
    props: string
  }
  
  export function Content(props: IContent) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <>
        <IconButton onClick={handleClickOpen}>
          <IntegrationInstructionsIcon/>
        </IconButton>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: 600 }}>
            {"Conteúdo do link"}
          </DialogTitle>
            <Divider sx={{marginBottom: 2}} />
          <DialogContent sx={{display: 'grid', gap: 2}}>
         {props.props}
          </DialogContent>
          <DialogActions sx={{marginBottom: 3, marginRight: '20px'}}>
            <Button autoFocus onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant='contained' onClick={handleClose} autoFocus>
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  