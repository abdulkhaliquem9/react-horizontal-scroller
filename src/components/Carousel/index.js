import React, {useState} from 'react'
import './index.scss'

export default function(){
    const urls = [
        {url: require('./../../assets/house-1.jpg')},
        {url: require('./../../assets/house-2.jpg')},
        {url: require('./../../assets/house-3.jpg')},
    ]
    const [currentSlide, setCurrentSlide] = useState(2)
    const [direction, setDirection] = useState('')

    const slideNext = () => {
        setCurrentSlide(prevState => (prevState === urls.length -1 ? 0 : prevState+1))
        setDirection('next')
    }
    const slidePrev = () => {
        setCurrentSlide(prevState => (prevState === 0 ? urls.length -1 : prevState-1))
        setDirection('prev')
    }
    const moveToSlide = slideIndex => {
        if(slideIndex > currentSlide){
            setDirection('next')
        }else{
            setDirection('prev')
        }
        setCurrentSlide(prevState => slideIndex)
    }
    console.log('slide', currentSlide)
    const sideInClass = `slide-in-${direction}`;
    const slideOutClass = `slide-out-${direction}`
   return(
    <div className="carousel-container">
        <div className="carousel">
            <button className="carousel__button carousel__button--left" onClick={slidePrev}>
                <img src={require('./../../assets/left-arrow.png')}></img> 
            </button>
            <div className="carousel_track-container">
                <ul className="carousel_track">
                    {
                        urls.map((el,i) => (
                            <li key={i} className={
                                `carousel__slide ${currentSlide === i ? sideInClass : 
                                    (currentSlide === i+1? 'hide' : 'hide')}`
                                    }>
                                <img className='carousel__image' src={(el.url)} alt={el.url}></img>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <button className="carousel__button carousel__button--right" onClick={slideNext}>
                <img src={require('./../../assets/left-arrow.png')}></img>
            </button>

            <div className='carousel__nav'>
            {
                urls.map((el,i) => (<button 
                    key={i} 
                    className={`carousel__indicator ${currentSlide === i ? 'active-indicator': ''}`} 
                    onClick={currentSlide === i ? null : ()=>moveToSlide(i)}></button> ))
            }
            </div>
        </div>
    </div>
   )
}