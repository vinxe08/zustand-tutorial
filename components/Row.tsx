import Image from 'next/image'
import React from 'react'
import { Movie } from '../interface/Products'
import Link from 'next/link'
import { base_url } from '../utils/requests'

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
          <div className='h-48 w-36 relative'>
            <Image 
              src={`${base_url}${ movie.poster_path}`}
              layout="fill"
              objectFit={'fill'}
              // height={202}
              // width={202}
              className="rounded-sm"
            />
          </div>
        </div>
    </div>
    </Link>
  )
}

export default Row