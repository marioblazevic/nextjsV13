"use client";
import { Box, Typography } from "@mui/material";
import classes from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <Box sx={{ p: 1 }} component="footer" className={classes.position}>
      <Typography variant="h6" align="center" gutterBottom>
        Levi9
      </Typography>
    </Box>
  );
};

export default Footer;
