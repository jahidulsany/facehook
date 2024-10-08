import { Link } from "react-router-dom";
import AuthIllustration from "../assets/images/auth_illustration.png";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <main className="flex-center min-h-screen bg-deepDark py-8">
      <div className="max-w-[1368px] flex-1">
        <div className="container grid items-center gap-8 lg:grid-cols-2">
          <div>
            <img
              className="mb-12 max-w-full max-lg:hidden"
              src={AuthIllustration}
              alt="auth_illustration"
            />
            <div>
              <h1 className="mb-3 text-4xl font-bold lg:text-[40px]">
                Facehook
              </h1>
              <p className="max-w-[452px] text-gray-400/95 lg:text-lg">
                A social media app with features such as like, showing the post,
                post details, reactions, comments, profile, and more.
              </p>
            </div>
          </div>
          <div className="card">
            
            <LoginForm />
            
            <div className="py-4 lg:py-6">
              <p className="text-center text-xs text-gray-400/95 lg:text-sm">
                Don’t have account?&nbsp;
                <Link
                  className="text-white transition-all hover:text-jsGreen hover:underline"
                  to="/register"
                >
                  Create New
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
