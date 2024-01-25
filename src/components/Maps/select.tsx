import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface props {
  value: string;
  handleChange: any;
}

export function SelectComponent(obj: props) {
  return (
    <div>
      <FormControl fullWidth className="selectStyled" size="small">
        <InputLabel id="demo-simple-select-label">Tema</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={obj.value}
          label={obj.value}
          onChange={obj.handleChange}
        >
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="silver">Silver</MenuItem>
          <MenuItem value="night">Night</MenuItem>
          <MenuItem value="retro">Retro</MenuItem>
          <MenuItem value="hiding">Hiding</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}