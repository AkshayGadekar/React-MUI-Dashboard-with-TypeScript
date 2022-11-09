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
    vertical: "bottom", horizontal: "right", duration: 5000, 
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

export const getQueryString = (data: Record<string, any>) => Object.keys(data).map(key => key + '=' + (data[key as keyof typeof data])).join('&');

export const encodedQueryString = (data: Record<string, any>) => {
    return Object.keys(data).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
    }).join('&');
}

export const isLinkSame = (dynamicLink: string, actualLink: string): boolean => {
    let link1ToArray = dynamicLink.split('/');
    let link2ToArray = actualLink.split('/');
    
    if (link1ToArray.length == link2ToArray.length) {
        const dynamicIndices: number[] = [];
        
        link1ToArray = link1ToArray.filter((linkSlice, index) => {
            if (/:.+/i.test(linkSlice)) {
                dynamicIndices.push(index);
                return false;
            }
            return true;
        });
        link2ToArray = link2ToArray.filter((linkSlice, index) => !dynamicIndices.includes(index));
        
        const newLink1 = link1ToArray.join('/');
        const newLink2 = link2ToArray.join('/');
        
        return newLink1 === newLink2;
    }
    
    return false;
}

export const replaceDynamicParamInHref = (dynamicLink: string, dynamicParams: string[]) => {
    let linkToArray: string[] = dynamicLink.split('/');
    let noOfdynamicParams = 0;
    linkToArray = linkToArray.map((linkSlice, index) => {
        if (/:.+/i.test(linkSlice)) {
            linkSlice = dynamicParams[noOfdynamicParams];
            noOfdynamicParams++;
        }
        return linkSlice;
    });
    return linkToArray.join('/');
}

export const convertToTimezone = (date: string|Date, tzString: string) => {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}