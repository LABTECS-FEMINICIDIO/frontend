import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { colors } from '../../shared/theme';

interface ModalDeleteProps {
  onDelete: () => void;
  title?: string;
  subtitle?: string;
}

export function ModalDelete({onDelete, title, subtitle}: ModalDeleteProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <DeleteIcon color="primary" />
      </IconButton>

      <Dialog open={open}>
        <DialogTitle
          sx={{
            padding: '2.5rem 2.5rem 0 2.5rem',
            color: colors.primary_base,
            fontSize: '1.25rem',
          }}>
          {title}

          <Typography
            sx={{color: colors.neutral_dark, fontSize: '0.875rem'}}
            variant="subtitle1">
            {subtitle}
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            width: '600px',
            padding: '1.0rem',
          }}></DialogContent>
        <DialogActions sx={{padding: '0 2.5rem 2.5rem 2.5rem'}}>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleOk} variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
