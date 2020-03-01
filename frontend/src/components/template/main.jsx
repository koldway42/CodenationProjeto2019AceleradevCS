import React from 'react';

import "./main.css"
// import { Container } from './styles';

export default function template(props) {
  return (
    <div id="Main">
        {props.children}
    </div>
  );
}
