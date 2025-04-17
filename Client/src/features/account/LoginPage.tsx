import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/store";
import { loginUser } from "./accountSlice";
import { useLocation, useNavigate } from "react-router";
import { getCart } from "../cart/cartSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function submitForm(data: FieldValues) {
    await dispatch(loginUser(data));
    await dispatch(getCart());
    navigate(location.state?.from || "/catalog");
  }

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ marginTop: 8, padding: 2 }}>
        <Avatar
          sx={{
            mx: "auto",
            color: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
          noValidate
          sx={{ mt: 2 }}
        >
          <TextField
            {...register("username", {
              required: "username is required",
            })}
            label="Enter username"
            fullWidth
            required
            autoFocus
            sx={{ mb: 2 }}
            size="small"
            autoComplete="username"
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "min leng 6 characters",
              },
            })}
            label="Enter password"
            type="password"
            fullWidth
            required
            sx={{ mb: 2 }}
            size="small"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            loading={isSubmitting}
            type="submit"
            variant="contained"
            fullWidth
            disabled={!isValid}
            sx={{ mt: 1 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
