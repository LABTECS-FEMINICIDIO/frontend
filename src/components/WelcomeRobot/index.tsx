import { Box, Typography } from "@mui/material";
import Lottie from "lottie-react";
import robotAnimation from "../../assets/robot-welcome.json";

export default function AnimatedRobot() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn 0.8s ease-in-out",
        mt: 2,
        mb: 1,
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Box sx={{ width: 150 }}>
        <Lottie animationData={robotAnimation} loop={true} />
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          background: "linear-gradient(90deg, #7B2CBF, #C77DFF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Bem-vinda(o) ao FemiBot 💜
      </Typography>

      {/* <Typography
        variant="h5"
        sx={{ color: "text.primary", fontWeight: "bold" }}
      >
        Vigifeminicídio
      </Typography> */}
    </Box>
  );
}
