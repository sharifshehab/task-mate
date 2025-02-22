import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";


const Header = () => {
  const { user,handleLogOut } = useAuth();

    return (
      <header className="w-full bg-blue-500">
        <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between w-full relative py-2">
            {/* logo */}
            <h2 className="text-white text-2xl font-semibold">Task Mate</h2>

            {/* action buttons */}
          <div className="items-center gap-[10px] flex">
            
                            <div className="flex flex-col items-center justify-center space-y-1">
                                        <div className="w-10 rounded-full">
                                            <img
                                                referrerPolicy="no-referrer"
                                                alt={user?.displayName}
                                                src={user?.photoURL}
                                            />
                                        </div>
                                      <h3 className="underline underline-offset-4 text-white font-medium">{user?.displayName}</h3>
                            </div>
            {
              user ? <button onClick={() => handleLogOut()} className="py-[7px] text-[1rem] px-[16px] capitalize bg-transparent border text-white hover:bg-blue-400 transition-all duration-300 sm:flex">
                Log-out
              </button> :
                <Link to={'/login'}><button  className="py-[7px] text-[1rem] px-[16px] capitalize bg-transparent border text-white hover:bg-blue-400 transition-all duration-300 sm:flex">
                Login
              </button></Link>
}
            </div>
    
          </nav>
        </div>
      </header>
    );
};

export default Header;
