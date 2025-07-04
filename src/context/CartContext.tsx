import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface RoomConfiguration {
  roomType: string;
  price: number;
  numberOfBeds: number;
  bedType: string;
  maxPeople: number;
}

interface Room {
  _id: string;
  title: string;
  roomNumber: string;
  description: string;
  amenities: string[];
  configurations: RoomConfiguration[];
  pictures: string[];
  frontViewPicture: string;
  status: string;
  starRating: number;
  createdAt?: string;
}

interface CartItem extends Room {
  selectedConfiguration: RoomConfiguration;
}

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (roomId: string, roomType: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize cart from localStorage or empty
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  // Sync cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item only if combination of _id and selectedConfiguration.roomType does not exist
  const addToCart = (item: CartItem) => {
    const exists = cart.some(
      (cartItem) =>
        cartItem._id === item._id &&
        cartItem.selectedConfiguration.roomType === item.selectedConfiguration.roomType
    );
    if (!exists) {
      setCart([...cart, item]);
    }
  };

  // Remove by room id and configuration roomType
  const removeFromCart = (roomId: string, roomType: string) => {
    setCart(
      cart.filter(
        (item) =>
          !(item._id === roomId && item.selectedConfiguration.roomType === roomType)
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
