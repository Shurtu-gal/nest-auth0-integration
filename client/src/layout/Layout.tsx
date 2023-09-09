import { AppBar, Layout, LayoutProps } from 'react-admin';
import Menu from './Menu';

// const CustomAppBar = () => (
//   <AppBar color="secondary" elevation={1}>
//     <TitlePortal />
//   </AppBar>
// );

const CustomLayout = (props: LayoutProps) => (
  <Layout {...props} appBar={AppBar} menu={Menu} />
);

export default CustomLayout;
