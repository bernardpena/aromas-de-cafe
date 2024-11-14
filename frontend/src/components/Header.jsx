import React from 'react'
import Carousel from './Carousel';

function Header (){
    return(
        <div className="header">
            <Carousel />
            {/* <img src="../../public/header.jpg" alt="" className="img-header"></img> */}
        </div>
    )
}

export default Header;