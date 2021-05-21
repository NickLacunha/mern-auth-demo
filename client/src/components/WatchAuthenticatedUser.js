import React, { useEffect } from 'react';
import { useBookContext } from '../util/GlobalState';
import { authenticatedUser } from "../util/api";
import { LOGIN } from '../util/actions';

function WatchAuthenticatedUser() {
    const [state, dispatch] = useBookContext();

    useEffect(() => {
        authenticatedUser()
            .then(response => {
                if (response.data) {
                    dispatch({
                        type: LOGIN,
                        user: response.data
                    });
                }
            })
    }, [])

    return <></>;
}

export default WatchAuthenticatedUser;