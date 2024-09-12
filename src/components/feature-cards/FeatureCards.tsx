// src/components/FeatureCards.tsx
import React from "react";
import { Box, Grid, Typography } from "@mui/material";

// Define the feature type
interface Feature {
  label: string;
  icon: JSX.Element; // Use JSX.Element for icons
}

interface FeatureCardsProps {
  features: Feature[];
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ features }) => {
  return (
    <Grid container spacing={2} mt={2}>
      {features.map(({ label, icon }) => (
        <Grid item xs={12} sm={6} md={4} key={label}>
          <Box
            textAlign="center"
            sx={{
              padding: 3,
              borderRadius: 3,
              boxShadow: 4,
              backgroundColor: "#f0f4f8",
              minHeight:"175px",
              border: "1px solid #e0e0e0",
              transition: "transform 0.3s, box-shadow 0.3s, background-color 0.3s",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "1px 8px 30px rgba(13, 74, 154, 0.2)",
                backgroundColor: "rgba(13, 74, 154, 0.2)",
              },
            }}
          >
            <Box sx={{ fontSize: 48, color: "#0f52ba", mb: 1 }}>
              {icon}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              {label}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeatureCards;