import { ASCENDING, DESCENDING, tableColumns } from './constants';

export const sortData = (a, b, sortByColumn, orderBy) => {
    try {
    if (typeof a[sortByColumn] === 'number') {
        if (orderBy === ASCENDING)
            return a[sortByColumn] - b[sortByColumn]
        else
            return b[sortByColumn] - a[sortByColumn]
    } else {
        if (orderBy === ASCENDING) {
            const valA = a[sortByColumn].toUpperCase(); // ignore upper and lowercase
            const valB = b[sortByColumn].toUpperCase(); // ignore upper and lowercase
            if (valA < valB) {
                return -1;
            }
            if (valA > valB) {
                return 1;
            }
            return 0;
        } else {
            const valA = a[sortByColumn].toUpperCase(); // ignore upper and lowercase
            const valB = b[sortByColumn].toUpperCase(); // ignore upper and lowercase
            if (valA < valB) {
                return 1;
            }
            if (valA > valB) {
                return -1;
            }
            return 0;
        }
    }
    }
    catch(error){
        console.log('sort error', error)
    }
}

export const parseTableData = (data = [], rowsPerPage, currentPage) => {
    const pageWiseTableData = []
    if(data.length <= rowsPerPage) {
        let countLabel = ``
        if(data.length > 0){
            countLabel = `1 - ${data.length} of ${data.length} Items`
        }
        return {
            data: [ data ],
            totalPage: 1,
            rawData: data,
            pages: [1],
            countLabel
        }
    } else {
        let tempArr = []
        for(let i = 0; i < data.length; i++) {
           if(i % rowsPerPage === rowsPerPage - 1){
            tempArr.push(data[i])
            pageWiseTableData.push(tempArr)
            tempArr = [];
           }else {
            tempArr.push(data[i])
           }
        }

        //flush the tempArr if any data exist
        if(tempArr.length > 0){
            pageWiseTableData.push(tempArr)
            tempArr = []
        }
        const pages = []
        for(let i=1; i <= pageWiseTableData.length; i++){
            pages.push(i)
        }
        let countLabel = ``
        if(data.length > 0){
            const initialCount = (currentPage * rowsPerPage) + 1
            countLabel = `${initialCount} - ${(initialCount - 1) + pageWiseTableData[currentPage].length} of ${data.length} Items`
        }
        return {
            data: pageWiseTableData,
            totalPages: pageWiseTableData.length,
            rawData: data,
            pages,
            countLabel
        }
    }
}