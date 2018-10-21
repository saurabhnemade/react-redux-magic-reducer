
## react-redux-magic-reducer

[![NPM](https://img.shields.io/npm/v/react-redux-magic-reducer.svg)](https://www.npmjs.com/package/react-redux-magic-reducer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.org/saurabhnemade/react-redux-magic-reducer.svg?branch=master)](https://travis-ci.org/saurabhnemade/react-redux-magic-reducer)

  

React-redux bindings for [redux-magic-reducer](https://github.com/saurabhnemade/redux-magic-reducer). 
  

### Why?

Setting up React with dynamic reducers is one of a time consuming task. While redux-magic-reducer simplifies it good enough, getting context and childContextsTypes right in first attempt is always a tricky task. 
To overcome that, this library provides a seamless way to get dynamic/async reducers up and running with no hassle.
  

### Install

```bash
npm install --save redux-magic-reducer react-redux-magic-reducer
```

### How to use

#### 1. Create a Root of App using withProvider

```jsx
import  ReactDOM  from  'react-dom'
import { withProvider, createStore } from  'react-redux-magic-reducer';
import  reducers  from  './reducers/index';
import  App  from  './App'

let  store  =  createStore(reducers);

ReactDOM.render(withProvider(App, { store:  store}), document.getElementById('root'))
```

#### 2. Creating a connected component with dynamic reducer using magicConnect

```jsx
import  MagicComponent  from  './MagicComponent';
import  MagicActions  from  './actions/magic-actions';
import  Reducer  from  './reducer/magicReducer';
import { magicConnect } from  'react-redux-magic-reducer';
import { bindActionCreators } from  "redux";

const  mapStateToProps  = (state, ownProps) => {
	return {
		counter :  state.dynamic.counter,
		name :  state.dynamic.name
	};
}

const  mapDispatchToProps  = (dispatch) => {
	return {
		increaseCounter :  bindActionCreators(MagicActions.increaseCounter, dispatch),
		decreaseCounter :  bindActionCreators(MagicActions.decreseCounter, dispatch)
		}
};
export  default  magicConnect(mapStateToProps, mapDispatchToProps)(MagicComponent, 'dynamic', Reducer);
```

For detailed example on how to use it, please take a look at example directory.

## Upcoming/Under development
 1. React 16 context migration
 2. API Documentation
 3. Add more examples with different connect properties
 4. Add example of injection of context properties.

## License

MIT © [saurabhnemade](https://github.com/saurabhnemade)