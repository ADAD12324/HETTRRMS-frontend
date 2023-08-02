import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Items  from './Items';
import slider from '../helper/slider.json'

function CarouselSlide() {
  return (
    <Carousel navButtonsAlwaysVisible={true}>
        {
            slider.map( item => <Items key={item.id} item={item} /> )
        }
    </Carousel>
  )
}

export default CarouselSlide