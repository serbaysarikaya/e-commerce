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
import { useNavigate } from "react-router";
import requests from "../../api/requests";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
    mode:"onTouched"
  });

  async function submitForm(data: FieldValues) {
    requests.Account.register(data)
      .then(() => {
        toast.success("user created");
        navigate("/login");
      })
      .catch((result) => {
        const { data: errors } = result;

        errors.forEach((error: any) => {
          if (error.code == "DuplicateUserName") {
            setError("username", { message: error.description });
          } else if (error.code == "DuplicateEmail") {
            setError("email", { message: error.description });
          }
        });
      });
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
              minLength: {
                value: 6,
                message: "Min leng is 6 characters",
              },
            })}
            label="Enter username"
            fullWidth
            autoFocus
            sx={{ mb: 2 }}
            size="small"
            autoComplete="username"
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            {...register("name", {
              required: "name is required",
              minLength: {
                value: 6,
                message: "Min leng is 6 characters",
              },
            })}
            label="Enter name"
            fullWidth
            sx={{ mb: 2 }}
            size="small"
            autoComplete="name"
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            {...register("email", {
              required: "email is required",
              pattern:{
                value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message:"email is not valid"
                
              }
            })}
            label="Enter email"
            fullWidth
            sx={{ mb: 2 }}
            size="small"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email?.message}
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
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
