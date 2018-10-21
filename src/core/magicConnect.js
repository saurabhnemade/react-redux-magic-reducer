import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import {connect} from 'react-redux';

const magicConnect = (mapStateToPropsFactories, mapDispatchToPropsFactories, mergePropsFactories, selectorFactory) => (WrappedComponent, dynamicPath, reducer) => {
    class MagicConnect extends PureComponent {
      static displayName = WrappedComponent.displayName || WrappedComponent.name;
      static contextTypes = {
        store: PropTypes.object
      };

      static childContextTypes = {
        store: PropTypes.object
      }

      getChildContext() {
        return {
          store: this.context.store
        }
      }

      constructor(props, context) {
        super(props, context);
        const storeKey = props.storeKey || 'store';
        this.store = props[storeKey] || context[storeKey];

        invariant(this.store,
          `Could not find "${storeKey}" in either the context or props of. Either wrap the root component in a <Provider>, ` +
          `or explicitly pass "${storeKey}" to "${this.getDisplayName()}" as a prop.`
        );

        this.addReducer(this.store, dynamicPath, reducer);
      }

      getDisplayName () {
        return `MagicConnect(${this.displayName})`
      }

      addReducer(store, path, reducer) {
        invariant(store.attachReducer,
          `Could not find "attachReducer" method in store. Make sure you are passing store created from redux-magic-reducer`
        );
        store.attachReducer(path, reducer);
      }

      render() {
        const ConnectedComponent = connect(mapStateToPropsFactories, mapDispatchToPropsFactories, mergePropsFactories, selectorFactory)(WrappedComponent);
        return (
          <ConnectedComponent {...this.props} />
        );
      }
  }

  return MagicConnect;

};

export default magicConnect;