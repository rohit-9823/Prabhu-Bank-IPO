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
export const Menuitems = [
    
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon className="icon_sidebar" />, 
      path: '/admindashboard' 
    },
    { 
      text: 'IPO Issue', 
      icon: <DesignServicesIcon className="icon_sidebar" />, 
      path: '/ipodetails' 
    },
      
      { 
        text: 'Create User', 
        icon: <SubjectOutlined className="icon_sidebar" />, 
        path: '/createuser' 
      },
      { 
        text: 'Create Agent', 
        icon: <AccountBalanceIcon className="icon_sidebar" />, 
        path: '/createagent' 
      },
      // { 
      //   text: 'Reports', 
      //   icon: <PresentToAllIcon className="icon_sidebar" />, 
      //   path: '/adminreport' 
      // },
      // { 
      //   text: 'Applied IPO', 
      //   icon: <PresentToAllIcon className="icon_sidebar" />, 
      //   path: '/appliedipo' 
      // },
      { 
        text: 'Reports', 
        icon: <PresentToAllIcon className="icon_sidebar" />, 
        path: '/',
        subitem:1
      },
      
   
];
