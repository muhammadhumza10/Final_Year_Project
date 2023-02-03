import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useRef,useState } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// _mock_

// components
import Image from '../image';
import { CarouselDots, CarouselArrows } from '../carouselutils';
import { CarouselArrowIndex } from '../carouselutils';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------


import { Card } from '@mui/material';

// _mock_


// ----------------------------------------------------------------------

export default function CarouselBasic1({product}) {
  const theme = useTheme();

  const carouselRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? _carouselsExample.length - 1 : 0);

  const settings = {
    dots: false,
    arrows: false,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
   
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card>
      <div className='flex justify-center'>

      <Slider ref={carouselRef} {...settings}>
        {product.imageUrl.map((item) => (
          <CarouselItem key={item.index} item={product} />
        ))}
      </Slider>

      <CarouselArrowIndex
        index={currentIndex}
        total={product.imageUrl.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      </div>
    </Card>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
  }),
};

function CarouselItem({ item }) {
  const { imageUrl} = item;
  return <Image alt="{title}" src={imageUrl[1]}  className='w-full h-96 object-cover' />;
}
