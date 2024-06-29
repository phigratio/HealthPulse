import CustomNavbar from "./CustomNavbar";

const Base = ({ children }) => (
    <div className="container-fluid p-0 m-0" >
        <CustomNavbar/>
        {children}
    </div>
);

export default Base;