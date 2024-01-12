import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { CardContent, Typography } from "@mui/material";
import ComputerIcon from '@mui/icons-material/Computer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';

export function Cards({ param }: any) {
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
          maxWidth: 500,
          width: 325,
          height: 100,
          mt: 4,
          mb: 5
        }
      }}
    >
      <Paper elevation={2} >
        <CardContent sx={{marginBottom: 4}}>
          <Typography sx={{ fontWeight: "bold", display: 'flex', gap: 2, fontSize: '18px' }}>Encontrados  <ComputerIcon sx={{color: '#2f52b3'}}/></Typography>
          <Typography sx={{ fontWeight: "bold", fontSize: '28px', color: '#2f52b3' }}>20</Typography>
        </CardContent>
      </Paper>
      <Paper elevation={2} >
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
      </Paper>
    </Box>
  )}
