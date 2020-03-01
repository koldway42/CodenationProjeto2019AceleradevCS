import React from 'react';
import { HashRouter } from "react-router-dom"

import Header from "../components/template/header"
import Router from "./routes";
import Footer from "../components/template/footer"
import Aside from "../components/template/aside"

import "./app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css"
// import { Container } from './styles';

export default function main() {
  return (
    <HashRouter>
      <div id="App">
        <Aside/>
          <div id="Page-Wrapper">
            <Header />
            <Router />
            <Footer />
          </div>
      </div>
    </HashRouter>
  );
}
