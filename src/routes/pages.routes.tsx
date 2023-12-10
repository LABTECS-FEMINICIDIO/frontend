import { Links } from '../pages/Links';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import { Sites } from '../pages/Sites';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';


export const APP_PAGES = [
    {
        title: 'Sites',
        route: '/sites',
        icon: <ScreenSearchDesktopIcon />,
        component: <Sites />,
        showMenu: true,
    },
    {
        title: 'Links',
        route: '/links',
        icon: <AddLinkOutlinedIcon />,
        component: <Links />,
        showMenu: true,
    },
]