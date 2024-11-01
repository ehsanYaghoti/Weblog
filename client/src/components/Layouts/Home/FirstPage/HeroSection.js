import React from 'react';

// Layouts
import ImageSlider from 'src/components/Layouts/Home/FirstPage/ImageSlider';

function HeroSectoin(props) {

    let slides = [
        {
            url : `${process.env.REACT_APP_API_URL}/public/static/landscape.jpg` ,
            title :  'Title' , 
            descripiton : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' , 
            hasButton : true ,
            buttonContent  : 'Read'
        },
        {
            url : `${process.env.REACT_APP_API_URL}/public/static/landscape2.jpg` , 
            title :  'Title' , 
            descripiton : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' , 
            hasButton : false ,
            buttonContent  : 'Read'
        },
        {
            url : `${process.env.REACT_APP_API_URL}/public/static/sunrise.jpg` , 
            title :  'Title' , 
            descripiton : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' , 
            hasButton : false ,
            buttonContent  : 'Read'
        },
    ]
  
    console.log(process.env)

    return (
        // Hero Section 
        <div className='flex felx-row items-start justify-center mt-20  w-full h-[500px]' >

            {/* Image Slider Container  */}
            <div className='w-[900px] self-center md:self-start mx-4 md:mx-10 h-full  transiton-all border border-solid border-gray-400 dark:border-none rounded-lg' >
                <ImageSlider slides={slides}  />
            </div  >
            {/* Trending section */}
            <div className="hidden  xl:flex flex-col h-full ml-10 mr-10 w-1/3 font-['Nunito']  items-center border border-solid rounded-lg border-gray-400 shadow-lg bg-gray-50  dark:bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black dark:border-none dark:text-gray-50 ">
                <h2 className='text-xl font-bold h-[10%] w-full flex items-center justify-center p-4 border-b border-solid border-gray-400 ' >Trending articles</h2>
                <div className='p-4 h-[90%] grid grid-cols-1' >
                    <ul className='h-[95%] flex flex-col items-start gap-4 ' >
                        <li className='flex items-center ' >
                        <a href="/articels" className='flex items-center'>
                            <img src={`${process.env.REACT_APP_API_URL}/public/static/landscape.jpg`} alt="" className='h-[100px] w-[100px] rounded-md border border-solid border-gray-400 shadow-md hover:scale-110 transition-all dark:border-none' />
                            <div className='flex flex-col items-start ml-4 font-["Nunito"] hover:opacity-80' >
                                <span className='text-xl font-[600] h-fit text-gray-900 dark:text-white' >Lorem Ipsum</span>
                                <p className='font-[200] font-["Nunito"] text-gray-800 line-clamp-2 leading-6 dark:text-white ' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                            </div>
                        </a>
                        </li>
                        <li className='flex items-center ' >
                            <a href="/articels" className='flex items-center'>
                            <img src={`${process.env.REACT_APP_API_URL}/public/static/landscape2.jpg`} alt="" className='h-[100px] w-[100px] rounded-md border border-solid border-gray-400 shadow-md hover:scale-110 transition-all dark:border-none' />
                            <div className='flex flex-col items-start ml-4 font-["Nunito"] hover:opacity-80' >
                                <span className='text-xl font-[600] h-fit text-gray-900 dark:text-white' >Lorem Ipsum</span>
                                <p className='font-[200] font-["Nunito"] text-gray-800 line-clamp-2 leading-6 dark:text-white' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                            </div>
                            </a>
                        </li>
                        <li className='flex items-center ' >
                        <a href="/articels" className='flex items-center'>
                            <img src={`${process.env.REACT_APP_API_URL}/public/static/sunrise.jpg`} alt="" className='h-[100px] w-[100px] rounded-md border border-solid border-gray-400 shadow-md object-cover hover:scale-110 transition-all dark:border-none ' />
                            <div className='flex flex-col items-start ml-4 font-["Nunito"] hover:opacity-80' >
                                <span className='text-xl text-gray-900 font-[600] h-fit dark:text-white' >Lorem Ipsum</span>
                                <p className='font-[200] font-["Nunito"] text-gray-800 line-clamp-2 leading-6 dark:text-white' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                            </div>
                        </a>
                        </li>
                    </ul>
                    {/* <div className='flex items-center h-[5%] gap-6 self-center justify-self-center justify-center text-sm text-gray-600 dark:text-gray-50 ' >
                       ⬤ ⬤ ⬤
                    </div> */}
                </div>
            </div>

        </div>
    )
}

export default HeroSectoin;