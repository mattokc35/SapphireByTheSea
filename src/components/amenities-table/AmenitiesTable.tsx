import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { amenitiesData } from "@/constants/constants";
import { iconMapping } from "./IconMapping";

const AmenitiesTable: React.FC = () => {
  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {Object.entries(amenitiesData).map(([category, amenities], index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              transition: "0.3s",
              borderRadius: "10px",
              "&:hover": {
                transform: "scale(1.01)",
                boxShadow: 5,
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 1, // Optional: Adds some space between the title and the amenities list
                }}
              >
                <Box sx={{ marginRight: 1 }}>{iconMapping[category]}</Box>
                <Typography variant="h6">{category}</Typography>
              </Box>
              {Array.isArray(amenities) ? (
                amenities.map((amenity, amenityIndex) => (
                  <Typography key={amenityIndex} variant="body2">
                    {amenity}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">{amenities}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AmenitiesTable;
