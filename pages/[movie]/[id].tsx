import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react'
import { Movie } from '../../interface/Products';
import requests from '../../utils/requests';
import GetMovies from '../../components/GetMovies';
import MobileView from '../../components/MobileView';
import DesktopView from '../../components/DesktopView';

type Props = {
  movie: Movie
}

function index({movie}: Props) {
  const [onPlay, setOnPlay] = useState(false)
  console.log("MOVIE: ", movie)

  const handleOnPlay = () => {
    setOnPlay(!onPlay)
  }
  
  return (
    <div className='h-screen flex flex-col relative space-y-4'>
      <MobileView movie={movie} handleOnPlay={handleOnPlay} />
    
      <DesktopView handleOnPlay={handleOnPlay} movie={movie} />
      
      {onPlay ? <GetMovies currentMovie={movie} handleOnPlay={handleOnPlay} /> : null}

    </div>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Base Path & Query Params
  const basePath = context.query.movie
  const params:number = Number(context.query.id)

  // Fetch Movie according to basePath
  const movies = await axios(requests[basePath as keyof typeof requests])

  const selectedMovie = movies.data.results.filter((movie: Movie) => movie.id === params)
  return {
    props: {
      movie: selectedMovie[0]
    }
  }
}