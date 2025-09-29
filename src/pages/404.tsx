import { Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";

export default function Page404() {
  const router = useRouter();

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The quiz you are looking for doesn’t exist.
      </Typography>
      <Button variant="contained" onClick={() => router.push("/")}>
        Go Home
      </Button>
    </Box>
  );
}
