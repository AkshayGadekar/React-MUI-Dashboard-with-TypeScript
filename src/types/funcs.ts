import type {SnackbarInfo} from "./components";
import type {FormikProps}  from 'formik';
import type {AxiosError, AxiosInstance} from "axios";

export interface successResponse {
    success:true, 
    message:string, 
    data: null|Record<string, any>|Record<string, any>[]
}

export interface errorResponse {
    success:false, 
    message:string, 
    data: null|Record<string, any>|Record<string, any>[]
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
    nodes: {
        'list': Record<string, any>
        'edit': Record<string, any>
        'update': Record<string, any>
        'restartNodeService': Record<string, any>
        'updateNodeService': Record<string, any>
    },
    messages: {
        'list': Record<string, any>
    },
    users: {
        'list': Record<string, any>
        'getRoles': Record<string, any>
        'addUser': Record<string, any>
        'getUser': Record<string, any>
        'editUser': Record<string, any>
        'editPassword': Record<string, any>
    },
    roles: {
        'getPermissions': Record<string, any>
        'list': Record<string, any>
        'create': Record<string, any>
        'edit': Record<string, any>
        'update': Record<string, any>
        'createPermission': Record<string, any>
    },
    class: {
        'get': Record<string, any>
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
