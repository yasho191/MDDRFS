import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ResponsiveStack() {
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
        <Typography variant="h4" gutterBottom>Risk Classification</Typography></Item>
        <Button variant="outlined">Upload Scan</Button>
        <TextField id="outlined-basic" label="Patient ID" />
        <TextField id="outlined-basic" label="Description" />
        <Button variant="contained" href='/report'>Submit</Button>
      </Stack>
    </div>
  );
}