import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";

import { magicConnect, withProvider, createStore} from './../';
import SampleAppComponent from './SampleAppComponent';
import { expect } from 'chai';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, render } from 'enzyme';

configure({ adapter: new Adapter() });

describe('Test WithProvider', () => {
  let wrapper;
  let store;

  const createWrappedComponent = (props) => {
    return withProvider(SampleAppComponent, props);
  }

  const createWrapperdInstance = (props) => {
    return shallow(createWrappedComponent(props)).instance();
  }

  const createWrapperWithContext = (props, contextTypes, childContextTypes, getChildContext) => {

    class TestClass extends Component {
      render() {
        return (
          <div>Sample class</div>
        );
      }
    }

    return withProvider(SampleAppComponent, props, contextTypes, childContextTypes, getChildContext);
  }  

  const createWrapperInstanceWithContext = (props, contextTypes, childContextTypes, getChildContext) => {
    return shallow(createWrapperWithContext(props, contextTypes, childContextTypes, getChildContext)).instance();
  }

  beforeEach(() => {
    const reducers = {
      app: () => {
        return {
          appName: 'react-redux-magic-reducer-example'
        };
      }
    };

    const dynamicReducer = (state = { dynamicKey: "I am dynamic" }, action) => {
      switch(action.type) {
        default:
          return state;
      }
    };
    store = createStore(reducers);
    expect(store.getState().app.appName).to.equal('react-redux-magic-reducer-example');
  });

  it('Testing sample rendered component to ensure test setup is working.', () => {
    const wrapper = render(<SampleAppComponent/>);
    expect(wrapper).not.equal(null);
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('Create withProvider instance', () => {
    const instance = withProvider(SampleAppComponent, { store: store});
    expect(instance).not.equal(null);
  });

  it('Create withProdiver instance should have given contents', () => {
    const withProviderInstance = withProvider(SampleAppComponent, { store: store});
    expect (withProviderInstance).not.equal(null);
    expect (withProviderInstance).not.equal({});
    const wrapper = render(withProviderInstance);
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('store prop is passed to the Rendering component', () => {
    const withProviderInstance = withProvider(SampleAppComponent, { store: store});
    expect (withProviderInstance).not.equal(null);
    expect (withProviderInstance).not.equal({});
    const wrapper = shallow(withProviderInstance);
    const wrapperInstance = wrapper.instance();
    expect(wrapperInstance.props.store).equal(store); //perhaps there is better way?
  });

  it('prop string is passed to component', () => {
    const wrapperInstance = createWrapperdInstance({ store: store, customProp: "myOwnCustomProp"});
    expect(wrapperInstance.props.store).equal(store);
    expect(wrapperInstance.props.customProp).equal("myOwnCustomProp");
  });

  it('prop Infinty is passed to component', () => {
    const wrapperInstance = createWrapperdInstance({ store: store, customProp: Infinity});
    expect(wrapperInstance.props.store).equal(store);
    expect(wrapperInstance.props.customProp).equal(Infinity);
  });

  it('prop Number is passed to component', () => {
    const wrapperInstance = createWrapperdInstance({ store: store, customProp: 1});
    expect(wrapperInstance.props.store).equal(store);
    expect(wrapperInstance.props.customProp).equal(1);
  });

  it('prop boolean is passed to component', () => {
    const wrapperInstance = createWrapperdInstance({ store: store, customProp: false});
    expect(wrapperInstance.props.store).equal(store);
    expect(wrapperInstance.props.customProp).equal(false);
  });

  it('prop function is passed to component', () => {
    const wrapperInstance = createWrapperdInstance({ store: store, customProp: () => { return 'customMe'} });
    expect(wrapperInstance.props.store).equal(store);
    expect(typeof wrapperInstance.props.customProp).equal('function');
    expect(wrapperInstance.props.customProp()).equal('customMe');
  });

  it('prop json object is passed to component', () => {
    const wrapperInstance = createWrapperdInstance({ store: store, customProp: {a: 1}});
    expect(wrapperInstance.props.store).equal(store);
    expect(wrapperInstance.props.customProp).to.deep.equal({a: 1});
  });

  it('prop json array is passed to component', () => {
    const wrapperInstance = createWrapperdInstance({ store: store, customProp: [{a: 1}]});
    expect(wrapperInstance.props.store).equal(store);
    expect(wrapperInstance.props.customProp).to.deep.equal([{a: 1}]);
  });

  it('context should be empty without passing childContext and other props', () => {
    const wrapperInstance = createWrapperInstanceWithContext({ store: store },
      {
        store: PropTypes.object
      });
    expect(wrapperInstance.props.store).equal(store);
    expect(wrapperInstance.context).to.deep.equal({});
  });

  it('context should be present by passing childContext and other props', () => {
    const wrapperInstance = createWrapperInstanceWithContext({ store: store },
      {
        store: PropTypes.object
      }, {
        store: PropTypes.object,
        abc: 'abc'
      }, function() {
        return {
          store: this.context.store,
          abc: this.context.abc
        }
      });

    expect(wrapperInstance.props.children.type.childContextTypes.abc).equal('abc');
  });
});


describe('Test magicConnect', () => {
  let wrapper;
  let store;

  const createWrappedComponent = (props) => {
    return withProvider(SampleAppComponent, props);
  }

  const createWrapperdInstance = (props) => {
    return shallow(createWrappedComponent(props)).instance();
  }

  const createWrapperWithContext = (props, contextTypes, childContextTypes, getChildContext) => {

    class TestClass extends Component {
      render() {
        return (
          <div>Sample class</div>
        );
      }
    }

    return withProvider(TestClass, props, contextTypes, childContextTypes, getChildContext);
  }  

  const createWrapperInstanceWithContext = (props, contextTypes, childContextTypes, getChildContext) => {
    return shallow(createWrapperWithContext(props, contextTypes, childContextTypes, getChildContext)).instance();
  }

  /** TEST REDUX DYNAMIC SETUP START */

  class TargetClass extends Component {
    static propTypes = {
        counter: PropTypes.number,
        increaseCounter: PropTypes.func,
        decreseCounter: PropTypes.func
    };
    render() {
      return (
        <div className='target'>
          {this.props.counter}
        </div>
      );
    }
  };
  const Reducer = (state = { counter : 0 }, action) => {
      switch(action.type) {
        case 'INCREASE':
          return {...state, counter: state.counter+1};
        case 'DECREASE':
          return {...state, counter: state.counter-1};
        default:
          return state;
      }
  };  

  const increaseCounter = () => dispatch => {
    dispatch({
      type: 'INCREASE'
    });
  };
  const decreseCounter = () => dispatch => {
    dispatch({
      type: 'DECREASE'
    });
  };
 
  /** TEST SETUP END */

  beforeEach(() => {
    const reducers = {
      app: () => {
        return {
          appName: 'react-redux-magic-reducer-example'
        };
      }
    };

    const dynamicReducer = (state = { dynamicKey: "I am dynamic" }, action) => {
      switch(action.type) {
        default:
          return state;
      }
    };
    store = createStore(reducers);
    expect(store.getState().app.appName).to.equal('react-redux-magic-reducer-example');
  });

  it('Testing sample rendered component to ensure test setup is working.', () => {
    const wrapper = render(<SampleAppComponent/>);
    expect(wrapper).not.equal(null);
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('only mapStateToProps', () => {
    const mapStateToProps = (state, ownProps) => {
      return {
        counter: state.dynamic.counter
      };
    };
  
    const MagicConnectedComponent = magicConnect(mapStateToProps)(TargetClass, 'dynamic', Reducer);

    class TestAppClass extends Component {
      render() {
        return (
          <div>
            <div>Sample encapsulating class</div>
            <MagicConnectedComponent />
          </div>
        );
      }
    }

    const wrappedComponent = render(withProvider(TestAppClass, {store: store}));
    expect(wrappedComponent.find('.target')).to.have.length(1);
    expect(parseInt(wrappedComponent.find('.target').text())).equal(0);
  });

  it('mapStateToProps & mapDispatchToProps', () => {
    const mapStateToProps = (state, ownProps) => {
      return {
        counter: state.dynamic.counter
      };
    };
    
    const mapDispatchToProps = (dispatch) => {
      return {
          increaseCounter : bindActionCreators(increaseCounter, dispatch),
          decreseCounter : bindActionCreators(decreseCounter, dispatch)
      }
    };
  
    const MagicConnectedComponent = magicConnect(mapStateToProps, mapDispatchToProps)(TargetClass, 'dynamic', Reducer);

    class TestAppClass extends Component {
      render() {
        return (
          <div>
            <div>Sample encapsulating class</div>
            <MagicConnectedComponent />
          </div>
        );
      }
    }

    const mountedComponent = mount(withProvider(TestAppClass, {store: store}));
    const child = mountedComponent.find('.target');
    expect(child.text()).equal('0');
    mountedComponent.instance().props.store.dispatch({
      type: 'INCREASE'
    });
    expect(child.text()).equal('1');
    mountedComponent.instance().props.store.dispatch({
      type: 'DECREASE'
    });
    expect(child.text()).equal('0');
    mountedComponent.instance().props.store.dispatch({
      type: 'DECREASE'
    }); 
    expect(child.text()).equal('-1');
  });
});