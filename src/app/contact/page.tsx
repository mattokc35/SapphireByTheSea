import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import About from "@/components/about/About";
import ContactForm from "@/components/forms/contact/ContactForm";

const ContactPage: React.FC = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: { xs: "1rem", md: "2rem" },
        marginTop: "45px",
      }}
    >
      {/* About Section */}
      <Box
        sx={{
          padding: { xs: 2, md: 4 },
          margin: "auto",
          borderRadius: 2,
          boxShadow: 1,
          marginTop: "20px",
          bgcolor: "#ffffff",
          marginBottom: "15px",
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          About The Host
        </Typography>
        <About />
      </Box>

      {/* Contact Form Section */}
      <Paper
        elevation={6}
        sx={{
          padding: { xs: 3, md: 4 },
          margin: "auto",
          borderRadius: 2,
          width: { xs: "100%", md: "60%" }, // Adjust width based on screen size
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.03)",
          },
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <ContactForm />
        </Box>
      </Paper>
    </Container>
  );
};

export default ContactPage;
