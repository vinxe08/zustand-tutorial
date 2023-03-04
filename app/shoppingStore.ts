import create from "zustand";
import { persist } from 'zustand/middleware'
import { Product } from '../interface/Products'

type Store = {
  cart: Product[];
  addToCart:(product: Product) => void; // function
  loading: boolean;
  products: Product[] | any
}

const option = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '7f53764bcamsh306fda44cb595ddp1029eajsn69c7a67183a3',
    'X-RapidAPI-Host': 'nike-products.p.rapidapi.com'
  }
}

const useShoppingStore = create(
  persist<Store>(
    (set, get) => ({
      loading: false,
      products: [],
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
      },
      fetchProducts: async () => {
        const response = await fetch('https://nike-products.p.rapidapi.com/shoes', option).then(response => response.json()) .catch(err => console.error(err));
        set({ loading: false, products: response.data})
      }
    }), 
    { name: 'products'}
  )
)

export default useShoppingStore;