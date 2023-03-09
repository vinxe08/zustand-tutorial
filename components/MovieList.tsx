import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Movie } from '../interface/Products'
import { dateManipulation } from '../utils/dateManipulation'
import { base_url } from '../utils/requests'
import { AnimatePresence, motion } from 'framer-motion'
import Loading from './Loading'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

type Movies = {
  movies: Movie[],
  title: string,
  category: string
  handleSelectMovie: (categoryID: number) => void
}

const sentence = {
  hidden: (i = 1) => ({
    opacity: 0,
    y: -80,
    x: 50,
    scale: 0,
    transition: {
      delayChildren: 0.04 * i,
      staggerChildren: 0.12,
      delay:1
    }
  }),
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      delayChildren: 0.04 * i,
      staggerChildren: 0.12,
    }
  })
} 

const letter = {
  hidden: {
    opacity: 0, 
    y: -200, 
    transition: {
    type: "spring",
    damping: 12,
    stiffness: 100
  }},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
  }},
}

function MovieList({movies, title, category, handleSelectMovie}: Movies) {
  const [active, setActive] = useState<string>("Trending")
  const [showOthers, setShowOthers] = useState(false)

  // 
  const selectCategory = ( movieCategory: string, categoryID: number) => {
    let timer:any;
    setActive(movieCategory) // For active className

    clearTimeout(timer)
    timer = setTimeout(() => {
      handleSelectMovie(categoryID)
    }, 1000)
    
  }

  console.log("LOGS")

  if(!movies) return <Loading />

  return (
    <div className='text-white bg-gray-900 flex flex-col w-full space-y-10'>
      <div className='flex w-full p-6 pb-2'>
        <div className='flex items-center space-x-2 flex-1 mr-8'>
          <h1 className='bg-[#ffffff8f] h-[2px] w-10 rounded-full md:h-[4px] md:w-[4rem]'/>
          <h1 className='font-roboto tracking-wider md:text-2xl'>MOVIES</h1>
        </div>
        <div className='space-x-5 flex'>
          <div className='relative'>
            <button 
              onClick={() => selectCategory("Trending", 1)}
              className={`text-[13px] md:text-[17px] font-roboto tracking-widest ${active === "Trending" ? "text-blue-500" : "text-gray-400"} uppercase`}>
              Trending
            </button>
            <motion.div 
              animate={{ y: active === "Trending" ? 0 : 100, opacity: active === "Trending" ? 1: 0 }}
              className={`h-[2px] ${active === "Trending" ? "bg-blue-500" : "bg-transparent"} w-10 absolute top-8 left-[13px] md:h-[3px] md:w-14`}/>
          </div>

          <div className='relative'>
            <button 
              onClick={() => selectCategory("Originals", 2)}
              className={`text-[13px] md:text-[17px] font-roboto tracking-widest ${active === "Originals" ? "text-blue-500" : "text-gray-400"} uppercase`}>
              Originals
            </button>
            <motion.div 
              animate={{ y: active === "Originals" ? 0 : 100, opacity: active === "Originals" ? 1: 0 }}
              className={`h-[2px] ${active === "Originals" ? "bg-blue-500" : "bg-transparent"} w-10 absolute top-8 left-[13px]`}/>
          </div>

          <div className='relative'>
            <button 
              onClick={() => selectCategory("Top Rated", 3)}
              className={`text-[13px] md:text-[17px] font-roboto tracking-widest ${active === "Top Rated" ? "text-blue-500" : "text-gray-400"} uppercase`}>
              Top Rated
            </button>
            <motion.div
              animate={{ y: active === "Top Rated" ? 0 : 100, opacity: active === "Top Rated" ? 1: 0 }}
              className={`h-[2px] ${active === "Top Rated" ? "bg-blue-500" : "bg-transparent"} w-10 absolute top-8 left-[13px]`}/>
          </div>
          
        </div>
        <div className='flex-1 flex justify-end'>
          <button  
            onClick={() => setShowOthers(!showOthers)}
            className='flex items-center border border-gray-400 md:border-2 rounded-full p-1 md:px-2 md:space-x-1 text-gray-400 cursor-pointer relative hover:text-white hover:border-white transition ease-in-out '>

            <h1 className='text-[13px] md:text-[17px] font-roboto hidden md:flex tracking-widest'>OTHERS</h1>
            <ChevronDownIcon className={`h-4 w-4 transition ease-in-out duration-500 ${showOthers ? "rotate-[-180deg]" : "rotate-[0deg]"}`}/> 

            <AnimatePresence>
            {showOthers ? 
            <motion.div
              variants={sentence}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className='absolute flex flex-col top-[30px] left-[-120px] md:left-[-60px] space-y-2 z-30 bg-gray-300 p-2 rounded-lg overflow-hidden'>
                {["Action", "Comedy", "Horror", "Romance", "Documentaries"].map((title, index) => (
                  <motion.button 
                    onClick={() => selectCategory(title, index + 3)}
                    variants={letter}
                    whileTap={{ scale: 0.8}}
                    key={index} 
                    className={`text-[13px] font-golos ${active === title ? "bg-blue-600 text-gray-100" : "text-gray-600"} p-1 px-2 rounded-full  transition ease-in-out tracking-wider uppercase hover:bg-blue-600 hover:text-gray-100`}>{title}</motion.button>
                ))}
            </motion.div>: null}
            </AnimatePresence> 
          </button>
        </div>
      </div>

      <div className='grid grid-cols-3 md:grid-cols-4 gap-5 lg:gap-6 xl:gap-14 pt-0 pb-6 px-6'>
        { movies.map(movie => (
          <Link  key={movie.id} href={`/${category}/${movie.id}`}>
          <div className='flex flex-col text-center cursor-pointer hover:shadow-sm hover:shadow-gray-300 hover:scale-110 active:scale-90 transition ease-in-out space-y-2'>
              <Image 
                src={`${base_url}${movie.poster_path}`}
                layout="responsive"
                height={65}
                width={50}
                className="rounded-sm mb-2"
              />
            <h1 className='text-center font-roboto px-2 text-gray-200 text-sm md:text-base lg:text-xl tracking-wider'>{movie.name || movie.title}</h1>
            <div className='w-full flex space-x-1 items-center justify-center text-gray-500 uppercase text-xs md:text-base lg:text-lg font-golos tracking-wide'>
              <h1>{movie.media_type}</h1>
              <span>|</span>
              <h1>{movie.original_language.toUpperCase()}</h1>
              <span>|</span>
              <h1>{dateManipulation(movie.release_date || movie.first_air_date) || "🚀"}</h1>
            </div>
          </div>
          </Link>
        )) }
      </div>
    </div>
  )
}

export default MovieList