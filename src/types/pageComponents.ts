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
        setToggleListing: React.Dispatch<React.SetStateAction<boolean>>
    }
}