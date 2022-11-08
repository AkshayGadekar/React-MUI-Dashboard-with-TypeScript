import React, {MouseEvent} from "react";
import {WithAxiosProps} from './funcs';

export interface PasswordVisibleProps {
    handleClickShowPassword: () => void,
    handleMouseDownPassword: (e:MouseEvent) => void,
    showPassword: boolean
}

export interface SnackbarInfo {
    key?: number,
    message: string,
    vertical?: 'top' | 'bottom',
    horizontal?: 'right' | 'left',
    duration?: number,
    severity?: 'error' | 'warning' | 'info' | 'success',
    variant?: "standard" | "filled" | "outlined",
    elevation?: number,
    width?: string
}

export interface SnackbarProps {
    open: boolean,
    closeSnackbar: (event: React.SyntheticEvent | Event, reason?: string) => void,
    snackbarInfo: SnackbarInfo
}

export interface Menu {
    label: string,
    icon: React.ComponentType<MenuItemIconProps>,
    href?: string,
    otherHrefs?: Record<string, any>
}
export interface MainMenu extends Menu {
    children?: Menu[]
}

export interface MenuItemIconProps {
    
}

export interface MenuItemProps<T> {
    label: string,
    icon: React.ComponentType<T>,
    href?: string,
    otherHrefs?: Record<string, any>,
}

export interface HeadingProps {
    title: string,
    button?: Record<string, any>
}

export interface BreadcrumbProps {
    path: {
        label: string,
        link?: string
    }[]
}

export interface TableProps {
    data: any[]
}

export interface FetchUserProps extends WithAxiosProps {
    
}


