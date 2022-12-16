import React from 'react';
import { Outlet } from 'react-router-dom';

import LeftSidebar from '../components/LeftSidebar/LeftSidebar';

function Layout() {
  return (
    <div className="columns">
      <div className="column is-2 has-background-white-bis py-0 px-0 mt-2 ml-2">
        <LeftSidebar />
      </div>
      <Outlet />
    </div>
  ) as React.ReactElement;
}

export default Layout;
