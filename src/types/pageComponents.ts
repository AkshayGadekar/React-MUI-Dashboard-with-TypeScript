import type {WithAxiosProps} from "./funcs";
import type {SnackbarInfo} from "./components";

export interface TableProps {
    data: any[]
}

export interface NodesIndexListingProps extends TableProps {
    
}

export interface NodesEditInfoProps extends WithAxiosProps {
    data: Record<string, any>
}

export interface NodesEditServicesProps extends WithAxiosProps {
    data: Record<string, any>[]
}

export interface UsersIndexListingProps extends TableProps {
    
}

export interface UsersAddNewProps extends WithAxiosProps {
    open: boolean,
    close: () => void,
    setParentState: {
        setSnackbarInfo: (x: SnackbarInfo) => void;
        setShowSnackBar: (x: boolean) => void;
        setUsersCreatedCount: React.Dispatch<React.SetStateAction<number>>
    }
}

export interface EditPasswordProps extends WithAxiosProps {
    open: boolean,
    close: () => void,
}

export interface ShowPermissionsProps {
    permissions: Record<string, any>[],
    selectedPermissionsIds: number[],
    togglePermissionCheck?: (ev: React.ChangeEvent<HTMLInputElement>) => void,
    disabledChecks?: boolean
}

export interface AddPermissionProps extends WithAxiosProps {
    open: boolean,
    close: () => void,
    setParentState: {
        setSnackbarInfo: (x: SnackbarInfo) => void;
        setShowSnackBar: (x: boolean) => void;
        setPermissionsCreatedCount: React.Dispatch<React.SetStateAction<number>>
    }
}

export interface RolesIndexListingProps extends TableProps {
    
}

export interface MessagingIndexListingProps extends TableProps, WithAxiosProps {
    setParentState: {
        setSnackbarInfo: (x: SnackbarInfo) => void;
        setShowSnackBar: (x: boolean) => void;
        setMessagesCreatedCount: React.Dispatch<React.SetStateAction<number>>
    }
}

export interface MessagingAddNewProps extends WithAxiosProps {
    open: boolean,
    close: () => void,
    setParentState: {
        setSnackbarInfo: (x: SnackbarInfo) => void;
        setShowSnackBar: (x: boolean) => void;
        setMessagesCreatedCount: React.Dispatch<React.SetStateAction<number>>
    }
}

export interface DeleteDialogProps {
    open: boolean,
    close: () => void,
    deleteID: number,
    deleteMessage: (id: number) => void
}