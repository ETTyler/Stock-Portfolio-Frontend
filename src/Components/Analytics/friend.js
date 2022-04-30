import * as React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const SetColours = ({percent}) => {
  if (percent > 0) {
    return(
      <>
        <Typography variant="body1" component="div" sx={{color:'#1976d2'}}>
          +{percent}%
        </Typography>
      </>
    )
  }
  return (
    <>
      <Typography variant="body1" component="div" sx={{color:'#1976d2'}}>
        {percent}%
      </Typography>
    </>
  )
}

const Friend = ({ data }) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', padding: '1.2%', width: 'max-content', alignItems: 'center'}}>
      <Avatar alt={data.name} src="/static/images/avatar/1.jpg" sx={{ width: 50, height: 50 }} />
    <div style={{display: 'flex', flexDirection: 'column', paddingLeft: 10}}>
      <Typography variant="body1" component="div">
        {data.name}
      </Typography>
      <SetColours percent={data.percent} />
    </div>
  </div>
  )
}

export default Friend;
