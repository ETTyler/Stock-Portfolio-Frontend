import * as React from 'react';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import Differential from './differential';
import InfoBar from './infoBar';
import BottomBar from './bottomBar'
import AnalyticsGraph from './analyticsGraph';
import SideBar from './sideBar'

const Analytics = () => {
  return (
      <Box 
        sx={{ 
          px: 12,
          paddingTop: 3,
          maxWidth: '100%',
          width: 'auto',
          display: 'grid',
          gridTemplateRows: 'auto',
          gridTemplateColumns: 'repeat(3, 1fr)',
          justifyContent: 'center',
          gap: 3,
          rowGap: 1,
          gridTemplateAreas: `"infoBar infoBar friends"
          "graph graph friends"
          "stocksInfo stocksInfo friends"`
        }}
      >
        <Paper elevation={0} sx={{
          gridArea: 'infoBar', 
          height: 'auto', 
          width: '68vw', 
          maxWidth: '75vw',
          overflowY: 'hidden',
          overflowX: 'auto',
          display: 'flex', 
          flexDirection: 'row', 
          justifySelf: 'center', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '1vw'
        }}>
          <InfoBar />
          <Differential />
        </Paper>
        <Paper elevation={3} sx={{
          gridArea: 'friends', 
          height: '82vh', 
          width: '20vw', 
          overflowY: 'hidden',
          overflowX: 'auto',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start', 
          justifyContent: 'flex-start',
          p: 4,
          borderRadius: 6
        }}>
          <SideBar />
        </Paper>
        <Paper elevation={3} sx={{
          gridArea: 'graph', 
          height: 'auto', 
          padding: 1,
          borderRadius: 6
        }}>
          <AnalyticsGraph />
        </Paper>
        <Paper elevation={0} sx={{
          gridArea: 'stocksInfo', 
          height: 'auto', 
          width: '68vw', 
          maxWidth: '95vw',
          overflowY: 'hidden',
          overflowX: 'auto',
          display: 'flex', 
          flexDirection: 'row', 
          justifySelf: 'center', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderRadius: 6,
        }}>
          <BottomBar />
        </Paper>
      </Box>
  )
}

export default Analytics;
