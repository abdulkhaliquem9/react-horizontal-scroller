import { useState, useEffect, useRef } from "react";
import {
    generateDates,
} from './util'
import './index.scss'
const DateRange = () => {
    const yearRef = useRef(null);
    const monthRef = useRef(null);
    const [dates, setDates] = useState([])
    useEffect(() => {
        // const dates = generateDates(moment(new Date('28/09/2021')));
        const dates = generateDates();
        setDates(dates)
        if (yearRef && monthRef) {

        }
    }, [])
    const handleMonthScroll = (e) => {
        yearRef.current.scrollLeft = monthRef.current.scrollLeft;
    }
    // console.log('...\n', dates)

    return (
        <div className="date-range">
            <div className="date-range-content">
                {
                    dates && dates.length && dates.length >= 2 && <>
                        {/* <MonthScroller dates={dates} /> */}

                        <div className="month-scroller">
                            <div className="content" ref={yearRef} >

                                {
                                    dates.map(({ year, epoch, isActive }, i) => <span
                                        key={epoch}
                                        className={`chip`}
                                        style={{
                                            position: year === 'YYYY' ? 'relative' : 'sticky',
                                            color: year === 'YYYY' ? 'transparent' : 'inherit',
                                            padding: 0,
                                            left: 0
                                        }}
                                    >
                                        {year}
                                    </span>
                                    )
                                }
                            </div>
                            <div className="content" ref={monthRef} onScroll={handleMonthScroll}>

                                {
                                    dates.map(({ month, epoch, isActive }, i) => <span
                                        key={epoch}
                                        className={`chip ${i === 1 ? '' : (isActive ? 'active-chip' : 'inactive-chip')}`}
                                    >
                                        {month}
                                    </span>
                                    )
                                }
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

const MonthScroller = ({ dates }) => {
    return (
        <div className="month-scroller">
            {dates.map(date => <Chip date={date} key={date.epoch} />)}
        </div>
    )
}
const Chip = ({ date }) => {
    const { month } = date
    return (
        <span className="chip active-chip">{month}</span>
    )
}

export default DateRange;




