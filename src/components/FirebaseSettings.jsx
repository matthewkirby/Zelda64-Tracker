import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

const FirebaseSettings = ({ firebaseControls }) => {

  const { useFirebase, setUseFirebase } = firebaseControls;
  console.log(useFirebase)

  return (
    <div className="one-column-grid">
      <Button
        key={"dbtoggle"}
        variant="contained"
        color={useFirebase ? "error" : "primary"}
        onClick={() => setUseFirebase(!useFirebase)}
      >
        {useFirebase ? "Close Connection" : "Sync Tracker"}
      </Button>
    </div>
  );
};

FirebaseSettings.propTypes = {
  firebaseControls: PropTypes.shape({
    useFirebase: PropTypes.bool.isRequired,
    setUseFirebase: PropTypes.func.isRequired
  }).isRequired
}

export { FirebaseSettings };