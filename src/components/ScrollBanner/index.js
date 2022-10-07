//scroller 
import React, { useEffect, useState } from 'react'

const list = [
    { title: 'Home', description: 'This is Home Page' },
    { title: 'Details', description: 'This is Details Page' },
    { title: 'About Us', description: 'This is About Us Page' },
    { title: 'Contact', description: 'This is Contact Page' },
]
const ScrollBanner = () => {
    const [index, setIndex] = useState(0)
    const startTimer = () => {
        const interval = setInterval(() => {
            setIndex(index => {
                console.log('index', index, list.length - 1)
                return index === list.length - 1 ? 0 : index + 1
            })
            if (index === list.length - 1)
                clearInterval(interval)
        }, 3000)
        return interval
    }
    useEffect(() => {
        const interval = startTimer()
        return () => {
            if (interval)
                clearInterval(interval)
        }
    }, [])

    const moveTo = (direction) => {
        if (direction === 'left') {
            setIndex(index - 1)
        } else {
            setIndex(index + 1)
        }
    }
    const moveLeft = () => moveTo('left')
    const moveRight = () => moveTo('right')


    // console.log(`list item at index ${index} is `, list[index])
    return (
        <div className='flex justify-between w-full border-2'>
            <button onClick={moveLeft} className="grow-0">Left</button>
            <div className="grow flex justify-center">
                <div className='animate-scrollLeft'>
                    <h1 className='font-bold'>{`${index + 1} ${list[index].title}`}</h1>
                    <h3 className='font-semibold'>{list[index].description}</h3>
                </div>
            </div>
            <button onClick={moveRight} className="grow-0">Right</button>
        </div>
    )
}

export default React.memo(ScrollBanner);