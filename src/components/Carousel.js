import { useState } from "react"
import ArrowRight from "../icons/ArrowRight"
import ArrowLeft from "../icons/ArrowLeft"

const Carousel = (props) => {
  const {images, groupName} = props
  const [activeImage, setActiveImage] = useState(0)

  const handleChange = (direction) => {
    if ((activeImage +1) === images.length && direction > 0) {
      setActiveImage(0)
    }
    else if(activeImage === 0 && direction < 0) {
      setActiveImage(images.length -1)
    } else {
      setActiveImage(activeImage + direction)
    }
  }

  return(
    <div className="ml-10 overflow-hidden" style={images.length !== 0 ? {height: 400} : {}}>
      { images.length !== 0 &&
        <div className="flex">
          <div onClick={() => handleChange(-1)} className="grid content-center w-10 mr-3 hover:bg-gray-100">
            <ArrowLeft w='10' h='10'/>
          </div>

          <a href={`/image/${groupName}/${activeImage}`}>
            <img src={images[activeImage]} width="500" height="400" style={{height: 400}} id="carasoul-image" className="border-solid border-2 border-cyan-600 ease-linear transition-all duration-150 hover:border-indigo-600"/>
          </a>

          <div onClick={() => handleChange(1)} className="grid content-center w-10 ml-3 hover:bg-gray-100">
              <ArrowRight w='10' h='10'/>
          </div>
        </div>
      }
    </div>
  )
}

export default Carousel