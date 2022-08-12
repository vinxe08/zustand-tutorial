import create from "zustand";
import { persist } from 'zustand/middleware'
import { Product } from '../interface/Products'

type Store = {
  cart: Product[];
  addToCart:(product: Product) => void; // function
}

const useShoppingStore = create(
  persist<Store>(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        if(get().cart.map(c => c.id).includes(product.id)){
          // Holds filtered Data
          const filtered = get().cart.filter(c => c.id !== product.id)
          set(() => ({
            cart:filtered
          }))
        } else {
          set((state) => ({
            cart: [...state.cart, product]
          }))
        }
      }
    }), 
    { name: 'products'}
  )
)

export default useShoppingStore;