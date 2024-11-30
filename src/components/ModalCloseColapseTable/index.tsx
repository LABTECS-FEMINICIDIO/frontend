import React, { useState } from "react";
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface DeleteSiteProps {
  handleCloseColapseTable: () => void;
}

const CloseColapseTable: React.FC<DeleteSiteProps> = ({ handleCloseColapseTable }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCloseModal = () => {
    handleClose()
    handleCloseColapseTable()
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <KeyboardArrowUpIcon />
      </IconButton>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Confirmar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja sair?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCloseModal} color="secondary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CloseColapseTable;
