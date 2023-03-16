import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function Variants() {
  return (
    <Box sx={{p: 10, width: '70%', marginLeft: 30,  }}>
        <Stack spacing={3}>
      <Skeleton animation={false} variant="circular" width={150} height={150} />
      <Skeleton animation={false} variant="text" sx={{ fontSize: '5rem' }} />
      <Skeleton animation={false} variant="rectangular" width={500} height={100} />
      <Skeleton animation={false} variant="rounded" width={500} height={100} />
    </Stack>
    </Box>
    
  );
}