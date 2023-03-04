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
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 400,
    afterChange: (id: number) => handleSelectMovie(id),
  };

  return (
    <div className='flex px-4 flex-col bg-[#223655d3]'>
    <div className='px-6 py-4'>
      <Slider {...settings}>
        <div className=''>
          <button>
            Trending 
          </button>
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
  );
}

export default CategoryMenu