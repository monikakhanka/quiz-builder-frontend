import React, { ReactNode } from "react";
import { Container } from "@mui/material";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {children}
    </Container>
  );
}
