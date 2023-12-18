import React from 'react';
import "../css_component/MenuLogoutCSS.css"
import {CiSettings} from "react-icons/ci";
import {TbPasswordUser} from "react-icons/tb";
import {HiOutlinePlus} from "react-icons/hi";
import {AiOutlineLogout} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import UpdatePass from "../page/public/UpdatePassword";
const MenuLogOut = ({handler}) => {
    const navigate = useNavigate()
    function logOut() {
        handler(false);
        localStorage.clear()
        navigate("/")
    }
    function updatePassword(){
        handler(false);
        navigate("/updatePassword")
    }
    function updateProfile(){
        handler(false);
        navigate("/updateProfile")
    }

    function createSong(){
        handler(false);
        navigate("/create")
    }


    return (
        <>
            <div className="menu-logout">
                <ul>
                    <li onClick={updateProfile}>
                        <div className="use-icon">
                            <CiSettings style={{width:20, height:20}} />
                        </div>
                        <div className="use-content">
                            Sửa thông tin
                        </div>
                    </li>
                    <li onClick={updatePassword}>
                        <div className="use-icon">
                            <TbPasswordUser style={{width:20, height:20}} />
                        </div>
                        <div className="use-content">
                            Thay đổi mật khẩu
                        </div>
                    </li>
                    <li>
                        <div className="use-icon">
                            <HiOutlinePlus style={{width:20, height:20}} />
                        </div>
                        <div onClick={createSong} className="use-content">
                            Thêm bài hát
                        </div>
                    </li>
                    <li onClick={logOut}>
                        <div className="use-icon">
                            <AiOutlineLogout style={{width:20, height:20}}/>
                        </div>
                        <div className="use-content" >
                            LogOut
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default MenuLogOut;