import React from "react";
import { Box, Container, Typography, Button, Link as MuiLink } from "@mui/material";
import ContactForm from "@/components/forms/contact/ContactForm";

const ContactPage: React.FC = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: { xs: "1rem", md: "2rem" },
        marginTop: "55px",
      }}
    >
        <Box sx={{ margin: "auto", textAlign: "center", width: { xs: "100%", md: "60%" } }}>
        <Typography variant="h6" align="center" gutterBottom>
          Contact Us
        </Typography>
        <ContactForm />
      </Box>
    </Container>
  );
};

export default ContactPage;
