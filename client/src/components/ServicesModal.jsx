// src/components/ServicesModal.js
import React from "react";
import { Modal, Typography } from "@mui/material";
import DropdownUI from "./DropdownUI/DropdownUI";

const ServicesModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="services-modal-title"
      aria-describedby="services-modal-description"
    >
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          width: "90%",
          height: "90%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          boxShadow: 24,
          borderRadius: "8px",
        }}
      >
        <Typography
          id="services-modal-title"
          variant="h6"
          style={{
            marginBottom: "10px",
            marginLeft: "40%",
            fontSize: "30px",
            fontFamily: "bold",
          }}
        >
          Services
        </Typography>
        <DropdownUI />
      </div>
    </Modal>
  );
};

export default ServicesModal;
