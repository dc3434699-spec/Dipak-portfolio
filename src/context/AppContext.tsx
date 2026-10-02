import React, { createContext, useContext, useReducer, useCallback, useRef } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  unit: string;
  qty: number;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppState {
  cart: CartItem[];
  toasts: Toast[];
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  showToast: (message: string, type: Toast['type']) => void;
  dismissToast: (id: string) => void;
}

type Action =
  | { type: 'ADD_TO_CART'; payload: Omit<CartItem, 'qty'> }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QTY'; payload: { id: number; qty: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TOAST'; payload: Toast }
  | { type: 'DISMISS_TOAST'; payload: string };

interface State {
  cart: CartItem[];
  toasts: Toast[];
}

const initialState: State = {
  cart: [],
  toasts: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((i) => i.id !== action.payload) };
    case 'UPDATE_QTY':
      if (action.payload.qty <= 0) {
        return { ...state, cart: state.cart.filter((i) => i.id !== action.payload.id) };
      }
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.payload] };
    case 'DISMISS_TOAST':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.payload) };
    default:
      return state;
  }
}

const AppContext = createContext<AppState | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toastTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const addToCart = useCallback((item: Omit<CartItem, 'qty'>) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  }, []);

  const updateQty = useCallback((id: number, qty: number) => {
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const dismissToast = useCallback((id: string) => {
    dispatch({ type: 'DISMISS_TOAST', payload: id });
    const timer = toastTimers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      toastTimers.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (message: string, type: Toast['type']) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      dispatch({ type: 'ADD_TOAST', payload: { id, message, type } });
      const timer = setTimeout(() => {
        dispatch({ type: 'DISMISS_TOAST', payload: id });
        toastTimers.current.delete(id);
      }, 3500);
      toastTimers.current.set(id, timer);
    },
    []
  );

  return (
    <AppContext.Provider
      value={{
        cart: state.cart,
        toasts: state.toasts,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
