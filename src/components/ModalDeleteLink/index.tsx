import React, { useState } from "react";
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

interface DeleteSiteProps {
  id: string;
  deleteLink: (linkId: string) => Promise<any>;
  addCount: () => void;
}

const DeleteSiteModal: React.FC<DeleteSiteProps> = ({ id, deleteLink, addCount }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    deleteLink(id)
      .then((response: any) => {
        if (response.status === 200) {
          addCount();
          toast.success("Link excluído com sucesso");
          handleClose();
        }
      })
      .catch((error: any) => {
        toast.error(error?.response?.data?.detail || "Erro ao excluir o link");
        handleClose();
      });
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir este link? Essa ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteSiteModal;
