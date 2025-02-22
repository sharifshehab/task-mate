import { useState } from "react";

// react icons
import { IoIosSearch } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";


const Header = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user,handleLogOut } = useAuth();

    return (
      <header className="w-full bg-blue-500">
          <nav className="flex items-center justify-between w-full relative bg-blue-500 py-2">
            {/* logo */}
            <img
              src="https://i.ibb.co/0BZfPq6/darklogo.png"
              alt="logo"
              className="w-[55px] "
            />

            {/* action buttons */}
          <div className="items-center gap-[10px] flex">
            
                            <div className="flex flex-col items-center justify-center">
                                        <div className="w-10 rounded-full">
                                            <img
                                                referrerPolicy="no-referrer"
                                                alt={user?.displayName}
                                                src={user?.photoURL}
                                            />
                                        </div>
                                      <h3>{user?.displayName}</h3>
                            </div>
            {
              user ? <button onClick={() => handleLogOut()} className="py-[7px] text-[1rem] px-[16px] rounded-full capitalize bg-[#3B9DF8] text-white hover:bg-blue-400 transition-all duration-300 sm:flex hidden">
                Log-out
              </button> :
                <Link to={'/login'}><button  className="py-[7px] text-[1rem] px-[16px] rounded-full capitalize bg-[#3B9DF8] text-white hover:bg-blue-400 transition-all duration-300 sm:flex hidden">
                Login
              </button></Link>
}
              

              <CiMenuFries
                className="text-[1.8rem] mr-1 text-[#424242]c cursor-pointer md:hidden flex"
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              />
            </div>

            {/* mobile sidebar */}
            <aside
              className={` ${
                mobileSidebarOpen
                  ? "translate-x-0 opacity-100 z-20"
                  : "translate-x-[200px] opacity-0 z-[-1]"
              } md:hidden bg-white p-4 text-center absolute top-[65px] right-0 w-full sm:w-[50%] rounded-md transition-all duration-300`}
            >
              <div className="relative mb-5">
                <input
                  className="py-1.5 pr-4 w-full pl-10 rounded-full border border-gray-200 outline-none focus:border-[#3B9DF8]"
                  placeholder="Search..."
                />
                <IoIosSearch className="absolute top-[8px] left-3 text-gray-500 text-[1.3rem]" />
              </div>
              <ul className="items-center gap-[20px] text-[1rem] text-gray-600 flex flex-col">
                <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
                  home
                </li>

                <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
                  features
                </li>

                <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
                  blogs
                </li>

                <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
                  shop
                </li>
              </ul>
            </aside>
          </nav>
      </header>
    );
};

export default Header;
