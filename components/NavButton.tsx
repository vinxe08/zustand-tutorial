import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  active: string
  navType: string
  selectCategory: (movieCategory:string, categoryID:number) => void
  categoryID: number
}

const NavButton:React.FC<Props> = ({active, navType, selectCategory, categoryID}) => {
  return (
    <div className='relative'>
      <button 
        onClick={() => selectCategory(navType, categoryID)}
        className={`text-[13px] md:text-[17px] font-roboto tracking-widest ${active === navType ? "text-blue-500" : "text-gray-400"} uppercase`}>
          {navType}
      </button>
      <motion.div 
        animate={{ y: active === navType ? 0 : 100, opacity: active === navType ? 1: 0 }}
        className={`h-[2px] ${active === navType ? "bg-blue-500" : "bg-transparent"} w-10 absolute top-8 left-[13px] md:h-[3px] md:w-14`}/>
    </div>
  )
}

export default NavButton