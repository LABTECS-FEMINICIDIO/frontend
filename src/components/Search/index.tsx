import React, {ChangeEvent, useEffect, useState} from 'react';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify';

interface ISearch {
  column: any
  value: any;
}

export const Search: React.FC<ISearch> = ({value}) => {
  const [search, setSearch] = useState({column: '', value: ''});
  const [count, setCount] = useState(0);

  const handleValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(state => ({
      ...state,
      [event.target.name]: event.target.value.toUpperCase(),
    }));
  };

  const handleColumn = (event: SelectChangeEvent) => {
    setSearch(state => ({
      ...state,
      [event.target.name]: event.target.value.trim(),
    }));
  };

  const NewArray = value.map((item: any) => (
    <MenuItem key={item.value} value={item.value}>
      {item.column}
    </MenuItem>
  ));

  const handleSearch = () => {
    if (search.column === '' || search.value === '') {
      toast.error('Campo coluna e pesquisa não pode ser vazio');
    } else {
      setCount(prevCount => prevCount + 1);
    }
  };

  const handleClear = () => {
    setSearch({column: '', value: ''});
    setCount(prevCount => prevCount + 1);
  };

  return (
    <>
      <Box sx={{display: 'flex', gap: '0.3125rem'}}>
        <Box>
          <FormControl sx={{minWidth: 140}} size="small">
            <InputLabel id="demo-select-small">Coluna</InputLabel>
            <Select
              name="column"
              value={search.column}
              labelId="demo-select-small"
              id="demo-select-small"
              label="coluna"
              onChange={handleColumn}>
              {NewArray} 
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl size="small">
            <TextField
              name="value"
              color="secondary"
              variant="outlined"
              label="Pesquisar"
              value={search.value}
              onChange={handleValue}
              onKeyDown={({key}) => key === 'Enter' && handleSearch()}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      onClick={() => {
                        handleSearch();
                      }}
                      aria-label="search">
                      <SearchIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleClear();
                      }}
                      aria-label="delete">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Box>
      </Box>
    </>
  );
};
