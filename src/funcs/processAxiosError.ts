import {getBasicSnackBarInfo} from "../funcs/helpers";
import {otherValidationErrors} from "../funcs/helpers";
import {filterValidationErrors} from "../funcs/helpers";
import {type ProcessAxiosErrorType} from "../types/funcs";

const processAxiosError = <T extends object>(...args: ProcessAxiosErrorType<T>) => {
    
    const error = args[0];
    const props = args[1];
    const formik = args[2];
    let snackBarOptions = args[3];

    const {setShowSnackBar, setSnackbarInfo} = props;
    snackBarOptions = getBasicSnackBarInfo(snackBarOptions);
    
    let errorMessage;
    if (error.response) {//axios.isAxiosError(error)
        const errorResponse = error.response;
        const VALIDATION_ERROR = process.env.REACT_APP_VALIDATION_ERROR!;
        const pattern = new RegExp(VALIDATION_ERROR, 'i');
        if (errorResponse.status == 422 && pattern.test(errorResponse.data.message)) {
            const validationsObjFromResponse = errorResponse.data.data;
            
            let validationError;
            for (const key in validationsObjFromResponse) {
                validationError = validationsObjFromResponse[key as keyof typeof validationsObjFromResponse]; 
                if (Array.isArray(validationError)) {
                    validationError = (validationError as string[]).join(" ");
                }
                validationsObjFromResponse[key as keyof typeof validationsObjFromResponse] = validationError;
                //validationErrorsObj[key as keyof typeof validationsObjFromResponse] = validationError;
                //formik.setFieldError(key, validationError);
            }
            const validationErrorsObj = validationsObjFromResponse; 

            
            /*if (formik != null) {
                //if initialValues are undefined
                if (formik.initialValues == null && typeof formik.initialValues != 'object') {
                    for (const key in validationErrorsObj) {
                        formik.setFieldError(key, validationErrorsObj[key as keyof typeof validationErrorsObj]);
                    }
                    return;    
                }
                
                const fields = Object.keys(formik.initialValues);
                const [fieldValidationErrors, otherValidationErrors] = filterValidationErrors(validationErrorsObj as object, fields);
                
                for (const key in fieldValidationErrors) {
                    formik.setFieldError(key, fieldValidationErrors[key as keyof typeof fieldValidationErrors]);
                }
                
                const otherValidationErrorsArr = Object.values(otherValidationErrors);
                const errorMessage = otherValidationErrorsArr.join(" ");
                snackBarOptions.message = errorMessage;
                setSnackbarInfo(snackBarOptions);
                setShowSnackBar(true);

                return;
            }*/
            
            const validationErrorsArr = Object.values(validationErrorsObj as object);
            errorMessage = validationErrorsArr.join(" ");
            
        } else {
            errorMessage = errorResponse.data.message == null ? error.message : errorResponse.data.message;
        } 

    } else {
        errorMessage = error.message;
        //this means error.response is undefined, so request never reached to server (network error or cancelled(cancelled request does fail into axios intercepor error response I think))
        if (error.name == 'TypeError') {
            errorMessage = "Request could not proceed further.";
        }
    }

    snackBarOptions.message = errorMessage;
    setSnackbarInfo(snackBarOptions);
    setShowSnackBar(true);

}


export default processAxiosError;



