import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { CardContent, Typography } from "@mui/material";
import Person2Icon from '@mui/icons-material/Person2';

export function Cards({ vitimas }: any) {

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          maxWidth: 300,
          width: 325,
          height: 100,
        }
      }}
    >
      <Paper elevation={2}>
        <CardContent sx={{marginBottom: 4}}>
          <Typography sx={{ fontWeight: "bold", display: 'flex', gap: 2, fontSize: '18px' }}>Total de vítimas  <Person2Icon sx={{color: '#8b2cf5'}}/></Typography>
          <Typography sx={{ fontWeight: "bold", fontSize: '28px', color: '#8b2cf5' }}>{vitimas.length}</Typography>
        </CardContent>
      </Paper>
    </Box>
  )}
