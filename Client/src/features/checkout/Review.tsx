import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import PaymentsIcon from "@mui/icons-material/Payments";
import { Divider, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function Review() {
  const { getValues } = useFormContext();

  return (
    <Stack spacing={2} sx={{ mb: 3 }}>
      <Stack
        direction="column"
        divider={<Divider />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", mb: 2 }}
          >
            <DeliveryDiningIcon color="secondary" sx={{ mr: 2 }} /> Teslimat
            Bilgileri
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {getValues("firstname")} {getValues("lastname")}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
          
            {getValues("phone")}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {getValues("addressline")} / {getValues("city")}
          </Typography>
        </div>
        <div>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", mb: 2 }}
          >
            <PaymentsIcon color="secondary" sx={{ mr: 2 }} /> Ödeme bilgileri
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {getValues("cardname")}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {getValues("cardnumber")}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {getValues("cardexpiremounth")}/{getValues("cardexpireyear")}
          </Typography>
        </div>
      </Stack>
    </Stack>
  );
}
