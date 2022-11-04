import React from 'react';
import type {MainMenu} from "../types/utilityComponents";
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

const menus:MainMenu[] = [
    {
        label: 'Dashboard',
        icon: DashboardIcon,
        href: '/'
    },
    {
        label: 'Experiences',
        icon: CallIcon,
        children: [
            {
                label: 'Queue',
                icon: QueueMusicIcon,
                href: '/experiences/queue/list'
            },
            {
                label: 'Streaming',
                icon: CastIcon,
                href: '/experiences/streaming/list'
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
        href: '/nodes/list'
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
                href: '/settings/users/list'
            },
            {
                label: 'Roles',
                icon: SupervisedUserCircleIcon,
                href: '/settings/roles/list'
            }
        ]
    },
];

export default menus;
