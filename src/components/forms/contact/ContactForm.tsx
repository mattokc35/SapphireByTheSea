"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Box, Button, TextField, Typography } from "@mui/material";
import ValidationText from "@/components/validation-text/ValidationText";

const ContactForm: React.FC = () => {
  const [isContactSubmitted, setIsContactSubmitted] = useState<
    boolean | undefined
  >(undefined);
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_2!,
        form.current!,
        process.env.NEXT_PUBLIC_EMAIL_JS_KEY!
      )
      .then(
        (result: any) => {
          setIsContactSubmitted(true);
        },
        (error) => {
          setIsContactSubmitted(false);
        }
      );
  };

  return (
    <Box sx={{ padding: 4, bgcolor: "#ffffff", borderRadius: 2, boxShadow: 0 }}>
      <Typography variant="h6" gutterBottom>
        Question or comment? Contact us below...
      </Typography>
      <form ref={form} onSubmit={handleSubmit}>
        <TextField
          required
          label="Guest Name"
          name="user_name"
          fullWidth
          margin="normal"
        />
        <TextField
          required
          label="Email Address"
          name="user_email"
          type="email"
          fullWidth
          margin="normal"
          helperText="We'll never share your email with anyone else."
        />
        <TextField
          required
          label="Questions/Comments/Phone Number"
          name="message"
          multiline
          rows={3}
          fullWidth
          margin="normal"
        />
        <Button
          className="contactSubmitButton"
          type="submit"
          variant="contained"
                sx={{
                  backgroundColor: "#0f52ba", // Change button color here
                  borderRadius: 10,
                  minWidth:100,
                  "&:hover": {
                    backgroundColor: "#0d4a9a", // Optional: Change hover color
                  },
                }}
        >
          Submit
        </Button>
        <ValidationText
          isValid={isContactSubmitted}
          validationText={
            "Contact form successfully submitted! We will get back to you soon."
          }
          errorText={"Error sending contact form. Please try again."}
        />
      </form>
    </Box>
  );
};

export default ContactForm;
