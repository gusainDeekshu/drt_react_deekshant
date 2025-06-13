"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineDashboard, AiOutlineFileText, AiOutlineUsergroupAdd, AiOutlineBarChart, AiOutlineMenu, AiOutlineBell, AiOutlineUser, AiOutlineDown } from "react-icons/ai";

interface DashboardProps {
  Component: React.ComponentType;
  Prop: string;
}

const Dashboard: React.FC<DashboardProps> = ({ Component, Prop }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const menuItems = [
    { name: "Dashboard", link: "/dashboard", icon: <AiOutlineDashboard size={20} /> },
    { name: "Documents", link: "/documents", icon: <AiOutlineFileText size={20} /> },
    { name: "Contacts", link: "/contact", icon: <AiOutlineUsergroupAdd size={20} /> },
    { name: "Reports", link: "/reports", icon: <AiOutlineBarChart size={20} /> },
    { name: "Document Templates", link: "/documenttemplates", icon: <AiOutlineFileText size={20} /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      {/* <div className="flex justify-between items-center bg-white px-8 py-4 shadow">
        <Image src={Logo} width={100} height={100} alt="Logo" priority={false} />
        <div className="relative">
          <div className="flex items-center gap-2 px-4 py-2 cursor-pointer">
            <AiOutlineUser size={24} className="text-primary" />
            <span className="font-medium text-black"></span>
            <AiOutlineDown size={18} className="text-gray-500" />
          </div>
        </div>
      </div> */}

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`bg-white border-r transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}>
          <ul className="flex flex-col items-center py-4">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`flex items-center gap-3 w-full px-4 py-3 my-2 rounded cursor-pointer transition ${
                  Prop === item?.name ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                }`}
                onClick={() => router.push(item.link)}
              >
                <div>{item.icon}</div>
                {isSidebarOpen && <span>{item.name}</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          <nav className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm">
            <div className="flex items-center gap-4">
              <button className="p-2" onClick={toggleSidebar}>
                <AiOutlineMenu size={24} />
              </button>
              <h5 className="text-lg font-semibold">{Prop}</h5>
            </div>
           
          </nav>

          <div className="flex-1 p-6 bg-gray-100">
            <div className="bg-white p-6 rounded shadow">
              <Component />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
