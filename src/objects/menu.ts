import React from 'react';
import type {MainMenu} from "../types/components";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CallIcon from '@mui/icons-material/Call';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import CastIcon from '@mui/icons-material/Cast';
import CampaignIcon from '@mui/icons-material/Campaign';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MessageIcon from '@mui/icons-material/Message';
import MicIcon from '@mui/icons-material/Mic';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

const prefixBread = [
    {
        label: 'Home',
        link: '/'
    }
];

const menu:MainMenu[] = [
    {
        label: 'Dashboard',
        icon: DashboardIcon,
        href: '/',
        breadCrumb: {
            ...prefixBread
        }
    },
    {
        label: 'Experiences',
        icon: CallIcon,
        children: [
            {
                label: 'Queue',
                icon: QueueMusicIcon,
                href: '/experiences/queue/list',
                breadCrumb: [
                    ...prefixBread,
                    {
                        label: 'Settings',
                        link: '/settings/users/list'
                    },
                    {
                        label: 'Users',
                        link: '/settings/users/list'
                    },
                    {
                        label: 'List'
                    }
                ],
            },
            {
                label: 'Streaming',
                icon: CastIcon,
                href: '/experiences/streaming/list',
                breadCrumb: [
                    ...prefixBread,
                    {
                        label: 'Settings',
                        link: '/settings/roles/list'
                    },
                    {
                        label: 'Roles',
                        link: '/settings/roles/list'
                    },
                    {
                        label: 'List'
                    }
                ]
            }
        ]
    },
    {
        label: 'Campaigns',
        icon: CampaignIcon,
        href: '/campaigns/list'
    },
    {
        label: 'Reports',
        icon: ShowChartIcon,
        href: '/reports/list'
    },
    {
        label: 'Nodes',
        icon: AccountTreeIcon,
        href: '/nodes/list',
        breadCrumb: [
            ...prefixBread,
            {
                label: 'Nodes',
                link: '/nodes/list'
            },
            {
                label: 'List'
            }
        ],
        otherHrefs: {
            edit: {
                href: '/nodes/edit/:id',
                breadCrumb: [
                    ...prefixBread,
                    {
                        label: 'Nodes',
                        link: '/nodes/list'
                    },
                    {
                        label: 'View'
                    }
                ]
            } 
        }
    },
    {
        label: 'Messaging',
        icon: MessageIcon,
        href: '/messaging/list'
    },
    {
        label: 'Prompts',
        icon: MicIcon,
        href: '/prompts/list'
    },
    {
        label: 'Settings',
        icon: SettingsIcon,
        children: [
            {
                label: 'Users',
                icon: GroupIcon,
                href: '/settings/users/list',
                breadCrumb: [
                    ...prefixBread,
                    {
                        label: 'Settings',
                        link: '/settings/users/list'
                    },
                    {
                        label: 'Users',
                        link: '/settings/users/list'
                    },
                    {
                        label: 'List'
                    }
                ],
                otherHrefs: {
                    edit: {
                        href: '/settings/users/edit/:id',
                        breadCrumb: [
                            ...prefixBread,
                            {
                                label: 'Settings',
                                link: '/settings/users/list'
                              },
                              {
                                label: 'Users',
                                link: '/settings/users/list'
                              },
                              {
                                label: 'Edit'
                              }
                        ]
                    } 
                }
            },
            {
                label: 'Roles',
                icon: SupervisedUserCircleIcon,
                href: '/settings/roles/list',
                breadCrumb: [
                    ...prefixBread,
                    {
                        label: 'Settings',
                        link: '/settings/roles/list'
                    },
                    {
                        label: 'Roles',
                        link: '/settings/roles/list'
                    },
                    {
                        label: 'List'
                    }
                ],
                otherHrefs: {
                    create: {
                        href: '/settings/roles/create',
                        breadCrumb: [
                            ...prefixBread,
                            {
                                label: 'Settings',
                                link: '/settings/roles/list'
                            },
                            {
                                label: 'Roles',
                                link: '/settings/roles/list'
                            },
                            {
                                label: 'Create'
                            }
                        ]
                    },
                    edit: {
                        href: '/settings/roles/edit/:id',
                        breadCrumb: [
                            ...prefixBread,
                            {
                                label: 'Settings',
                                link: '/settings/roles/list'
                            },
                            {
                                label: 'Roles',
                                link: '/settings/roles/list'
                            },
                            {
                                label: 'Edit'
                            }
                        ]
                    } 
                }
            }
        ]
    },
];

export default menu;
