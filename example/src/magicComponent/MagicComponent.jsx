import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MagicComponent extends Component {
    static propTypes = {
        counter: PropTypes.number,
        increaseCounter: PropTypes.func,
        decreaseCounter: PropTypes.func
    }

    componentDidMount() {
        this.increaseInterval = setInterval(() => {
            this.props.increaseCounter();
        }, 1000);
        this.decreaseInterval = setInterval(() => {
            this.props.decreaseCounter();
            this.props.decreaseCounter();
        }, 4000);
    }

    compnentWillUnmount() {
        clearInterval(this.increaseInterval);
        clearInterval(this.decreaseInterval);
    }

    render() {
        return (
            <div>
                This component contains state from dynamic reducer
                <div>Name: {this.props.name}</div>
                <div>Counter value: {this.props.counter}</div>
            </div>
        );
    }
}