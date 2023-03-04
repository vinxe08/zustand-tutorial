import React, { useEffect, useState } from 'react'
import { Movie } from '../interface/Products'
import { AnimatePresence, motion } from "framer-motion"
import { useMediaQuery } from 'react-responsive'
import { ArrowTopRightOnSquareIcon, Bars3Icon, PlayIcon } from '@heroicons/react/24/solid'
import { PlayIcon as PlayOutlineIcon, PlayCircleIcon, HeartIcon, StarIcon, UserGroupIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { truncate } from '../utils/truncate'
import { base_url } from '../utils/requests'
import Link from 'next/link'
import GetMovies from './GetMovies'

type Props = {
  movie: Movie
}

const Banner: React.FC<Props> = ({movie}) => {
  // For Animation
  const mdSize = useMediaQuery({ query: '(min-width: 568px)' })
  const [mdQuery, setMdQuery] = useState<boolean | null>(false)
  const [smQuery, setSmQuery] = useState<boolean | null>(false)

  const [onPlay, setOnPlay] = useState(false)
  // console.log("MOVIE: ", movie)

  const handleOnPlay = () => {
    setOnPlay(!onPlay)
  }

  useEffect(() => {
    let timer:any;
    if(mdSize){
      setSmQuery(false)
      timer = setTimeout(() => setMdQuery(true), 1000)
    } else{
      setMdQuery(false)
      timer = setTimeout(() => setSmQuery(true), 1000);
    }

    return () => {
      clearTimeout(timer)
    }
    
  },[mdSize])

  return (
    <div className='h-screen relative flex justify-start overflow-hidden'>
      {/* BACKGROUND IMAGE */}
      <img 
        className='h-screen w-screen object-cover object-top -z-10 absolute'
        src={`${base_url}${movie.backdrop_path}`} 
        alt="Banner Logo" />

      {/* OVERLAY */}
      <div className='flex h-screen w-screen bg-gradient-to-b from-transparent via-transparent to-[#17253a] -z-10 absolute bottom-0' />

      {/* MINI CARD */}
  
      <AnimatePresence>
      { smQuery ? <motion.div 
        // {...animation}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1 , scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className='h-[30rem] w-screen flex flex-col items-start justify-end space-y-4 p-10 self-end'
        >
          <div className='text-white text-xl font-semibold flex items-center space-x-5 tracking-widest'>
            <h1 className='tracking-wider text-gray-900 p-2 bg-gradient-to-tl from-[#fa70ff] via-[#e1eff3] to-[#52d7ff] rounded-sm font-bold'>{movie.first_air_date || movie.release_date}</h1>
            <h1 className='text-4xl'>🚀</h1>
            <h1 className='uppercase font-bold text-4xl'>{movie.media_type}</h1>
          </div>

          <h1 className='font-roboto mb-10 text-6xl text-gray-100'>
            {truncate(movie?.title || movie?.name, 30 )}
          </h1>
          <Link href={`/trending/${movie.id}`}>
            <div className='cursor-pointer transition ease-in-out flex items-center space-x-2  text-white bg-[#d84949c0] rounded-sm p-2 hover:scale-105 hover:bg-[#f74040]'>
              <PlayIcon className="h-10 w-10 "/>
              {/* <h1 className='text-xl font-bold tracking-widest'>Watch Trailer</h1> */}
            </div>
          </Link>
      </motion.div> : null }

      {/* Large */}
      {mdQuery ?
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1 , scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className='h-screen w-screen flex flex-col items-start justify-end p-10 space-y-5'>
          {/* TITLE */}
          <h1 className='text-white font-roboto text-6xl'>{movie?.title || movie?.name}</h1>

          <div className='flex w-full items-end space-x-10'>
            <div 
              onClick={handleOnPlay}
              className='hover:scale-110 hover:text-[#ff5a76] text-white flex items-center space-x-2 -ml-1 cursor-pointer transition ease-in-out'>
              <PlayCircleIcon className="h-7 w-7 text-[#f5294b] "/>
              <h1 className='font-semibold text-sm'>
                Watch trailer
              </h1>
            </div>
            <div className='hover:scale-110 hover:text-[#49ff9b] text-white flex items-center space-x-2 cursor-pointer transition ease-in-out'>
              <PlusCircleIcon className="h-7 w-7 text-[#49ff9b]"/>
              <h1 className='font-semibold text-sm '>Add to favorites</h1>
            </div>
            <div className='flex-grow flex justify-end cursor-pointer overflow-hidden p-2'>
              <Bars3Icon className="h-20 w-20 text-white hover:scale-150 hover:text-[#82edf5] transition ease-in-out rounded-full "/>
            </div>
          </div>

          <div className='bg-[#c2bfbf34] h-1 w-full rounded-lg'/>

          <div className='flex space-x-12'>
            <div className='flex items-center justify-center space-x-2'>
              <StarIcon className="h-7 w-7 text-[#fcea4ae5] hover:scale-150 transition ease-in-out cursor-pointer"/>
              <h1 className='text-white font-roboto tracking-widest'>{movie.vote_average}</h1>
            </div>
            <div className='flex items-center justify-center space-x-2'>
              <UserGroupIcon className="h-7 w-7 text-[#2cc3ffe5] hover:scale-150 transition ease-in-out cursor-pointer"/>
              <h1 className='text-white font-roboto tracking-widest'>{movie.vote_count}</h1>
            </div>
            <div className='flex items-center justify-center space-x-2'>
              <HeartIcon className="h-7 w-7 text-[#ff6b8be5] hover:scale-150 transition ease-in-out cursor-pointer"/>
              <h1 className='text-white font-roboto tracking-widest'>{movie.popularity}</h1>
            </div>
          </div>
        </motion.div>
        : null}

      </AnimatePresence>
      
      {onPlay ? <GetMovies currentMovie={movie} handleOnPlay={handleOnPlay} /> : null}
      
    </div>
  )
}

export default Banner