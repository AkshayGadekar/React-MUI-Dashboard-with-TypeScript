import React, {MouseEvent} from "react";

export interface PasswordVisibleProps {
    handleClickShowPassword: () => void,
    handleMouseDownPassword: (e:MouseEvent) => void,
    showPassword: boolean
}

export interface SnackbarInfo {
    key: number,
    message: string,
    vertical: 'top' | 'bottom',
    horizontal: 'right' | 'left',
    duration: number,
    severity: 'error' | 'warning' | 'info' | 'success',
    variant: "standard" | "filled" | "outlined",
    elevation: number,
    width: string
}

export interface SnackbarProps {
    open: boolean,
    closeSnackbar: (event: React.SyntheticEvent | Event, reason?: string) => void,
    snackbarInfo: SnackbarInfo
}