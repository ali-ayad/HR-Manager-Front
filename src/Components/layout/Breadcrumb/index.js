import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const breadcrumbNameMap = {
  '/': 'Employees',  
  '/Tasks': 'Tasks',  
  '/employees/add': 'Add Employee',
  '/employees/edit': 'Edit Employee',
  '/departments': 'Departments',
  // Add additional mappings as necessary
};

const BreadcrumbNav = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  // Special handling for home route "/"
  if (location.pathname === '/') {
    return (
      <Breadcrumb
        items={[
          {
            title: breadcrumbNameMap['/'],
            key: '/',
          },
        ]}
      />
    );
  }

  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const title = breadcrumbNameMap[url] || url;
    return {
      title: <Link to={url}>{title}</Link>,
      key: url,
    };
  });

  return <Breadcrumb items={breadcrumbItems} />;
};

export default BreadcrumbNav;
