
export const validateFile = (file: File, validationRules: {maxSize: [number, string], mimes: [string, string]}): void|never => {
    
    if (file == null) {
        throw new Error('please upload valid file.');
    }
    
    if (validationRules.mimes && !validationRules.mimes[0].includes(file.type)) {
        throw new Error(validationRules.mimes[1]);
    }

    if (validationRules.maxSize && file.size > validationRules.maxSize[0]) {
        throw new Error(validationRules.maxSize[1]);
    }
    

}