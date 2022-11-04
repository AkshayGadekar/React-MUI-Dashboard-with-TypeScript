import React, {useState, useEffect} from 'react';
import apiEndPoints from "../../apiEndPoints";
import {useNavigate} from "react-router-dom";
import withAxios from '../../HOC/withAxios';
import type {FetchUserProps} from '../../types/utilityComponents';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchUser, loggedIn, gotUser } from '../../store/slices/userSlice';
import DesktopLoader from './DesktopLoader';

const FetchUser = (props: FetchUserProps) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        
        props.authAxios({...apiEndPoints.auth.getUserDetails})
        .then(res => {
            const successResponse = res.data;
            console.log('successResponse', successResponse);
            dispatch(gotUser(successResponse));
        })
        .catch(error => {
            dispatch(loggedIn(false));
        })
        
    }, [])
    

    return <DesktopLoader />;
}

export default withAxios<FetchUserProps>(FetchUser)