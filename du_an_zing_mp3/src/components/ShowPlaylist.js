import React, {useContext, useEffect, useState} from 'react';
import {MdDeleteOutline, MdOutlineBrowserUpdated} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {AiOutlinePlus} from "react-icons/ai";
import ModalCreatePlayList from "./modanCreatePlayList";
import {AppContext} from "../Context/AppContext";

const ShowPlaylist = () => {
    let [list, setList] = useState([]);
    const {toggleFlag } = useContext(AppContext);
    const {isFlag } = useContext(AppContext);
    let navigate = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:8080/playLists").then((res) => {
            setList(res.data);
        })
    }, [isFlag]);

    function deletePlaylist(id) {
        axios.delete("http://localhost:8080/playLists/" + id).then((res) => {
            toast.success("Xóa thành công", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            toggleFlag() ;
        })
    }

    return (
        <>
            <div style={{color: "white", marginTop: 30}}>
                <div className="name_playlist" style={{paddingBottom: 20, fontSize: 30, paddingLeft: 10}}>
                    Danh sách Playlist
                </div>
                <button><ModalCreatePlayList/></button>
                <table className="table" style={{color: "white"}}>
                    <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên Playlist</th>
                        <th scope="col" colSpan={2}>Thao Tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map((i, key) => {
                        return (
                            <tr>
                                <th scope="row">{key +1}</th>
                                <td onClick={() => {
                                    navigate("/viewPlaylist/" + i.id)
                                }}>{i.namePlayList}</td>
                                <td><MdOutlineBrowserUpdated style={{width: 30, height: 30}}/></td>
                                <td><MdDeleteOutline onClick={() => {
                                    deletePlaylist(i.id);
                                }} style={{width: 30, height: 30}}/></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

        </>
    );
};

export default ShowPlaylist;