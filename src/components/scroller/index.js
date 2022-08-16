import React, {useRef, useEffect, useState} from 'react'

const url = 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&w=1000&q=80'
const imageList = [url, url, url, url, url, url, url, url, url, url, url, url]

function Scroller() {
    const [scrollPosition, setScrollPosition] = useState(-1)
    const [images, setImages] = useState(imageList)
    const scrollerRef = useRef(null)
    useEffect(()=> {

    }, [])
    const scrollerContainerStyle = { overflowX: 'scroll',  'scrollBehavior': 'smooth' }
    const contentPaneStyle = { display: 'flex', width: '100%' }

    const detectEnd = () => {
        const {scrollLeft, scrollWidth} = scrollerRef.current;
        console.log('current', scrollLeft, scrollPosition, ' --- ',scrollWidth)
        setScrollPosition(scrollLeft)
        if(scrollLeft !== 0 && scrollLeft === scrollPosition){
            console.log('End Reacthed')
            //fetch more items
            setImages([...images, ...imageList])
        }
    }
    const scrollLeft = () => {
        detectEnd();
        scrollerRef.current.scrollLeft -= 100;
    };
    const scrollRiht = () => {
        detectEnd();
        scrollerRef.current.scrollLeft += 100;
    };

    return (
        <div>
            <button onClick={() => scrollLeft()}>LEFT</button>
            <button onClick={() => scrollRiht()}>RIGHT</button>
            <div style={scrollerContainerStyle} ref={scrollerRef}>
                <div style={contentPaneStyle}>
                    {
                        images.map((img, i) => {
                            return <img width={200} height={200} src={img} key={i} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Scroller