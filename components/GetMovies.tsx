import { XCircleIcon } from '@heroicons/react/24/outline';
import React, {useState, useEffect} from 'react'
import ReactPlayer from 'react-player/lazy';
import { Movie, Element, Genre } from '../interface/Products'
import { motion } from 'framer-motion';
import Loading from './Loading';

type Props = {
  currentMovie: Movie
  handleOnPlay: () => void
}
function GetMovies({currentMovie, handleOnPlay}:Props ) {
  const [trailer, setTrailer] = useState('');

  useEffect(() => {
    if(!currentMovie) return

    // Fetch a fully information of the currentMovie
    async function fetchMovie() {
      const data = await fetch(`https://api.themoviedb.org/3/${currentMovie?.media_type === 'tv' ? 'tv' : 'movie'}/${currentMovie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`)
      .then((response) => response.json())

      if(data?.videos){
        // holds a key for Youtube URL
        const index = data.videos.results.findIndex((element: Element) => element.type === "Trailer");
        setTrailer(data.videos?.results[index]?.key)
      }  
    }

    fetchMovie()
  },[currentMovie])

  return (
    <div className='z-20'>
      {/* Large Screen */}
      <motion.div 
        whileHover={{ top: 0}}
        className='absolute top-[-137px] left-0 z-50 w-screen pb-10 h-48 hidden md:flex items-center justify-center text-transparent hover:text-white transition ease-in-out '>
        <button
          className='active:scale-90 transition ease-in-out'
          onClick={handleOnPlay} 
        >
        <XCircleIcon
          className='h-20 w-20 rounded-full bg-gray-600 cursor-pointer'/>
        </button>
      </motion.div>
      {/* Small Screen Size */}
      <motion.div 
        onClick={handleOnPlay}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1, type: "spring", stiffness: 200, bounce: 1 }}
        className='block md:hidden absolute top-16 left-[40%] z-50'>
        <XCircleIcon className=' h-20 w-20 rounded-full text-white bg-transparent hover:bg-gray-400 hover:scale-110 active:scale-90 cursor-pointer transition ease-in-out'/>
      </motion.div>
      <ReactPlayer 
          url={`https://www.youtube.com/watch?v=${trailer}`}
          width="100%"
          height="100%"
          style={{ position: 'fixed', top: '0', left: '0' }}
          playing
        />
    </div>
  )
}

export default GetMovies