// 3rd party
import React from 'react';
import { PopoverProps } from '@mui/material/Popover';
// local
import { FBUser } from './User';

export type AccountMenuProps = {
  isLoggedIn: boolean;
  user: FBUser;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  menuElement: PopoverProps['anchorEl'] | null;
  isMenuOpen: boolean;
  handleClose: () => void;
  onSignOut: (e: any) => void;
  onInitSettings: (e: any) => void;
};
