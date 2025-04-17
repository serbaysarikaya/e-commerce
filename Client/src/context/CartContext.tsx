import { createContext, PropsWithChildren, useContext, useState } from "react";
import { ICart } from "../model/ICart";

interface ICartContextValue {
  cart: ICart | null;
  setCart: (cart: ICart) => void;
}

export const CartContext = createContext<ICartContextValue | undefined>(
  undefined
);

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("no provider");
  }
  return context;
}

export function CartContextProvider({ children }: PropsWithChildren<any>) {
  const [cart, setCart] = useState<ICart | null>(null);



  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
