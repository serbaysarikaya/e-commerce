import { Container, Divider, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {
    const {state} = useLocation();

  return(
    <Container>
         { state?.error ?(
            <>
             <Typography variant="h3" gutterBottom>{state.error.title} - {state.status}</Typography>
             <Divider/>
             <Typography variant="body2" >{state.error.detail || "unknown error"}</Typography>
             </>
         ):(
            <Typography variant="h4"> Server error</Typography>
         )
           
        }
    </Container>
  )
}
