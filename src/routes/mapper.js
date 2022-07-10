import navbar from "../components/navbar/navbar";
import Login from "../components/login/login";
import Ipo from "../components/Admin/ipodetails/ipodetails";
import Sidebar from "../components/sidebar/sidebar";
// import Viewipodetail from "../components/ipodetails/ipoDetailView";
// import IpoIssued from "../components/user/userform";
import Createuser from "../components/Admin/createUser/createUser";
import UseripoIssue from "../components/User/ipoIssued/ipoIssued";
import Publicipo1 from "../components/User/publicIpoForm/publicIpoForm";
import Publicipo2 from "../components/User/publicIpoForm/publicIpoForm2";
import Viewagent from "../components/Admin/createAgent/viewAgent";
import Createagent from "../components/Admin/createAgent/createAgent";
import Viewuser from "../components/Admin/createUser/viewuser";
import Admindashboard from "../components/Admin/adminDashboard/adminDashboard";
import Agentipoissued from "../components/Agent/listOfIpo/agentIpoIssued";
import ChangePassword from "../components/Admin/changepassword/ChangePassword";
import Adminreport from "../components/Admin/report/adminReport";
import Viewipodetail from "../components/Admin/ipodetails/ipoDetailView";
import AgentApplyIpo from "../components/Agent/agentApplyIpo/agentApplyIpo";
import AgentApplyipo2 from "../components/Agent/agentApplyIpo/agentApplyipo2";
import AgentDashboard from "../components/Agent/agentDashboard/agentDashboard";
import Voucherupload from "../components/Agent/voucherUpload/Voucherupload";
import ViewAgentReport from "../components/Agent/agentIpoReports/viewAgentReports";
import Appliedipo from "../components/Admin/appliedIpo/appliedIpo";
import Viewapplyipo from "../components/Agent/agentIpoReports/Viewapplyipo";
import Approvereject from "../components/Admin/report/approveReject";
import Summaryreport from "../components/Admin/summaryReport/summaryReport";
import Summarydetailreport from "../components/Admin/summaryReport/summaryDetailReport";
import Paymentpage from "../components/User/paymentPage";
import Success from "../components/User/Success";
import Failure from "../components/User/Failure";
import Edituser from "../components/Admin/createUser/editUser";
import Editagent from "../components/Admin/createAgent/editAgent";
import Track from "../components/User/trackMyApplication/Track";
import Ipoallocated from "../components/User/ipoalloted/ipoAlloted";
import Rightshare from "../components/Agent/rightShare/rightShare";
import Listingrightshare from "../components/Agent/rightShare/listingRightShare";
import Rightshareform from "../components/Agent/rightShare/rightShareForm";
import Userrightshare from "../components/User/publicIpoForm/userRightShareForm";
import Tracking from "../components/User/trackMyApplication/Tracking";
export const Routes = [
  {
    name: "login",
    component: Login,
    path: "/login",
    type: "public",
  },

  {
    name: "navbar",
    component: navbar,
    path: "/navbar",
    type: "protected",
  },
  {
    name: "Sidebar",
    component: Sidebar,
    path: "/sidebar",
    type: "public",
  },
  ///////////////////////////////////// ADMIN SIDE STARTED///////////////////////////////////////////////////////
  // {
  //   name: "IPO",
  //   component: Ipo,
  //   path: "/",
  //   type: "protected",
  // },

  {
    name: "IPO",
    component: Ipo,
    path: "/ipodetails",
    type: "protected",
  },
  {
    name: "Admindashboard",
    component: Admindashboard,
    path: "/admindashboard",
    type: "protected",
  },
  {
    name: "createuser",
    component: Createuser,
    path: "/createuser",
    type: "protected",
  },
  {
    name: "createagent",
    component: Createagent,
    path: "/createagent",
    type: "protected",
  },
  {
    name: "createagent",
    component: Createagent,
    path: "/createagent",
    type: "protected",
  },
  {
    name: "Viewipo",
    component: Viewipodetail,
    path: "/viewIpo",
    type: "protected",
  },
  {
    name: "Viewuser",
    component: Viewuser,
    path: "/viewuser",
    type: "protected",
  },

  {
    name: "Viewagent",
    component: Viewagent,
    path: "/viewagent",
    type: "protected",
  },

  {
    name: "changepassword",
    component: ChangePassword,
    path: "/changepassword",
    type: "protected",
  },
  {
    name: "adminreport",
    component: Adminreport,
    path: "/adminreport",
    type: "protected",
  },
  {
    name: "AppliedIpo",
    component: Appliedipo,
    path: "/appliedipo",
    type: "protected",
  },
  {
    name: "Approvereject",
    component: Approvereject,
    path: "/approvereject",
    type: "protected",
  },
  {
    name: "summaryreport",
    component: Summaryreport,
    path: "/summaryreport",
    type: "protected",
  },
  {
    name: "summarydetailreport",
    component: Summarydetailreport,
    path: "/summarydetailreport",
    type: "protected",
  },
  {
    name: "edituser",
    component: Edituser,
    path: "/edituser",
    type: "protected",
  },
  {
    name: "editagent",
    component: Editagent,
    path: "/editagent",
    type: "protected",
  },
  

  ///////////////////////////////////// ADMIN SIDE Ended///////////////////////////////////////////////////////

  ///////////////////////////////////// AGENT SIDE Started///////////////////////////////////////////////////////

  {
    name: "agentdashboard",
    component: AgentDashboard,
    path: "/agentdashboard",
    type: "agentprotected",
  },
  {
    name: "agentipoissued",
    component: Agentipoissued,
    path: "/agent",
    type: "agentprotected",
  },
  {
    name: "agentpublicipo",
    component: AgentApplyIpo,
    path: "/agentapplyipo",
    type: "agentprotected",
  },
  {
    name: "agentpublicipo2",
    component: AgentApplyipo2,
    path: "/agentapplyipo2",
    type: "agentprotected",
  },
  {
    name: "voucherupload",
    component: Voucherupload,
    path: "/voucherupload",
    type: "agentprotected",
  },

  {
    name: "viewiporeport",
    component: ViewAgentReport,
    path: "/viewiporeport",
    type: "agentprotected",
  },
  {
    name: "viewiporeport",
    component: Viewapplyipo,
    path: "/viewapplyipo",
    type: "agentprotected",
  },
  {
    name: "rightshare",
    component: Rightshare,
    path: "/rightshare",
    type: "agentprotected",
  },
  {
    name: "listingrightshare",
    component: Listingrightshare,
    path: "/listingrightshare",
    type: "agentprotected",
  },
  {
    name: "rightshareform",
    component: Rightshareform,
    path: "/rightshareform",
    type: "agentprotected",
  },
  
  ///////////////////////////////////// AGENT SIDE Ended///////////////////////////////////////////////////////

  ///////////////////////////////////// User SIDE Started///////////////////////////////////////////////////////
  {
    name: "ipoissued",
    component: UseripoIssue,
    path: "/",
    type: "public",
  },
  {
    name: "publicform1",
    component: Publicipo1,
    path: "/publicipo1",
    type: "public",
  },
  {
    name: "publicform2",
    component: Publicipo2,
    path: "/publicipo2",
    type: "public",
  },
  {
    name: "publicform2",
    component: Userrightshare,
    path: "/userrightshare",
    type: "public",
  },
  {
    name: "paymentpage",
    component: Paymentpage,
    path: "/payment",
    type: "public",
  },

  {
    name: "success",
    component: Success,
    path: "/result",
    type: "public",
  },

  {
    name: "failure",
    component: Failure,
    path: "/failure",
    type: "public",
  },
  
  {
    name: "track",
    component: Track,
    path: "/track",
    type: "public",
  },
  {
    name: "tracking",
    component: Tracking,
    path: "/tracking",
    type: "public",
  },
  {
    name: "ipoAlloted",
    component: Ipoallocated,
    path: "/ipoAlloted",
    type: "public",
  },
  ///////////////////////////////////// User SIDE Ended///////////////////////////////////////////////////////
];
