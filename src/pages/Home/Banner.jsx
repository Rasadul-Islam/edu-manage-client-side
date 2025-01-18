import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slide1 from '../../assets/image/slide-1.jpg';
import slide2 from '../../assets/image/slide-2.jpg';
import slide3 from '../../assets/image/slide-3.jpg';
import slide4 from '../../assets/image/slide-4.jpg';
import slide5 from '../../assets/image/slide-5.jpg';

const Banner = () => {
    return (
        <>
            <Carousel
                showArrows={true}
                showThumbs={false}
                showStatus={false}
                autoPlay={true}
                interval={3000}
                infiniteLoop={true}
            >
                <div>
                    <img src={slide1} alt="Slide 1" className="w-full h-96" />
                    <h3 className="legend">Empowering Learning, Anytime, Anywhere</h3>
                </div>
                <div>
                    <img src={slide2} alt="Slide 2" className="w-full h-96" />
                    <h3 className="legend">Where Education Meets Innovation</h3>
                </div>
                <div className='relative'>
                    <h1 className='top-0 absolute text-center w-full text-3xl text-gray-700 mt-5 font-bold'>Virtual classroom</h1>
                    <img src={slide3} alt="Slide 3" className="w-full h-96" />
                    <h3 className="legend">Transforming Classrooms into Communities</h3>
                </div>
                <div>
                    <img src={slide4} alt="Slide 4" className="w-full h-96" />
                    <h3 className="legend">Your Journey to Knowledge Starts Here</h3>
                </div>
                <div>
                    <img src={slide5} alt="Slide 5" className="w-full h-96" />
                    <h3 className="legend">Unlocking Potential, One Skill at a Time</h3>
                </div>
            </Carousel>
        </>
    );
};

export default Banner;
