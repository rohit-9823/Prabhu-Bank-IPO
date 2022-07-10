import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import UsbIcon from '@mui/icons-material/Usb';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupIcon from '@mui/icons-material/Group';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import "../src/components/navbar/navbar.css"
export const AgentMenuitems = [
    
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon className="icon_sidebar" />, 
      path: '/agentdashboard' 
    },
    { 
      text: 'Apply IPO', 
      icon: <DesignServicesIcon className="icon_sidebar" />, 
      path: '/agent' 
    },
    
      
      // { 
      //   text: 'Voucher Upload', 
      //   icon: <PresentToAllIcon className="icon_sidebar" />, 
      //   path: '/voucherupload' 
      // },

      { 
        text: 'Applied IPO', 
        icon: <PresentToAllIcon className="icon_sidebar" />, 
        path: '/viewiporeport' 
      },
      
      
      // { 
      //   text: 'Master Data', 
      //   icon: <PresentToAllIcon className="icon_sidebar" />, 
      //   path: '/',
      //   subitem:1
      // },
      
   
];
