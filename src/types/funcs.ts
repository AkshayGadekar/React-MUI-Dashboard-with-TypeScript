import type {SnackbarInfo} from "./utilityComponents";
import type {FormikProps}  from 'formik';
import type {AxiosError, AxiosInstance} from "axios";

interface errorResponse {
    success:false, 
    message:string, 
    data: null|Record<string, any>
}

type Arguement1 = AxiosError<errorResponse>;
interface Arguement2 {
    setShowSnackBar: (x: boolean) => void, 
    setSnackbarInfo: (x: SnackbarInfo) => void
};
type Arguement3<T> = FormikProps<T>;
type Arguement4 = SnackbarInfo;
export type ProcessAxiosErrorType<T> = [Arguement1, Arguement2, Arguement3<T>?, Arguement4?];

export interface ProcessEndPointParams extends Record<string, any> {
    readonly method?:string,
    readonly url?: string,
    //readonly [key:string]: any //replace URL params
}

export interface ApiEndPoints {
    auth: {
        'signup': Record<string, any>
        'login': Record<string, any>
        'logout': Record<string, any>
        'getUserDetails': Record<string, any>
    },
    class: {
        'create': Record<string, any>
        'get': Record<string, any>
        'uploadCoverPhoto': Record<string, any>
    }
}

export interface WithAxiosProps {
    setShowSnackBar: (x: boolean) => void, 
    setSnackbarInfo: (x: SnackbarInfo) => void, 
    processAxiosError: <T>(...arg: ProcessAxiosErrorType<T>) => void
    authAxios: AxiosInstance,
    guestAxios: AxiosInstance,
    apiEndPoints: ApiEndPoints,
    _: (apiDetails: Record<string, any>, params: ProcessEndPointParams) => Record<string, any>
}
