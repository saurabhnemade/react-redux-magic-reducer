import React, { Component } from 'react';
import MagicComponentContainer from './magicComponent/MagicComponentContainer';

export default class App extends Component {
  render () {
    return (
      <div>
        Magic react-redux simple example
        <MagicComponentContainer/>
      </div>
    )
  }
}
