import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IOrder } from "../../model/IOrder";
import requests from "../../api/requests";
import { currencyTRY } from "../../utils/formatCurrency";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CloseIcon from "@mui/icons-material/Close";

const orderStatus = ["Pending", "Approved", "PaymentFailed", "Completed"];

export default function OrderList() {
  const [orders, setOrders] = useState<IOrder[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectorOrder, setSelectorOrder] = useState<IOrder | null>(null);

  const subTotal =
    selectorOrder?.orderItems.reduce(
      (toplam, item) => toplam + item.quantity * item.price,
      0
    ) ?? 0;

  const tax = subTotal * 0.2;
  const total = subTotal + tax;

  const [open, setOpen] = useState(false);

  function handleDialogOpen(order: IOrder) {
    setOpen(true);
    setSelectorOrder(order);
  }
  function handleDialogClose() {
    setOpen(false);
    setSelectorOrder(null);
  }

  useEffect(() => {
    requests.Order.getOrders()
      .then((orders) => setOrders(orders))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {orderStatus[order.orderStatus]}
                </TableCell>
                <TableCell component="th" scope="row">
                  {new Date(order.orderDate).toLocaleString()}
                </TableCell>
                <TableCell component="th" scope="row">
                  {currencyTRY.format(order.subTotal)}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ width: 100 }}>
                  <Button
                    size="small"
                    variant="contained"
                    endIcon={<ArrowRightIcon />}
                    onClick={() => handleDialogOpen(order)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        onClose={handleDialogClose}
        open={open}
        fullWidth
        maxWidth="lg"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Spariş No :#{selectorOrder?.id}</DialogTitle>
        <IconButton
          onClick={handleDialogClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Teslimat Bilgileri{" "}
            </Typography>
            <Typography gutterBottom>
              {selectorOrder?.firstName} {selectorOrder?.lastName}
            </Typography>
            <Typography gutterBottom> {selectorOrder?.phone}</Typography>
            <Typography gutterBottom>
              {selectorOrder?.addressLine} / {selectorOrder?.city}
            </Typography>
          </Paper>
          <TableContainer component={Paper}>
            <Table>
              <TableHead id="alert-dialog-title">
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">Fiyat</TableCell>
                  <TableCell align="right">Adet</TableCell>
                  <TableCell align="right"> Toplam</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectorOrder?.orderItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img
                        src={`http://localhost:5044/images/${item.productImage}`}
                        style={{ height: 60 }}
                      />
                    </TableCell>
                    <TableCell align="right">{item.productName}</TableCell>
                    <TableCell align="right">
                      {currencyTRY.format(item.price)}
                    </TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">
                      {currencyTRY.format(item.price * item.quantity)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell align="right" colSpan={4}>
                    AraToplam
                  </TableCell>
                  <TableCell align="right" colSpan={4}>
                    {currencyTRY.format(subTotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" colSpan={4}>
                    Vegri
                  </TableCell>
                  <TableCell align="right" colSpan={4}>
                    {currencyTRY.format(tax)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" colSpan={4}>
                    Toplam
                  </TableCell>
                  <TableCell align="right" colSpan={4}>
                    {currencyTRY.format(total)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDialogClose}>
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
