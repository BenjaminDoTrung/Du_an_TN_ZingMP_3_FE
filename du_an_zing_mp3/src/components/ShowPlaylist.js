import React, {useContext, useEffect, useState} from 'react';
import {MdDeleteOutline, MdOutlineBrowserUpdated} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import swal from "sweetalert";
import ModalCreatePlayList from "./modanCreatePlayList";
import {AppContext} from "../Context/AppContext";

const ShowPlaylist = () => {
    let [checkDelete, setCheckDelete] = useState(false)

    let [list, setList] = useState([]);
    const {toggleFlag} = useContext(AppContext);
    const {isFlag} = useContext(AppContext);
    let navigate = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:8080/playLists").then((res) => {
            setList(res.data);
        })
    }, [isFlag]);

    function deletePlaylist(id) {
        axios.delete("http://localhost:8080/playLists/" + id).then((res) => {
            swal({
                text: "Bạn có muốn xóa Playlist này không?",
                icon: "info",
                buttons: {
                    cancel: true,
                    confirm: true
                },
            }).then(r => {
                if (r) {
                    axios.delete("http://localhost:8080/songs/" + id)
                        .then(() => {
                                setCheckDelete(!checkDelete)
                                toggleFlag()

                                toast.success("Xóa thành công!", {autoClose: 700})
                            }
                        )
                }
            })
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
                                <th scope="row">{key + 1}</th>
                                <td onClick={() => {
                                    navigate("/viewPlaylist/" + i.id)
                                }}>
                                    <button>{i.namePlayList}</button>
                                </td>
                                <td>
                                    <button><MdOutlineBrowserUpdated style={{width: 30, height: 30, color: '#FFFFFF'}}/>
                                    </button>
                                </td>
                                <td>
                                    <button><MdDeleteOutline onClick={() => {
                                        deletePlaylist(i.id);
                                    }} style={{width: 30, height: 30, color: '#FFFFFF'}}/></button>
                                </td>
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