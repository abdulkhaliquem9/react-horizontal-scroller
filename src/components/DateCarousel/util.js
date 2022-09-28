//util

import moment from "moment";

export const generateDates = function (sd, ed) {
    let startDate = moment(sd = '2020-09-28 ');
    let endDate = moment();
    // console.log('----', startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'))
    let dates = [];
    let tempYear = ''
    let prevYear = ''
    let year = '';
    for (let m = moment(startDate), i = 1; m.isBefore(endDate); m.add(30, 'days'), i++) {
        year = m.format('YYYY');
        prevYear = prevYear.length === 0 || prevYear !== year ? year : '';
        // console.log('---', tempYear, year, prevYear)
        tempYear = tempYear !== 'YYYY' && tempYear !== year ? year : 'YYYY'
        dates.push({
            date: m.format('YYYY-MM-DD'),
            month: m.format('MMM'),
            year: year,
            // year: year.length !== 0 && year === m.format('YYYY') ? '' : m.format('YYYY'),
            epoch: m.unix(),
            isActive: i % 2 === 0
        });
    }

    const result = []
    let yearArray = []
    let y = ''
    dates.forEach((date, i) => {
        const { year } = date
        if (i === 0) {
            yearArray.push(year)
            y = year
        } else {
            if (yearArray.indexOf(year) >= 0) {
                y = 'YYYY'
            } else {
                yearArray.push(year)
                y = year
            }
        }
        result.push({ ...date, year: y })
    })

    // dates = dates.map((date, i) => ({ ...date, year: date[i - 1] && date[i - 1].year === date.year ? date : 'YYYY' }))

    // console.log(dates)
    return result
};