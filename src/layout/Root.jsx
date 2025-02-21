import { Outlet } from "react-router-dom";
import Header from "../pages/shared/Header";

const Root = () => {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
        </>
    );
};

export default Root;