import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function ConfirmationDialog({ open, title, message, onConfirm, onCancel }) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title || "Confirm Action"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message || "Are you sure you want to continue?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={onCancel} color="inherit">
          Cancel
        </Button> */}
        <Button onClick={onConfirm} color="error" variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
