import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, Link, useLocation
} from "react-router-dom"
import PersonIcon from '@mui/icons-material/Person';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

const pages = [
  [
    'Portfolio',
    '/portfolio',
    0
  ],
  [
    'Insights',
    '/insights',
    1
  ],
  [
    'Analytics',
    '/analytics',
    2
  ]
]

const settings = [
  [
    'Profile',
    '/profile',
    <PersonIcon color='primary'/>
  ],
  [
    'Settings',
    '/settings',
    <SettingsIcon color='primary'/>
  ],
  [
    'Logout',
    '/login',
    <LogoutIcon color='primary'/>
  ]
]

const Navbar = ({ username }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { pathname } = useLocation()
  const setThis = (path) => {
    if (path === '/portfolio') {
      return 0
    }
    if (path === '/insights') {
      return 1
    }
    if (path === '/analytics') {
      return 2
    }
  }

  const [value, setValue] = useState(setThis(pathname));
  useEffect(() => {
    setValue(setThis(pathname))
  }, [pathname])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{boxSizing: 'border-box'}}>
      <Container maxWidth="1">
        <Toolbar disableGutters>          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={page[1]}>
                  <Typography textAlign="center">{page[0]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Tabs
            onChange={(e, v) => {
              setValue(v)
            }}
            value={value}
            aria-label="Navigation Tabs"
            textColor="inherit"
            TabIndicatorProps={{
              style: {
                backgroundColor: "white",
                height: '0.15rem'
              }
            }}
          >
            {pages.map((page) => (
              <Tab label={page[0]} 
                component={Link} 
                to={page[1]} 
                key={page} 
                sx={{mx: 3}}/>
            ))}
          </Tabs>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Typography variant="body1" mr={1} color="white">{username}</Typography>
                <Avatar alt={username} src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting}
                  onClick={handleCloseNavMenu} 
                  component={Link} 
                  to={setting[1]}>
                  <ListItemIcon>
                    {setting[2]}
                  </ListItemIcon>
                  <Typography textAlign="center">{setting[0]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
