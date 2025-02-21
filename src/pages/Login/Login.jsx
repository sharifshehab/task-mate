import useAuth from "../../hooks/useAuth";

const Login = () => {
    const { handleGoogleSignIn,setLoading } = useAuth();

    const googleSignIn = async () => {
        try {
            const userCredential = await handleGoogleSignIn();
            const user = userCredential.user;
            // navigate(from, { replace: true });
        } catch (error) {
           console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            
            <div className="w-96 bg-green-400 py-20 flex items-center justify-center flex-col space-y-5">
                <h2 className="text-3xl">Login</h2>
            <button onClick={googleSignIn}
                className="bg-[#3B9DF8] text-white rounded-md py-[5px] pl-[5px] pr-4 flex items-center gap-[10px] text-[1rem] hover:bg-blue-500 transition-all duration-200">
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