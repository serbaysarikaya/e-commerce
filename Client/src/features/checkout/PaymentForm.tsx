import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("cardname", {
            required: "card name is required",
          })}
          label="Enter card name"
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.cardname}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("cardnumber", {
            required: "cart number is required",
          })}
          label="Enter card number"
          fullWidth
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.cardnumber}
        />
      </Grid2>

      <Grid2 size={{ xs: 6, md: 4 }}>
        <TextField
          {...register("cardexpiremounth", {
            required: "expiry mounth is required",
          })}
          label="Enter expiry mounth"
          fullWidth
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.cardexpiremounth}
        />
      </Grid2>
      <Grid2 size={{ xs: 6, md: 4 }}>
        <TextField
          {...register("cardexpireyear", {
            required: "expiry year is required",
          })}
          label="Enter expiry year"
          fullWidth
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.cardexpireyear}
        />
      </Grid2>

      <Grid2 size={{ xs: 12, md: 4 }}>
        <TextField
          {...register("cardcvc", {
            required: "Cvv is required",
          })}
          label="Enter cvv"
          fullWidth
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.cardcvc}
        />
      </Grid2>
 
    </Grid2>
  );
}
