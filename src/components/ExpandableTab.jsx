import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import 'style/expandable_tab.css';

const ExpandingTab = (props) => {
  return (
    <div className="settings-tab" style={props.trackerOptions.trackerSize.style}>
      <div className="settings-header font-face-labels" onClick={() => props.onClick()}>
        {props.isVisible ? <div className="icon"><FontAwesomeIcon icon={faAnglesDown} size="1x" /></div> : null}
        {!props.isVisible ? <div className="icon"><FontAwesomeIcon icon={faAnglesRight} size="1x" /></div> : null}
        <label>{props.label}</label>
      </div>
      {props.isVisible ? <div className="settings-body">
        {props.children}
      </div> : null}
    </div>
  );
}

ExpandingTab.propTypes = {
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  trackerOptions: PropTypes.shape({ trackerSize: PropTypes.shape({ number: PropTypes.number.isRequired}) })
}

export { ExpandingTab };