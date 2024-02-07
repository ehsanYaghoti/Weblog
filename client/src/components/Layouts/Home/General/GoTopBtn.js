import React from 'react';

function GoTopBtn(props) {
    

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {

        let mybutton = document.getElementById("goToTopBtn");

        if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
            mybutton.classList.replace('opacity-0' , 'opacity-100');
        } else if(mybutton) {
            mybutton.classList.replace('opacity-100' , 'opacity-0');
        }
        
    }

    function topFunction() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }


    return (
        // GoTopBtn
        <button title="Go to top" id='goToTopBtn' onClick={topFunction}  className='fixed bottom-4 left-4  z-50 h-fit shadow-md  text-white bg-blue-500 p-4 rounded-lg font-["Nunito"] transition-all ease-in-out duration-500 opacity-0 '>top</button>
    )
}

export default GoTopBtn;