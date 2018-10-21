const INITIAL_STATE = {
    name: "magic reducer",
    counter: 0
};

const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "MAGIC_COMPONENT_INCREASE_COUNT":
            return {
                ...state,
                counter: state.counter + 1
            };
        case "MAGIC_COMPONENT_DECREASE_COUNT":
            return {
                ...state,
                counter: state.counter - 1
            };
        default: 
            return state;
    }
}

export default Reducer;