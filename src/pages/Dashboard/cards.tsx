import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { CardContent, Typography } from "@mui/material";
import Person2Icon from '@mui/icons-material/Person2';

export function Cards({ vitimas }: any) {
/*   const colors = {
    "Very Critical": "#E2433F",
    Critical: "#F7B834",
    Normal: "#519444",
    Excess: "#317AA4"
  } */

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
      {/* <Paper elevation={2} >
        <CardContent sx={{marginBottom: 4}}>
          <Typography sx={{ fontWeight: "bold", display: 'flex', gap: 2, fontSize: '18px'  }}>Válidos <CheckCircleIcon sx={{color: '#519444'}}/> </Typography>
          <Typography sx={{ fontWeight: "bold", fontSize: '28px', color: ' #519444' }}>18</Typography>
        </CardContent>
      </Paper>
      <Paper elevation={2} >
        <CardContent sx={{marginBottom: 4}}>
          <Typography sx={{ fontWeight: "bold", display: 'flex', gap: 2, fontSize: '18px'  }}>Inválidos <UnpublishedIcon sx={{color: '#ca0c0c'}}/></Typography>
          <Typography sx={{ fontWeight: "bold", fontSize: '28px', color: '#ca0c0c' }}>2</Typography>
        </CardContent>
      </Paper> */}
    </Box>
  )}
