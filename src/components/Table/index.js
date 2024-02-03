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

const ASCENDING = 'asc';
const DESCENDING = 'desc'

const sortData = (a, b, sortByColumn, orderBy) => {
  if(typeof a[sortByColumn] === 'number'){
    if(orderBy === ASCENDING)
      return a[sortByColumn] - b[sortByColumn]
    else
      return b[sortByColumn] - a[sortByColumn]
  }else {
    if(orderBy === ASCENDING){
      const valA = a[sortByColumn].toUpperCase(); // ignore upper and lowercase
      const valB = b[sortByColumn].toUpperCase(); // ignore upper and lowercase
      if (valA < valB) {
        return -1;
      }
      if (valA > valB) {
        return 1;
      }
      return 0;
    }else {
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

export default function BasicTable(props) {
  const [tableData, setTableData] = useState({orderBy:'', sortByColumn:''})
  const { data } = props
  useEffect(() => {
    
    setTableData(prev => ({ ...prev, rawData: data, data }))
  }, [data]);

  const sortBy = ({orderBy, columnName: sortByColumn}) => {
    const {data = []} = tableData;
    if(orderBy === ASCENDING){
      const ascData = data.sort((a,b)=>sortData(a,b, sortByColumn, orderBy));
      setTableData(prev => ({ ...prev, orderBy, sortByColumn, data: ascData }))
    }else {
      const descData = data.sort((a,b)=>sortData(a,b, sortByColumn, orderBy));
      setTableData(prev => ({ ...prev, orderBy, sortByColumn, data: descData }))
    }
    
  }

  const {sortByColumn, orderBy} = tableData;
  console.log('data', data)
  const tableColumns = ['STATUS', 'PORT', 'VLAN ID', 'MTU', 'SPEED', 'Rx ERROR', 'Rx OCTETS', 'Tx ERRORS', 'Tx OCTETS', 'RX UNKNOWN']
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              tableColumns.map(columnName => <TableCell key={columnName}>
              <span style={{display:'flex', flexDirection:'column'}}>
              {
                orderBy === ASCENDING || orderBy.length === 0 ? <KeyboardArrowUpIcon sx={{color: sortByColumn === columnName && orderBy ===ASCENDING  ? 'black': 'gray'}} onClick={()=>{sortBy({orderBy: DESCENDING, columnName})}}/> : null
              }
              {
                orderBy === DESCENDING || orderBy.length === 0 ? <KeyboardArrowDownIcon sx={{color: sortByColumn === columnName && orderBy === DESCENDING ? 'black': 'gray'}} onClick={()=>{sortBy({orderBy: ASCENDING, columnName})}} /> : null
              }
              </span>
              <span style={{fontWeight: sortByColumn === columnName ? 'bold':'normal'}}> {columnName} </span>
              </TableCell>)
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
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
  );
}
