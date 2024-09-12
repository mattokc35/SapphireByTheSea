import React from "react";
import { Container, Typography, Box } from "@mui/material";
import AmenitiesTable from "../../components/amenities-table/AmenitiesTable";

const AmenitiesPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ paddingY: 4, marginTop: "50px"}}>
      <Box
        sx={{
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        <Typography variant="h6" component="h1" gutterBottom>
          Property Amenities
        </Typography>
        <Typography variant="body1">
          Discover all the amenities our property has to offer.
        </Typography>
      </Box>
      <AmenitiesTable />
    </Container>
  );
};

export default AmenitiesPage;
