import type {WithAxiosProps} from "./funcs";

export interface NodesEditInfoProps extends WithAxiosProps {
    data: Record<string, any>
}

export interface NodesEditServicesProps extends WithAxiosProps {
    data: Record<string, any>[]
}