import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Product } from '../interface/Products'
import StarRatingComponent from "react-rating-stars-component";
import useShoppingStore from '../app/shoppingStore';

type List = {
  product: Product
}

const ShoppingList: React.FC<List> = ({product}) =>  {
  const [onCart, setOnCart] = useState<boolean>(false)
  const { cart, addToCart } = useShoppingStore((state) => ({
    addToCart: state.addToCart,
    cart: state.cart
  }))

  useEffect(() => {
    // Use to compare Mapped Array to Object with keys
    setOnCart(cart.map(c => c.id).includes(product.id))
  },[cart])

  return (
    <div className='flex flex-col hover:scale-110 transition ease-in-out'>
      <div className='bg-white p-4 lg:p-10'>
        <Image 
          src={product.image}
          alt="Product Image"
          width={300}
          height={400}
          priority
        />
      </div>
      <div className='pt-3 flex flex-col relative'>
        <h1 className='text-[0.9rem] font-bold text-gray-800'>$ {product.price}</h1>
        <div className='flex gap-2'>
          <StarRatingComponent
            name='stars'
            editing={false}
            value={product.rating.rate}
            starColor="#ffd700"
          />
          <h1 className='text-gray-600 font-bold text-sm'>{product.rating.count}</h1>
        </div>
        <div 
          onClick={() => addToCart(product)}
          className={`absolute right-2 cursor-pointer p-2 active:scale-90 rounded-full ${onCart ? 'bg-blue-500 text-white' : 'bg-white hover:text-white hover:bg-blue-500'} transition ease-in-out`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        </div>
      </div>
    </div>

  )
}

export default ShoppingList