import Image from 'next/image'
import React from 'react'
import { base_url } from '../utils/requests'

import {  HeartIcon, StarIcon, UserGroupIcon, PlayCircleIcon } from '@heroicons/react/24/outline'
import { truncate } from '../utils/truncate'
import { Movie } from '../interface/Products'
import { motion } from 'framer-motion';
import { Rating } from 'react-simple-star-rating'
import { starManipulation } from '../utils/starManipulation'
import { dateManipulation } from '../utils/dateManipulation'

type Props = {
  movie: Movie
  handleOnPlay: () => void
}

const sentence = {
  hidden: {opacity: 0},
  visible: (i =1) => ({
    opacity: 1,
    transition: {
      delayChildren: 0.04 * i,
      staggerChildren: 0.12,
    }
  })
} 

const letter = {
  hidden: {
    opacity: 0, 
    y: -20, 
    transition: {
    type: "spring",
    damping: 12,
    stiffness: 100
  }},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  },
  
}

function MobileView({movie, handleOnPlay}: Props) {
  // const storyLine = "Overview"

  return (
    <div className='flex flex-col md:hidden'>
      {/* Background Image */}
      <motion.img 
        initial={{ opacity: 0}}
        animate={{ opacity:1}}
        className='h-[60vh] w-screen object-cover -z-10 absolute'
        src={`${base_url}${ movie.backdrop_path}`}
        alt="" />

      <div className='h-[55vh] px-6 flex items-end space-x-5 '>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className='border border-white flex flex-shrink-0'>
          <Image 
            src={`${base_url}${movie.poster_path}`}
            objectFit={'fill'}
            height={250}
            width={180}
            className="rounded-sm"
          />
        </motion.div>
        <div className='mb-[-4rem]'>
          <motion.h1 
            initial={{ x: -130, opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            className='font-roboto text-gray-900 text-4xl tracking-wide'>{movie.title || movie.name}
          </motion.h1>
          <motion.div 
            initial={{ x: -130, opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            className='flex space-x-4 font-roboto uppercase text-gray-300 mt-5'>
            <h1>{movie.media_type || "🚀"}</h1>
            <h1>/</h1>
            <h1>{movie.origin_country || "🚀"}</h1>
            <h1>/</h1>
            <h1>{dateManipulation(movie.release_date || movie.first_air_date) || "🚀"}</h1>
            <h1>/</h1>
            <h1>{movie.original_language || "🚀"}</h1>
          </motion.div>
          <motion.div 
            initial={{ x: -130, opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            className='flex items-center text-center space-x-3'>
            <Rating 
              disableFillHover
              readonly
              iconsCount={5}
              initialValue={starManipulation(movie.vote_average)}
              allowFraction
              size={30}
            />
            <h1 className='text-gray-500 font-roboto'>
              {movie.vote_count} VOTE
            </h1>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className='h-[45vh] flex flex-col p-5 space-y-5 overflow-hidden '>
          
        <motion.h1 
          variants={sentence}
          initial="hidden"
          animate="visible"
          className='text-gray-900 font-roboto tracking-wider text-4xl overflow-hidden flex'>{"Overview".split("").map((char, index) => {
            return (
              <motion.span key={char + "-" + index} variants={letter} >
                {char}
              </motion.span>
            )
          }) }</motion.h1>
        <motion.p 
          initial={{ y: 230, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200, bounce: 1 }}
          className='text-gray-500 text-justify max-w-[36.5rem]'>{truncate(movie.overview, 360)}</motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ 
          scale: 1.1, 
          backgroundColor: "#26abcc",
          transition: { delay: 0, duration: 0.3 }
        }}
        whileTap={{ scale: 0.9, transition: { delay: 0, duration: 0.3 } }}
        transition={{ duration: 0.5,  type: "spring", stiffness: 200, bounce: 1 }}
        onClick={handleOnPlay}
        className='bg-[#26abccaf] flex absolute bottom-10 left-[40%] p-2 space-x-2 rounded-full cursor-pointer'>
          <PlayCircleIcon className='h-12 w-12 text-white'/>
      </motion.div>

      {/* OVERLAY */}
      <div className='flex h-[65vh] w-screen filter backdrop-blur-3xl bg-[#ffffff] -z-10 absolute bottom-0' />

      </div>
  )
}

export default MobileView