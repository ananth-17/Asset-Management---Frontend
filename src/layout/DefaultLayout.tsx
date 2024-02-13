import { useState } from 'react';
// import Header from '../component/Header';
import Sidebar from '../component/Sidebar';
import { Outlet } from 'react-router-dom';
import Header from '../component/Header';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex flex-col h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col">
          {/* <!-- ===== Header Start ===== --> */}
          
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
              <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="mx-auto max-h-screen max-w-screen-2xl p-2 md:p-4 2xl:p-8 overflow-y-auto overflow-x-hidden">
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
