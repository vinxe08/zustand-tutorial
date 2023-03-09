import React, { useEffect, useState } from 'react'
import { Movie } from '../interface/Products'
import { AnimatePresence, motion } from "framer-motion"
import { useMediaQuery } from 'react-responsive'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { PlayCircleIcon, HeartIcon, StarIcon, UserGroupIcon, PlusCircleIcon, LightBulbIcon } from '@heroicons/react/24/outline'
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

      {/* Small Size */}
      <AnimatePresence>
      { smQuery ? <motion.div 
        // {...animation}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1 , scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className='h-[30rem] w-screen flex flex-col items-start justify-end space-y-4 p-10 self-end'
        >
          <div className={`flex items-center justify-center space-x-2 absolute ${movie.media_type === "movie" ? "bottom-[7.9rem] left-[-73px]" : "bottom-[6.8rem] left-[-55px]"} rotate-[270deg]`}>
            <div className='bg-[#ffffff8f] h-[2px] w-14 rounded-full'/>
            <h1 className='font-golos tracking-wide text-gray-300 text-lg uppercase'>{movie.media_type}</h1>
            <h1 className='bg-[#ffffff8f] h-[2px] w-14 rounded-full'/>
          </div>

          <h1 className='font-roboto text-white text-6xl uppercase'>{movie.title || movie.name}</h1>

          <p className='text-gray-300 font-golos text-xs'>{truncate(movie.overview, 250)}</p>

          <div className='flex w-full items-center space-x-5'>
            <h1 className='text-gray-200 font-roboto flex-1'>{movie.first_air_date || movie.release_date}</h1>

            <div 
              onClick={handleOnPlay}
              className='flex items-center cursor-pointer outline outline-1 text-gray-200 outline-gray-400 rounded-full p-1 px-[6px] space-x-2 hover:bg-blue-600 hover:outline-none hover:scale-110 active:scale-90 transition ease-in-out'>
              <PlayCircleIcon className='h-5 w-5 '/>
              <button className='text-sm '>Watch trailer</button>
            </div>

            <Link href={`/trending/${movie.id}`}>
              <div className='flex items-center cursor-pointer text-gray-200 bg-red-400 rounded-full p-1 px-4 space-x-2 hover:scale-125 hover:bg-red-500 active:scale-90 transition ease-in-out '>
                <button className='text-sm font-golos'>View</button>
              </div>
            </Link>
          </div>
      </motion.div> 
      : null }

      {/* Large Size */}
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

            <Link href={`/trending/${movie.id}`}>
              <div className='flex-grow flex justify-end cursor-pointer overflow-hidden p-4'>
                <button className='text-gray-300 font-roboto tracking-widest text-xl border p-2 px-6 rounded-full hover:text-white hover:scale-125 hover:bg-blue-500 hover:border-transparent transition ease-in-out active:scale-90'>View</button>
              </div>
            </Link>
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