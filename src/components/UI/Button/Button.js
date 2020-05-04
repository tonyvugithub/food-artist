import React from 'react';
import styles from './Button.module.scss'

const button = (props) => (
  <button
    className={[styles.Button, styles[props.btnType]].join(' ')}
    type={props.type}
    onClick={props.onclick}
  >
    {props.children}
  </button>
);

export default button;
