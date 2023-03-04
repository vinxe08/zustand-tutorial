import React from 'react'
import { Movie } from '../interface/Products'
import Row from './Row'

type Movies = {
  movies: Movie[],
  title: string,
  category: string
}

function RowList({movies, title, category}: Movies) {
  return (
    <>
      <div className='row__container flex-shrink-0'>
        <h1 className='absolute text-red-500 text-5xl font-bold z-10 top-4 left-9 cursor-default'>{title}</h1>
        {movies.map((movie) => (
          <Row key={movie.id} movie={movie} category={category}/>
        ))}
      </div>
      <div className='h-4 bg-[#040d1afa]' />
    </>
  )
}

export default RowList