import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicStack() {
  return (
    <Box sx={{ width: '50%', margin: 25, marginLeft:60 }}>
      <Stack spacing={3} alignItems="center">
      <Button size = 'large' variant="contained" color="success" href="/rc">Risk Classification</Button>
      <Button size = 'large' variant="contained" color="success" href='/dd'>Disease Detection</Button>
      <Button size = 'large' variant="contained" color="success" href='/ns'>Nerve Segmentation</Button>
      </Stack>
    </Box>
  );
}