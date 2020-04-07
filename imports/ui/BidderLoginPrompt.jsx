import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BidderLoginDialog } from './BidderLoginDialog';

export const BidderLoginPrompt = () => {
  const [ showDialog, setShowDialog ] = useState(false);

  handleLoginButtonClick = () => setShowDialog(true);
  handleDialogClose = () => setShowDialog(false);

  return (
    <>
      <p>In order to bid, you must log in with a valid e-mail address.</p>
      <p>
        <Button onClick={handleLoginButtonClick}>Log In</Button>
      </p>
      <BidderLoginDialog show={showDialog} onHide={handleDialogClose} />
    </>
  );
};