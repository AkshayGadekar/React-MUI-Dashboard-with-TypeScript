export interface HeaderProps {
    handleDrawerToggle: () => void,
    hideDrawer: boolean
}

export interface DrawerProps {
    container: (() => HTMLElement) | undefined,
    mobileOpen: boolean,
    handleDrawerToggle: () => void,
    hideDrawer: boolean
}

export interface ContentProps {
    hideDrawer: boolean
}