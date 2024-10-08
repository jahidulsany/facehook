import { Link } from "react-router-dom";
import Home from "../../assets/icons/home.svg";
import Notification from "../../assets/icons/notification.svg";
import Logo from "../../assets/images/Logo.svg";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import Logout from "../auth/Logout";

const Header = () => {
  const { auth } = useAuth();
  const { state } = useProfile();

  const user = state?.user ?? auth?.user;
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link to="/" className="flex-center">
          <img className="max-w-[64px]" alt="facehook" src={Logo} />
          <span className="text-[#CBB26A] text-lg font-[500]">FaceHook</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/" className="btn-primary">
            <img src={Home} alt="Home" />
            Home
          </Link>
          <button className="icon-btn">
            <img src={Notification} alt="Notification" />
          </button>

          <Logout />

          <Link to="/me" className="flex-center !ml-8 gap-3">
            <span className="text-lg font-medium lg:text-xl">
              {user?.firstName} {user?.lastName}
            </span>
            <div className="h-[32px] w-[32px] lg:h-[44px] lg:w-[44px]">
              <img
                className="w-full h-full rounded-full"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
                alt="Avatar"
              />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Header;
