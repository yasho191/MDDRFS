import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function DirectionStack() {
  return (
    <Box sx={{ width: '50%' }}>
        <div>
            <Stack direction="row" spacing={10} p={10} marginLeft={40}>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
            </Stack>
        </div>
        <Stack direction="row" spacing={5} p={20} marginLeft={30}>
        <Avatar alt="Doctor" src=" " sx={{ width: 200, height: 200}}/>
        <Item>Doctor Details</Item>
        </Stack>
        
    </Box>
    
  );
}