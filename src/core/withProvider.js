import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

/**
 * This is a necessary abstraction for root component which I find always bit tricky to get right in one go.
 * To avoid common errors with contextTypes and childContextTypes, it is advised to use this instead of creating provider.
 * 
 * You can find why it is required to pass childContextTypes here : https://egghead.io/lessons/react-redux-passing-the-store-down-implicitly-via-context
 * 
 * Props must contain store.
 * contextTypes, childContextTypes and getChildContext are optional.
 * However, I find it necessary to give a override mechanism for them as they might be required in cases like using router.
 * 
 * @param {*} BaseComponent 
 * @param {*} props 
 * @param {*} contextTypes 
 * @param {*} childContextTypes 
 * @param {*} getChildContext 
 */
const withProvider = (BaseComponent, props, contextTypes, childContextTypes, getChildContext) => {    
    /**
     * If passed contextTypes it will ignore default mentioned below.
     * Make sure to have store in passed one if you are passing contextTypes
     */
    const targetContextTypes = contextTypes ? contextTypes : {
        store: PropTypes.object
    };

    /**
     * If passed childContextTypes it will ignore default mentioned below.
     * Make sure to have store in passed one if you are passing childContextTypes
     */ 
    const targetChildContextTypes = childContextTypes ? childContextTypes : {
        store: PropTypes.object
    }

    /**
     * If passed getChildContext it will ignore default function mentioned below.
     * Make sure to have store in passed one if you are passing getChildContext
     * please take a look at for why it is needed : https://egghead.io/lessons/react-redux-passing-the-store-down-implicitly-via-context
     */
    const targetGetChildContext = getChildContext ? getChildContext : function () {
        return {
            store: this.context.store
        };
    }

    class WrappedComponent extends PureComponent {
        static contextTypes = targetContextTypes;
        static childContextTypes = targetChildContextTypes;
        getChildContext = targetGetChildContext;

        render() {
            return <BaseComponent {...this.props} />
        }
    }
    
    return (
        <Provider {...props}>
            <WrappedComponent {...props}/>
        </Provider>
    );
};

export default withProvider;