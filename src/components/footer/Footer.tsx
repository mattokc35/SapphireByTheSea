import React from "react";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
} from "@mui/icons-material"; // Import Material-UI icons
import { Box, Typography, Grid } from "@mui/material"; // Import Material-UI components

interface FooterContent {
  name: string;
  description: string;
  address: string;
  email: string;
  phone: string;
}

const Footer: React.FC = () => {
  const footerContent: FooterContent = {
    name: "Sapphire By The Sea",
    description: "Beach House Short Term Rental",
    address: "Crystal Beach, Bolivar Peninsula, Texas",
    email: "bdchen2008@gmail.com",
    phone: "(713)-598-4195",
  };

  return (
    <footer
      style={{ backgroundColor: "clear", padding: "20px", width: "100%" }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {footerContent.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
          {footerContent.description}
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: 1 }}
        >
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "5px 0",
              }}
            >
              <LocationOnIcon fontSize="small" sx={{ marginRight: 1 }} />
              <Typography variant="body2">
                Address: {footerContent.address}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "5px 0",
              }}
            >
              <EmailIcon fontSize="small" sx={{ marginRight: 1 }} />
              <Typography variant="body2">
                Email: {footerContent.email}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "5px 0",
              }}
            >
              <PhoneIcon fontSize="small" sx={{ marginRight: 1 }} />
              <Typography variant="body2">
                Phone: {footerContent.phone}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
};

export default Footer;
