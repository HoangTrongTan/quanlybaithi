import Home from "../pages/Home";
import Danhsach from "../pages/Danhsach";
import UpFiles from "../pages/UpFiles";
import {routespath} from './rouconfig.js'
import LayoutUser from "../Component/Layout/LayoutUser/index.js";

const publicRoutes = [
    { path:routespath.admin.home, component:Danhsach },
    { path:routespath.admin.upload, component:UpFiles },
    { path:routespath.user.home , component:Home, layout:LayoutUser}
];
export { publicRoutes }