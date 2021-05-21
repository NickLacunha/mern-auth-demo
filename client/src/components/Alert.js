import React from 'react';
import { CLOSE_ALERT } from '../util/actions';
import { useBookContext } from '../util/GlobalState';
import Toast from 'react-toast-component';

function Alert() {
    const [state, dispatch] = useBookContext();

    const closeToast = () => {
        dispatch({ type: CLOSE_ALERT });
    }
    return (
        <Toast
            isOpen={state.alertOpen}
            title={state.alertMessage}
            duration={5000}
            hasAutoDismiss={true}
            closeCallback={() => closeToast(false)}
            hasCloseBtn={true}
        />);
}

export default Alert