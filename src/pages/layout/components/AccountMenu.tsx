// 3rd party
import React from 'react';
import {
  Box,
  CardHeader,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem
} from '@mui/material';
import { Logout, Menu as MenuIcon, Settings } from '@mui/icons-material';
// local
import { AccountMenuProps } from '../../../store';
import { getCardHeaderStyles, ToolbarMenuPaperProps } from './styles';

export const AccountMenu = ({
  isLoggedIn,
  handleClick,
  handleClose,
  menuElement,
  isMenuOpen,
  onSignOut,
  onInitSettings
}: AccountMenuProps) => (
  <>
    <Box sx={{ flexGrow: 0 }}>
      <CardHeader
        sx={getCardHeaderStyles(isLoggedIn)}
        titleTypographyProps={{
          paddingRight: '10px'
        }}
        avatar={
          <IconButton onClick={handleClick}>
            <MenuIcon
              fontSize="large"
              sx={{
                float: 'right'
              }}
            />
          </IconButton>
        }
      />
    </Box>
    <Menu
      anchorEl={menuElement}
      id="toolbar-menu"
      open={isMenuOpen}
      onClose={handleClose}
      PaperProps={ToolbarMenuPaperProps}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
      <MenuItem onClick={onInitSettings}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={onSignOut}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  </>
);
