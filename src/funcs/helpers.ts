import {type SnackbarInfo} from "../types/utilityComponents";

export const filterValidationErrors = (validationErrorsObj: Record<string,any>, fields: string[]): [Record<string,any>, Record<string,any>] => {
    let fieldValidationErrors:Record<string,any> = {};
    let otherValidationErrors:Record<string,any> = {};

    for (const key in validationErrorsObj) {
        if (fields.includes(key)) {
            fieldValidationErrors[key as keyof typeof fieldValidationErrors] = validationErrorsObj[key as keyof typeof validationErrorsObj];
        } else {
            otherValidationErrors[key as keyof typeof otherValidationErrors] = validationErrorsObj[key as keyof typeof validationErrorsObj];
        }
    }

    return [fieldValidationErrors, otherValidationErrors];
}

//server side errors coming as validation errors but field is not present in form
export const otherValidationErrors = (initialValues: Record<string,any>, validationErrorsObj: Record<string,any>): string[] => {
    const fields = Object.keys(initialValues)
    
    let errors: string[] = [];
    for (const key in validationErrorsObj) {
        if (!fields.includes(key)) {
            errors.push(validationErrorsObj[key as keyof typeof validationErrorsObj]);
        }
    }
    
    return errors;
}

export const log = (...params: any[]): void => {
    console.log(...params);
}

export const getSizeInBytes = (sizeInMB: number): number => (sizeInMB * 1000 * 1024);
export const getSizeInKB = (sizeInMB: number): number => (sizeInMB * 1000);

export const getVarName = (variable: string): string => Object.keys({variable})[0];

export const getBasicSnackBarInfo = (extraInfo:Record<string,any>={}): SnackbarInfo => {
    
    return {key: Math.random(), message: "", severity: "error", 
    vertical: "bottom", horizontal: "right", duration: 6000, 
    variant: "filled", elevation: 6, width: '100%', ...extraInfo}
}

export const checkProperType = <T>(param: T): T => param;

export const getProperValue = <T>(param: any, dataType: string): T => {

    let value = param;
    if (typeof param != dataType) {
        switch (dataType) {
            case 'object':
                value = {};   
                break;

            case 'array':
                value = [];   
                break;

            case 'string':
                value = "";   
                break;

            case 'boolean':
                value = false;   
                break;
        
            default:
                break;
        }
    } 

    return value;

}
