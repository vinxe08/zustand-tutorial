import Image from 'next/image'
import React from 'react'
import { Movie } from '../interface/Products'
import Link from 'next/link'
import { base_url } from '../utils/requests'
import { Rating } from 'react-simple-star-rating'
import { starManipulation } from '../utils/starManipulation'

interface Props {
  movie: Movie
  category: string
}

const Row: React.FC<Props> = ({ movie, category }) => {
  // console.log(`Movie: ${movie.id}`,movie)

  return (
    <Link href={`/${category}/${movie.id}`}>
    <div 
      className='p-4 flex items-center justify-center flex-shrink-0 overflow-hidden relative bg-[#040d1aee]'
      >
        {/* Background Image */}
        <img 
          className='h-full w-full object-fill hover:scale-105 transition ease-in cursor-pointer -z-10 absolute '
          src={`${base_url}${ movie.poster_path}`}
          alt="" />
        <div className='hover:scale-105 transition ease-in cursor-pointer pt-16'>
          <div className='h-56 w-44 lg:h-80 lg:w-60 relative'>
            <Image 
              src={`${base_url}${ movie.poster_path}`}
              layout="fill"
              objectFit={'fill'}
              className="rounded-sm"
            />
            <div className='absolute flex flex-row items-end space-x-1 bottom-[-30px]'>
              <div className='flex items-center'>
                <Rating 
                  disableFillHover
                  readonly
                  iconsCount={5}
                  initialValue={starManipulation(movie.vote_average)}
                  allowFraction
                  size={20}
                />
              </div>
              <h1 className='text-white font-roboto'>
                {movie.vote_count} VOTE
              </h1>
            </div>
          </div>
        </div>
    </div>
    </Link>
  )
}

export default Row