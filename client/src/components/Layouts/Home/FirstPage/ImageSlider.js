import React , {  useState  , useEffect , useRef } from 'react';

// styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight , faAngleLeft  } from '@fortawesome/free-solid-svg-icons'

function ImageSlider(props){
    const [currentIndex , setCurrentIndex] = useState(0)
    const timerRef = useRef(null);

    let slides = props.slides




    const slideStyleswidthBackground = {
        backgroundImage : `url(${slides[currentIndex].url})`

    }

    const goToPreviousSlide = () =>{
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length -1  : currentIndex -1
        setCurrentIndex(newIndex) 
        activeDot(newIndex)
    }

    const goToNextSlide = () =>{
        const isLastSlide = currentIndex === slides.length -1;
        const newIndex = isLastSlide ? 0  : currentIndex +1
        setCurrentIndex(newIndex) 
        activeDot(newIndex)
    }

    useEffect(()=>{
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(()=>{
            goToNextSlide()
        } , 5000)

        return () => clearTimeout(timerRef.current);

    })



    // setTimeout(()=>{
    //     goToNextSlide()
    // } , 5000)
    

    const goToSlide = ( e ,  slideIndex) => {
        e.preventDefault();

        setCurrentIndex(slideIndex);

        document.getElementById(e.target.id).classList.replace('text-gray-400' , 'text-white')

        document.querySelectorAll('button[name="booten"]').forEach(button =>{
            if( parseInt(button.id) !== parseInt(slideIndex) ){
                button.classList.replace('text-white' , 'text-gray-400')
            }
        })
    };

    const activeDot = (slideIndex) => {
        
        document.getElementById(slideIndex).classList.replace('text-gray-400' , 'text-white')

        document.querySelectorAll('button[name="booten"]').forEach(button =>{
            if( parseInt(button.id) !== parseInt(slideIndex) ){
                button.classList.replace('text-white' , 'text-gray-400')
            }
        })
    }

    return (
        // slider
        <div className='h-full relative shadow-2xl' >
            {/* left angle */}
            <button>
                <FontAwesomeIcon icon={faAngleLeft} onClick={goToPreviousSlide} className='absolute top-1/2 left-5 text-white text-4xl rounded-md z-10 '  />
            </button>
            {/* slide */}
            <div className='w-full h-full relative  rounded-lg bg-cover p-0 bg-center transition-all duration-500 ease-out object-contain -translate-y-[16px]' style={slideStyleswidthBackground}  >
                <div className='flex flex-col w-2/3 pr-4 h-fit absolute bottom-12 left-8 items-start ml-4 font-["Nunito"] hover:opacity-80 text-white transition-all duration-500 ' >
                    <span className='h-fit text-xl font-[900] ' >{slides[currentIndex].title}</span>
                    <p className='h-fit font-[600]  line-clamp-4 leading-6 ' >{slides[currentIndex].descripiton}</p>
                    {
                        slides[currentIndex].hasButton ?
                        <a href="/articels">
                            <button className='px-4 py-2 border border-solid border-gray-400 shadow-sm bg-white rounded-md text-gray-800 font-[700] ' >{slides[currentIndex].buttonContent}</button>
                        </a>
                        : ''
                    }
                </div>
            </div>
            
            {/* right angle */}
            <button>
                <FontAwesomeIcon icon={faAngleRight} onClick={goToNextSlide} className='absolute top-1/2 right-5 text-white text-4xl rounded-md z-10'/>
            </button>
            {/* dots */}
            <div className='absolute bottom-2 left-[45%]  h-fit flex items-center justify-center gap-2'>
                {
                    slides.map((slide , slideIndex) => {
                        return (
                        <button  key={slideIndex} name='booten' id={`${slideIndex}`} onClick={(e) => goToSlide( e , slideIndex)} className='text-xl rounded-md cursor-pointer text-gray-400' >
                            ⬤
                          {/* <FontAwesomeIcon icon={faCircle} className=' text-sm rounded-md cursor-pointer text-gray-400'  /> */}
                        </button>
                        )
                    })
                }
            </div>
        </div>
    )


}

export default ImageSlider;