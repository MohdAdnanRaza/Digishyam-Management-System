import React from "react";
import { Container, Grid } from "@mui/material";

const IllustrationSection = () => (
  <Container maxWidth="lg" style={{ marginTop: "50px" }}>
    <Grid container spacing={3} justifyContent="center">
      {[1, 2, 3].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <img
            src="https://via.placeholder.com/200"
            alt="Icon"
            style={{ width: "60%", borderRadius: "10px" }}
          />
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default IllustrationSection;
