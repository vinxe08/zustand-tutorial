import Image from 'next/image'
import React from 'react'
import { motion , usePresence } from 'framer-motion'
import { Movie } from '../interface/Products'
import { base_url } from '../utils/requests'
import { dateManipulation } from '../utils/dateManipulation'

type Props = {
  movie: Movie
}

const MovieCard:React.FC<Props> =({movie}) => {
  const [isPresent, safeToRemove] = usePresence()
  console.log("MOVIE: ",movie)
  
  const animation = {
    // layout: true,
    // layoutId: movie.id.toString(),
    initial: "out",
    animate: isPresent ? "in" : "out",
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition: { duration: 0.5, ease: "easeInOut" },
    variants : {
      in: { scale: 1, transition:{duration: 0.3 }},
      out: { scale: 0, transition:{duration: 0.5, delay: 1 }}
    },
  }

  // TODO: FIX THE ANIMATION
  return (
    <motion.div 
      {...animation}   
      className='movieContainer'
      >
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
          <h1>{movie.release_date || movie.first_air_date ? dateManipulation(movie.release_date || movie.first_air_date) :  "🚀"}</h1>
        </div>
    </motion.div>
  )
}

export default MovieCard