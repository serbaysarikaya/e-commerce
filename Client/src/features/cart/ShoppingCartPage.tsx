import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Alert,
  Box,
} from "@mui/material";
import {
  AddCircleOutline,
  Delete,
  RemoveCircleOutline,
} from "@mui/icons-material";



import { addItemToCart, deleteItemFromCart } from "./cartSlice";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../store/store";
import CartSummary from "./CartSummary";
import { Link } from "react-router";

export default function ShoppingCartPage() {
  const { cart, status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (!cart||cart?.cartItems.length === 0)
    return <Alert severity="warning">Sepetiniz de ürün yok!</Alert>;

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right">Fiyat</TableCell>
            <TableCell align="right">Adet</TableCell>
            <TableCell align="right">Toplam</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.cartItems.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img
                  src={`http://localhost:5044/images/${item.imageUrl}`}
                  style={{ height: 60 }}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">
                {currencyTRY.format(item.price)}
              </TableCell>
              <TableCell align="right">
                <Button
                  loading={status === "pendingAddItem" + item.productId}
                  onClick={() =>
                    dispatch(addItemToCart({ productId: item.productId }))
                  }
                >
                  <AddCircleOutline />
                </Button>
                {item.quantity} Adet
                <Button
                  loading={
                    status === "pendingDeleteItem" + item.productId + "sinlge"
                  }
                  onClick={() =>
                    dispatch(
                      deleteItemFromCart({
                        productId: item.productId,
                        quantity: 1,
                        key: "sinlge",
                      })
                    )
                  }
                >
                  <RemoveCircleOutline />
                </Button>
              </TableCell>
              <TableCell align="right">
                {currencyTRY.format(item.price * item.quantity)}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  color="error"
                  loading={
                    status === "pendingDeleteItem" + item.productId + "all"
                  }
                  onClick={() => {
                    dispatch(
                      deleteItemFromCart({
                        productId: item.productId,
                        quantity: item.quantity,
                        key: "all",
                      })
                    );
                  }}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {/* CartSummary */}
          <CartSummary />
        </TableBody>
      </Table>
    </TableContainer>
    <Box display="flex" justifyContent="flex-end" sx={{mt:3}} >
      <Button component={Link} to={"/checkout"} variant="contained" color="primary">Checkout</Button>
    </Box>
    </>
  );
}
