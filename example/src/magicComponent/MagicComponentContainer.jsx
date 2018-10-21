import MagicComponent from './MagicComponent';
import MagicActions from './actions/magic-actions';
import Reducer from './reducer/magicReducer';
import { magicConnect } from 'react-redux-magic-reducer';
import { bindActionCreators } from "redux";

const mapStateToProps = (state, ownProps) => {
    return {
        counter : state.dynamic.counter,
        name : state.dynamic.name
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        increaseCounter : bindActionCreators(MagicActions.increaseCounter, dispatch),
        decreaseCounter : bindActionCreators(MagicActions.decreseCounter, dispatch)
    }
};

export default magicConnect(mapStateToProps, mapDispatchToProps)(MagicComponent, 'dynamic', Reducer);