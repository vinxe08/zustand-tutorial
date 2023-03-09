import React from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

type Props = {
  handleSelectMovie: (result: number) => void
}

const CategoryMenu = ({handleSelectMovie}: Props) => {

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "10px",
    speed: 400,
    dots:true,
    afterChange: (id: number) => handleSelectMovie(id),slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  return (
    <div className='bg-[#0a1c38] flex flex-col py-3'>
      <div className='flex flex-row items-center space-x-4 px-[0.60rem]'>
        <span className='border-2 border-[#c2bfbf34] h-1 flex-1 rounded-full' />
        <h1 className='font-roboto text-4xl text-center tracking-wider text-[#fff]'>Trailer</h1>
        <span className='border-2 border-[#c2bfbf34] h-1 flex-1 rounded-full' />
      </div>
      <div className='flex flex-col bg-[#0a1c38] px-4'>
        <div className='px-8 py-4 '>
          <Slider {...settings}>
            <div>
              <button>Trending</button>
            </div>
            <div>
              <button>Originals</button>
            </div>
            <div>
              <button>Top Rated</button>
            </div>
            <div>
              <button>Action Movies</button>
            </div>
            <div>
              <button>Comedy</button>
            </div>
            <div>
              <button>Horror</button>
            </div>
            <div >
              <button>Romance</button>
            </div>
            <div>
              <button>Documentaries</button>
            </div>
            </Slider>
        </div>
      </div>
    </div>
  );
}

export default CategoryMenu