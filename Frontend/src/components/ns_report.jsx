import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ResponsiveStack5() {
  return (
    <div>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        marginTop="10%"
        marginLeft={30}
      >
        <Item>
        <Typography variant="h3" gutterBottom>Nerve Segmentation</Typography></Item>
        <Button variant="outlined">Print</Button>
        <Item>Pdf report for performed test</Item>
        <CircularProgress />
        </Stack> 
    </div>
  );
}