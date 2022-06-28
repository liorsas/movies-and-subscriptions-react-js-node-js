import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";

export default function ErrorHandler({ isOpen, message }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      message={message}
    />
  );
}
