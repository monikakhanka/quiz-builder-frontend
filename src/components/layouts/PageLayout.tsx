import { Box, Typography, Divider } from "@mui/material";
import { ReactNode } from "react";

type PageLayoutProps = {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
};

export default function PageLayout({ title, actions, children }: PageLayoutProps) {
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        <Box>{actions}</Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box>{children}</Box>
    </Box>
  );
}
