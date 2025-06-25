import {
  UserOutlined,
  VideoCameraOutlined,
  BankOutlined  ,
  CheckSquareOutlined,
  AppstoreOutlined,

} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const SidebarItems = [
  {
    key: '1',
    icon: <AppstoreOutlined />,
    label: <Link to="/">Dashboard</Link>,
  },
   {
    key: '2',
    icon: <UserOutlined />,
    label: <Link to="/Employee">Employee</Link>,
  },
   {
    key: '3',
    icon: <BankOutlined    />,
    label: <Link to="/Departments">Departments</Link>,
  },
  {
    key: '4',
    icon: <CheckSquareOutlined />,
    label: <Link to="/tasks">Tasks</Link>,
  },
 
  // {
  //   key: '3',
  //   icon: <VideoCameraOutlined />,
  //   label: <Link to="/page2">Page 2</Link>,
  // },
  // {
  //   key: '4',
  //   icon: <UploadOutlined />,
  //   label: <Link to="/page3">Page 3</Link>,
  // },
];

export default SidebarItems;
