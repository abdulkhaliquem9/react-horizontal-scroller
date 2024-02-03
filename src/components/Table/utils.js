import { ASCENDING, DESCENDING, tableColumns } from './constants';

export const sortData = (a, b, sortByColumn, orderBy) => {
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

export const parseTableData = (data = [], rowsPerPage) => {
    const pageWiseTableData = []
    if(data.length <= rowsPerPage) {
        return {
            data: [ data ],
            totalPage: 1,
            rawData: data
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

        return {
            data: pageWiseTableData,
            totalPages: pageWiseTableData.length,
            rawData: data
        }
    }
}

export const parseTableData2 = (data = [], rowsPerPage) => {
    const pageWiseTableData = []
    if(data.length <= rowsPerPage) {
        return {
            data: [ data ],
            totalPage: 1,
            rawData: data
        }
    } else {
        let rowsCount = 0;
        let tempArr = []
        for(let i = 0; i < data.length; i++) {
            tempArr.push(data[i])
            if(rowsCount === rowsPerPage - 1) {
                rowsCount = 0;
                pageWiseTableData.push(tempArr)
                tempArr = [];
            } else {
                rowsCount ++;
            }
        }
        return {
            data: pageWiseTableData,
            totalPages: pageWiseTableData.length,
            rawData: data
        }
    }
}