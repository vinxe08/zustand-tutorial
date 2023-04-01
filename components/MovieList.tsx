import Link from 'next/link'
import React, { useState } from 'react'
import { Movie } from '../interface/Products'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import Loading from './Loading'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import NavButton from './NavButton'
import { container, letter, sentence } from './AnimationVariant'
import MovieCard from './MovieCard'

type Movies = {
  movies: Movie[],
  title: string,
  category: string
  handleSelectMovie: (categoryID: number) => void
}

function MovieList({movies, title, category, handleSelectMovie}: Movies) {
  const [active, setActive] = useState<string>("Trending")
  const [showOthers, setShowOthers] = useState(false)

  // 
  const selectCategory = ( movieCategory: string, categoryID: number) => {
    setActive(movieCategory) // For active className
    handleSelectMovie(categoryID)
  }

  console.log("LOGS")

  if(!movies) return <Loading />

  return (
    <div className='text-white bg-gray-900 flex flex-col w-full space-y-10 relative'>
      {/* NAV BAR */}
      <div className='flex w-full p-6 pb-2 sticky top-0 left-0 z-10 bg-gray-900'>
        <div className='flex items-center space-x-2 flex-1 mr-8'>
          <h1 className='bg-[#ffffff8f] h-[2px] w-10 rounded-full md:h-[4px] md:w-[4rem]'/>
          <h1 className='font-roboto tracking-wider md:text-2xl'>MOVIES</h1>
        </div>
        <div className='space-x-5 flex'>
          {/* TRENDING BUTTON */}
          <NavButton active={active} navType='Trending' selectCategory={selectCategory} categoryID={1}/>

          {/* ORIGINALS BUTTON */}
          <NavButton active={active} navType='Originals' selectCategory={selectCategory} categoryID={2}/>

          {/* TOP RATED BUTTON */}
          <NavButton active={active} navType='Top Rated' selectCategory={selectCategory} categoryID={3}/>

        </div>
        {/* OTHERS BUTTON */}
        <div className='flex-1 flex justify-end'>
          <button  
            onClick={() => setShowOthers(!showOthers)}
            className='othersButton'>
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
                    onClick={() => selectCategory(title, index + 4)}
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

      {/* CONTENT PAGE */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className='grid grid-cols-3 md:grid-cols-4 gap-5 lg:gap-6 xl:gap-14 pt-0 pb-6 px-6'>
        <LayoutGroup>
          <AnimatePresence >
          { movies.map(movie => (
            <Link  key={movie.id} href={`/${category}/${movie.id}`}>
              <MovieCard movie={movie}/>
            </Link>
          ))}
        </AnimatePresence>
        </LayoutGroup>
      </motion.div>
    </div>
  )
}

export default MovieList