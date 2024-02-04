import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { sortData, parseTableData } from './utils';
import { ASCENDING, DESCENDING, tableColumns } from './constants';
import './styles.scss'

export default function BasicTable(props) {
  const { data = {}, rowsPerPage = 10 } = props
  const [tableData, setTableData] = useState({ countLabel: '', orderBy: '', sortByColumn: '', currentPage: 0})
  useEffect(() => {
    if(data){
      console.log('component did update', props)
      const parsedData =  parseTableData(props.data, rowsPerPage, currentPage)
      const {data, totalPages, rawData, pages, countLabel} = parsedData;
      console.log('parsedData', parsedData)
      if(pages.length > 0){
        setTableData(prev => ({ ...prev, data, totalPages, rawData, pages, countLabel, currentPage: 0 }))
      }else{
        setTableData(prev => ({ ...prev, data, totalPages, rawData, pages, countLabel }))
      }
    }
  }, [data]);

  const sortBy = ({ orderBy, columnName: sortByColumn }) => {
    const { currentPage} = tableData;
    if (orderBy === ASCENDING) {
      const ascData = tableData.data[currentPage].sort((a, b) => sortData(a, b, sortByColumn, orderBy));
      const tableRows = [...tableData.data]
      tableRows[currentPage] = ascData
      setTableData(prev => ({ ...prev, orderBy, sortByColumn, data: tableRows }))
    } else {
      const descData = tableData.data[currentPage].sort((a, b) => sortData(a, b, sortByColumn, orderBy));
      const tableRows = [...tableData.data]
      tableRows[currentPage] = descData
      setTableData(prev => ({ ...prev, orderBy, sortByColumn, data: tableRows }))
    }
  }

  const onPageSelect = (pageNumber) => {
    const parsedData =  parseTableData(props.data, rowsPerPage, pageNumber)
      const {data, totalPages, rawData, pages, countLabel} = parsedData;
    setTableData(prev => ({...prev, currentPage: pageNumber, orderBy: '', sortByColumn: '', data, countLabel}))
  }

  const { sortByColumn, orderBy, pages = [], currentPage = 0, countLabel} = tableData;
  console.log('data', tableData)

  if(!tableData.data){
    return null
  }
 
  return (
    <div className='table-container'>
    <div className='table-filters'>
      <select className="sort" name="sort" id="sort">
      <option disabled value="" selected>sort By</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>

      <select className="filter" name="filter" id="filter">
        <option disabled value="" selected>Filter By</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>

    <div className="search">
      <label for="lname">Search</label>
      <input type="text" id="lname" name="lname"></input>
    </div>

    </div>
    <div className='table-wrapper'>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} >
        <TableHead>
          <TableRow>
            {
              tableColumns.map(columnName => <TableCell key={columnName} className='table-header-column'>
                <span className='table-header-cell'>
                  <span className='sort-icons'>
                  {
                    orderBy === ASCENDING || orderBy.length === 0 ? <KeyboardArrowUpIcon sx={{ color: sortByColumn === columnName && orderBy === ASCENDING ? 'black' : 'gray' }} onClick={() => { sortBy({ orderBy: DESCENDING, columnName }) }} /> : null
                  }
                  {
                    orderBy === DESCENDING || orderBy.length === 0 ? <KeyboardArrowDownIcon sx={{ color: sortByColumn === columnName && orderBy === DESCENDING ? 'black' : 'gray' }} onClick={() => { sortBy({ orderBy: ASCENDING, columnName }) }} /> : null
                  }
                  </span>
                <span style={{ fontWeight: sortByColumn === columnName ? 'bold' : 'normal' }}> {columnName} </span>
                </span>
              </TableCell>)
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.data[currentPage].map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {
                tableColumns.map(columnName => <TableCell component="th" scope="row" key={columnName}> {row[columnName]} </TableCell>)
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    
    <div className='table-pagination'>
      <div className='page-count'>
        {countLabel}
      </div>
      <div className='pagination'>
        {
          pages.map((page,i)=> <button key={i} onClick={()=>{onPageSelect(i)}} className={`page-button ${currentPage === i ? 'active-button':''}`}>{page}</button>)
        }
      </div>
      <div className='rows-per-page'>
        Show per Page # {rowsPerPage}
      </div>
    </div>
    </div>
  );
}
