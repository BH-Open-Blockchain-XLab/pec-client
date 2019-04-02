import React from 'react';
import ReactDOM from 'react-dom';

import ConfirmDialog from './ConfirmDialog';
import InfoDialog from './InfoDialog';

function Dialog(props){
  return (
    <div>
	  <ConfirmDialog />
	  <InfoDialog />
	</div>
  );
}

export default Dialog;

