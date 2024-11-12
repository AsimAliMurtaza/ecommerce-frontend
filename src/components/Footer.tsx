import { Box, Container, Grid, Typography, Link, Stack } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      bgcolor="grey.100"
      py={{ xs: 4, sm: 8, md: 12 }}
      width="100%"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: { xs: "center", sm: "flex-start" },
          }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="primary" gutterBottom>
              Ecommerce
            </Typography>
            <Typography color="textSecondary" paragraph>
              Discover convenience redefined at our multipurpose store. You can
              find everything you need under one roof. Your one-stop shopping
              destination for a diverse range of products.
            </Typography>
            <Typography color="textSecondary">
              <strong>Address:</strong> 1234 Street Name, City, Country
            </Typography>
            <Typography color="textSecondary">
              <strong>Email:</strong> support@lalala.com
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Useful Links
            </Typography>
            <Stack spacing={1}>
              <Link href="/" color="textSecondary" underline="hover">
                Home
              </Link>
              <Link href="/" color="textSecondary" underline="hover">
                About
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Pages
            </Typography>
            <Stack spacing={1}>
              <Link href="/account" color="textSecondary" underline="hover">
                My Account
              </Link>
              <Link href="/cart" color="textSecondary" underline="hover">
                My Orders
              </Link>

              <Link href="/contact" color="textSecondary" underline="hover">
                Contact Us
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography color="textSecondary" paragraph>
              <strong>Hotline 24/7:</strong> +1-555-186-5359
            </Typography>
            <Typography color="textSecondary" paragraph>
              <strong>Email Address:</strong> support@lmao.com
            </Typography>
            <Typography variant="h6" gutterBottom>
              Download App:
            </Typography>
            <Link
              href="https://youtu.be/dQw4w9WgXcQ"
              color="primary"
              underline="hover"
            >
              Link to our android app
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
