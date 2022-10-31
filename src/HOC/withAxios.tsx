import React from 'react';
import HandleAxiosError from "./HandleAxiosError";
import authAxios, {guestAxios} from "../axios";
import apiEndPoints, {processEndPoint as _} from "../apiEndPoints";
import {type WithAxiosProps} from "../types/funcs";

const withAxios = <T,>(WrappedComponent: React.ComponentType<T>) => {

    const axiosEssentials = {authAxios, guestAxios, apiEndPoints, _};

    return (props: Omit<T, keyof WithAxiosProps>) => (
        <HandleAxiosError>
            <WrappedComponent {...(props as T)} {...axiosEssentials} />
        </HandleAxiosError>
    );
};

export default withAxios;