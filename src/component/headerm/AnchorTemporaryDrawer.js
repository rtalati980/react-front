import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function AnchorTemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: 250,
        display: 'block',
        position: 'relative',
        marginTop: '20px', // 20px gap from the top
        backgroundColor: '#fff', // Ensures the drawer has a white background
        height: 'calc(100vh - 64px - 20px)', // Make sure the drawer covers the full height minus header height and gap
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ul style={{ listStyleType: 'none', margin: '20px', display: 'flex', flexDirection: 'column', gap: '10px', color: '#b16f23' }}>
        <li><Link style={{ color: '#b16f23', textDecoration: 'none' }} to='/'>Home</Link></li>
        <li><Link style={{ color: '#b16f23', textDecoration: 'none' }} to='/'>Track Order</Link></li>
        <li><Link style={{ color: '#b16f23', textDecoration: 'none' }} to='/products'>All Product</Link></li>
        <li><Link style={{ color: '#b16f23', textDecoration: 'none' }} to='/rudraksh'>Rudhraksh</Link></li>
        <li><Link style={{ color: '#b16f23', textDecoration: 'none' }} to='/gemstone'>Gemstone</Link></li>
        <li><Link style={{ color: '#b16f23', textDecoration: 'none' }} to='/about'>About us</Link></li>
        <li><Link style={{ color: '#b16f23', textDecoration: 'none' }} to='/contact'>CONTACT US</Link></li>
      </ul>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('left', true)}><MenuIcon style={{ color: '#b16f23' }} /></Button>
      <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
        sx={{
          '& .MuiPaper-root': {
            marginTop: '190px', // Adjust this based on your header height
            backgroundColor: '#fff',
            color: '#000',
          }
        }} // Styling Drawer Paper
      >
        {list('left')}
      </Drawer>
    </div>
  );
}
