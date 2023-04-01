import React from 'react'
import Lottie from 'lottie-react'
import reactIcon from '../public/react-icon.json'
import footerBackground from '../public/dot-pattern-background.json'

function Footer() {
  return (
    <div className='flex bg-white items-center justify-evenly p-4 relative overflow-hidden'>
      <div className='absolute w-[40vw] z-0 transform rotate-90'>
        <Lottie animationData={footerBackground}/>
      </div>
      <div className='flex items-center justify-center font-roboto relative space-x-1'>
        <h1 className='text-gray-800 text-xs absolute left-[-10px] top-[-1px] font-extrabold sm:text-sm md:text-base md:left-[-12px]'>Ⓒ</h1>
        <h1 className='text-gray-800 text-xs sm:text-sm md:text-base'>2023</h1>
        <h1 className='text-gray-900 text-xs sm:text-sm md:text-base'>MOVIE APP</h1>
      </div>
      <div className='flex flex-col items-center relative'>
        <h1 className='text-gray-900 font-roboto text-sm tracking-wide sm:text-md md:text-lg'>REACT JS</h1>
        <Lottie style={{width:"5rem" }} animationData={reactIcon}/>
        <h1 className='text-gray-900 font-roboto text-sm tracking-wide sm:text-md md:text-lg'>NEXT JS</h1>
      </div>
      <div className='flex items-center justify-center space-x-5 transition ease-in-out z-10'>
        <div className='iconContainer'>
          <img className='footerIcon' src="/facebook.png" alt="" />
        </div>
        <div className='iconContainer'>
          <img className='footerIcon' src="/linkedin.png" alt="" />
        </div>
        <div className='iconContainer'>
          <img className='footerIcon' src="/github.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Footer