import React, {useState} from 'react';
import { Button, Dropdown } from 'antd';
import {AiOutlineMore} from "react-icons/ai";
import axios from "axios";
import {toast} from "react-toastify";
import UpdateSong from "./UpdateSong";
const Dropdown_listSong = () => {
    return (
        <>
            <Dropdown
                menu={{
                    items,
                }}
                placement="topRight"
                arrow
            >
                <Button><AiOutlineMore/></Button>
            </Dropdown>
        </>
    )
}
export default Dropdown_listSong;
const items = [
    {
        key: '1',
        label: (
            <a onClick={addPlayList}>
                Thêm vào PlayList
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a onClick={edit} >
                Sửa bài hát
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a onClick={deleteSong}>
                Xóa bài hát
            </a>
        ),
    },
];
function addPlayList(){
    axios.put("http://localhost:8080/songs/add_play_list/" +  + "/"+ i.id).then((res)=>{
        toast.success("Thêm thành công vào Playlist", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    })
}

function edit(){
    UpdateSong
}

function deleteSong(){

}