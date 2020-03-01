import React from 'react';

import Main from "../template/main";

import "./notFound.css"
// import { Container } from './styles';

export default function notFound() {
  return (
    <Main>
      <div id="notFoundScreen">
        <h2 className="text-muted">Nothing Here...</h2>
      </div>
    </Main>
  );
}
