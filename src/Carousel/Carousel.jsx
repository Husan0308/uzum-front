import './Carousel.css'

import Carousel1 from './carousel-1.jpg';
import Carousel2 from './carousel-2.jpg';
import Carousel3 from './carousel-3.jpg';
// import Carousel4 from '../public/assets/img/carousel-4.jpg'
// import Carousel5 from '../public/assets/img/carousel-5.jpg'
// import Carousel6 from '../public/assets/img/carousel-6.jpg'
// import Carousel7 from '../public/assets/img/carousel-7.jpg'
// import Carousel8 from '../public/assets/img/carousel-8.jpg'
// import Carousel9 from '../public/assets/img/carousel-9.jpg'
export default function Carousel() {

  return (
    <div className="carousel">
      <div className="carousel-inner">
        <input className="carousel-open" type="radio" id="carousel-1" name="carousel" aria-hidden="true" hidden defaultChecked />
        <div className="carousel-item">
          <img src={Carousel1} alt="Slide 1" />
        </div>

        <input className="carousel-open" type="radio" id="carousel-2" name="carousel" aria-hidden="true" hidden />
        <div className="carousel-item">
          <img src="http://fakeimg.pl/2000x800/DA5930/fff/?text=JavaScript" alt="Slide 2" />
        </div>

        <input className="carousel-open" type="radio" id="carousel-3" name="carousel" aria-hidden="true" hidden />
        <div className="carousel-item">
          <img src="http://fakeimg.pl/2000x800/F90/fff/?text=Carousel" alt="Slide 3" />
        </div>

        <label htmlFor="carousel-3" className="carousel-control prev control-1">‹</label>
        <label htmlFor="carousel-2" className="carousel-control next control-1">›</label>
        <label htmlFor="carousel-1" className="carousel-control prev control-2">‹</label>
        <label htmlFor="carousel-3" className="carousel-control next control-2">›</label>
        <label htmlFor="carousel-2" className="carousel-control prev control-3">‹</label>
        <label htmlFor="carousel-1" className="carousel-control next control-3">›</label>

        <ol className="carousel-indicators">
          <li>
            <label htmlFor="carousel-1" className="carousel-bullet">•</label>
          </li>
          <li>
            <label htmlFor="carousel-2" className="carousel-bullet">•</label>
          </li>
          <li>
            <label htmlFor="carousel-3" className="carousel-bullet">•</label>
          </li>
        </ol>
      </div>
    </div>
  );
}
