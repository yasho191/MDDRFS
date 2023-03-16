import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from "react-router-dom";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
        field: 'visits',
        headerName: 'Visits',
        type: 'number',
        width: 90,
    },
    { field: 'Scans', headerName: 'Scans', width: 130 },
    { field: 'Report', headerName: 'Report', width: 130 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: '', firstName: '', age: null, visits: null, Scans: '', Report: '' },
    { id: 2, lastName: '', firstName: '', age: null, visits: null, Scans: '', Report: '' },
    { id: 3, lastName: '', firstName: '', age: null, visits: null, Scans: '', Report: '' },
    { id: 4, lastName: '', firstName: '', age: null, visits: null, Scans: '', Report: '' },
    { id: 5, lastName: '', firstName: '', age: null, visits: null, Scans: '', Report: '' },
  ];

export default function BasicTextFields() {
    return (
      <Box
        component="form"
        sx={{ flexGrow: 1, 
          '& > :not(style)': { m: 1, width: '50ch', marginLeft: '20%', marginTop: '5%' },
        }}
        noValidate
        autoComplete="off"
      >
        <Toolbar>       
            <TextField id="outlined-basic" label="Search by Patient ID" variant="outlined" />           
                <IconButton aria-label="search">
                  <SearchIcon />
                </IconButton>
            
        </Toolbar>
        <Stack direction="row" spacing={3}>
       <IconButton aria-label="add">
       <NavLink to="/add-patient">
          <AddIcon />
        </NavLink>
        
       </IconButton>
      </Stack>
      <div style={{ height: 400, width: '75%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
      </Box>
    );
  }