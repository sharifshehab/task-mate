import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
    const { handleGoogleSignIn, setLoading,user } = useAuth();
    const axios = useAxiosPublic();
    
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state ? location.state : '/';

    const googleSignIn = async () => {
        try {
            const userCredential = await handleGoogleSignIn();
            const user = userCredential.user;

                  //  Save User info in the database
            const userInfo = {
                    userId:user.uid,
                    email: user.email,
                    name: user.displayName,
                }
                const res = await axios.post('/users', userInfo)
            if (res.data.InsertedId) {
                      console.log(res.data);
                }
            setLoading(false);
            navigate(from, { replace: true });
        } catch (error) {
           console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            
            <div className="w-1/2 h-1/2 bg-blue-500  flex items-center justify-center flex-col space-y-5">
                <h2 className="text-3xl text-white underline underline-offset-8">Login</h2>
            <button onClick={googleSignIn}
                className="bg-blue-400 border text-white rounded-md py-[5px] pl-[5px] pr-4 flex items-center gap-[10px] text-[1rem] hover:bg-transparent transition-all duration-200">
                <div className="p-2 rounded-full bg-white">
                    <img src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png"
                         alt="google logo"
                         className="w-[23px]"/>
                </div>
                Sign in with Google
            </button>
            </div>
        </div>
    );
};

export default Login;