import { Button, ButtonGroup, Typography } from "@mui/material";
import { decrement, increment, incrementByAmount } from "./counterSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";


export default function Counter() {
    const count = useAppSelector((state) => state.counter.value); 
    const dispatch = useAppDispatch();

  return (
    <>
      <Typography variant="h4">{count}</Typography>
      <ButtonGroup>
        <Button onClick={() => dispatch(increment())}>Increment</Button>  
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>  
        <Button onClick={() => dispatch(incrementByAmount(5))}>Increment By 5</Button>  
      </ButtonGroup>
    </>
  );
}