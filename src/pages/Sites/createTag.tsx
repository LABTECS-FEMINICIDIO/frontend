import React, { useState, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '@mui/material/styles';
import { caixaTag } from '../../styles';
import { Box, Chip, Divider, IconButton, TextField, Typography } from '@mui/material';
import { api } from '../../service/api';

interface CreateTagProps {
  // Props, se necessário
}

export function CreateTag({}: CreateTagProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [tags, setTags] = useState<string[]>([]);
  const [nome, setInputValue] = useState('');

  const handleRemoverTag = (tagRemovida: string) => {
    const novasTags = tags.filter((tag) => tag !== tagRemovida);
    setTags(novasTags);
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
    if (nome.trim() !== '') {
      setTags([...tags, nome.trim()]);
      api.post('/api/tag/', {nome})
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error('Erro ao adicionar tag:', error);
        });
      setInputValue('');
    }
  };

  return (
    <>
      <Button variant="outlined" endIcon={<AddCircleIcon />} onClick={handleClickOpen}>
        Adicionar Tags
      </Button>
      <Box component="form">
        <Dialog fullScreen={fullScreen} open={open} aria-labelledby="responsive-dialog-title">
          <Box>
            <DialogTitle sx={{ fontWeight: 600 }}>{"Adicionar Tags"}</DialogTitle>
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
          <DialogContent sx={{ display: 'flex', gap: 1 }}>
            <TextField
              label="Nome Completo"
              value={nome}
              onChange={handleChangeInput}
              variant="filled"
              fullWidth
            />
            <IconButton onClick={handleAdicionarTag}>
              <AddCircleIcon />
            </IconButton>
          </DialogContent>
          <Box sx={caixaTag}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleRemoverTag(tag)}
                sx={{ background: '#f0f0f0', mt: 2, mr: 1 }}
              />
            ))}
          </Box>
          <DialogActions sx={{ marginRight: 2, marginBottom: 2 }}>
            <Button autoFocus onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="contained" autoFocus>
              Cadastrar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
