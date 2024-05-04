import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';

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
  <li ><a style={{color: '#b16f23' }} href='/'>Home</a></li>
  <li><a style={{color: '#b16f23'}} href='/products'>All Product</a></li>
  <li><a style={{color: '#b16f23'}} href='/rudraksh'>Rudhraksh</a></li>
  <li><a  style={{color: '#b16f23'}} href='/gemstone'>Gemstone</a></li>
  <li><a  style={{color: '#b16f23'}} href='/about'>About us</a></li>
  <li><a style={{color: '#b16f23'}} href='/contact'>CONTACT US</a></li>
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
