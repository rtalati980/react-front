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
        display: 'block', // Display as block element
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ul style={{ listStyleType: 'none', padding: 40, margin: '40px', display: 'flex', flexDirection: 'column' ,color: '#b16f23'}}>
  <li ><Link style={{color: '#b16f23' }} to='/'>Home</Link></li>
  <li><Link style={{color: '#b16f23'}} to='/products'>All Product</Link></li>
  <li><Link style={{color: '#b16f23'}} to='/rudraksh'>Rudhraksh</Link></li>
  <li><Link  style={{color: '#b16f23'}} to='/gemstone'>Gemstone</Link></li>
  <li><Link  style={{color: '#b16f23'}} to='/about'>About us</Link></li>
  <li><Link style={{color: '#b16f23'}} to='/contact'>CONTACT US</Link></li>
</ul>
    </Box>
  );
  return (
    <div  style={{padding:20} }>
      {/* Replacing the button with MenuIcon */}
      <Button onClick={toggleDrawer('left', true) }><MenuIcon  style={{color: '#b16f23'}}/></Button>
      <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </div>
  );
}
