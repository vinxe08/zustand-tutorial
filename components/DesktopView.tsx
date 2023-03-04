import { PlayIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Movie } from '../interface/Products'
import { base_url } from '../utils/requests'
import { motion } from 'framer-motion'
import { Rating } from 'react-simple-star-rating'
import { starManipulation } from '../utils/starManipulation'
import { dateManipulation } from '../utils/dateManipulation'

type Props = {
  movie: Movie
  handleOnPlay: () => void
}
function DesktopView({movie, handleOnPlay}: Props) {
  console.log(movie)
  
  
  return (
    <div className='hidden md:flex h-screen p-10 '>
      {/* Left Part */}
      <div className='flex-1 flex items-end justify-end'>

        <div className='h-full w-[23rem] relative'>
          <div className='absolute top-0 left-[-30px] z-10 bg-blue-500 text-white p-4 rounded-sm'>
            <h1 className='font-roboto tracking-wider'>{movie.first_air_date || movie.release_date}</h1>
          </div>
          <Image 
            src={`${base_url}${movie.poster_path}`}
            layout='fill' 
            objectFit='fill'
            priority
            alt="" />
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOnPlay}
            className='absolute bottom-10 right-[-30px] z-10 text-white bg-blue-500 p-2 rounded-sm'
          >
            <PlayIcon className='h-14 w-14' />
          </motion.button>
        </div>

      </div>

      {/* RIGHT */}
      <div className='flex-1 flex flex-col pl-8 space-y-5'>
        <h1 className='font-roboto text-4xl text-gray-900'>{movie.title || movie.name}</h1>
        <div className='flex space-x-4 font-roboto uppercase text-gray-300'>
          <h1>{movie.media_type || "🚀"}</h1>
          <h1>/</h1>
          <h1>{movie.origin_country || "🚀"}</h1>
          <h1>/</h1>
          <h1>{dateManipulation(movie.release_date || movie.first_air_date) || "🚀"}</h1>
          <h1>/</h1>
          <h1>{movie.original_language || "🚀"}</h1>
        </div>
        <div className='flex items-center text-center space-x-3'>
          <Rating 
            disableFillHover
            readonly
            iconsCount={5}
            initialValue={starManipulation(movie.vote_average)}
            allowFraction
            size={30}
          />
          <h1 className='text-gray-500 font-roboto'>{movie.vote_count} VOTE</h1>
        </div>
        <div className='border-b max-w-[20rem]'/>
        <h1 className='font-roboto text-4xl text-gray-900'>Overview</h1>
        <p className='text-gray-500 text-justify max-w-[20rem]'>{movie.overview}</p>
        <div></div>
      </div>
    </div>
  )
}

export default DesktopView