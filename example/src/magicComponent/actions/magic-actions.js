const MagicActions = {
    increaseCounter: () => {
       return{
          type: 'MAGIC_COMPONENT_INCREASE_COUNT'
       };
    },
    decreseCounter: () => {
        return {
            type: 'MAGIC_COMPONENT_DECREASE_COUNT'
        };
    }
};

export default MagicActions;