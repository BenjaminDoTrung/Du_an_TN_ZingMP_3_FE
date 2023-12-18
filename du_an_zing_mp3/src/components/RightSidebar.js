import React, {useEffect, useState} from 'react';
import { Button, Drawer } from 'antd';
import {IoTrashBin} from "react-icons/io5";
import {SongItem} from "./index";
import {useSelector} from "react-redux";
import {apiGetDetailPlaylist} from "../apis";

const RightSidebar = () => {
    const [open, setOpen] = useState(false);
    const [a, setA] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const m1 = () => {
        setA(true)
    }

    const [isRecent, setisRecent] = useState(false)
    const {curSongData, curAlbumId} = useSelector(state => state.music)
    const {playlist, setPlaylist} = useState()
    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            const response = await apiGetDetailPlaylist(curAlbumId)
            if (response.data?.err === 0) setPlaylist(response.data.data?.song?.items)

        }

        if (curAlbumId) fetchDetailPlaylist()
    }, [curAlbumId]);

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Open
            </Button>
            <div style={{inset:"none", backgroundColor:'120822'}}>
            <Drawer  autoFocus={false} title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                <div className={"modal.hidden"}>
                    <div className={'flex flex-col text-xs w-full'}>
                        <div
                            className={'h-[70px] w-full flex-none py-[14px] px-2 gap-8 flex items-center justify-between'}>
                            <div
                                className={'flex  flex-auto gap-8 justify-center bg-main-200 rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer'}>
                    <span
                        onClick={() => setisRecent(prev => !prev)}
                        className={`py-[5px] ${!isRecent && 'bg-main-100'} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
                    >
                        Danh sách phát</span>
                                <span
                                    onClick={() => setisRecent(prev => !prev)}
                                    className={`py-[5px] ${isRecent && 'bg-main-100'} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
                                >
                        Nghe gần đây</span>
                            </div>
                            <span className={'p-2 rounded-full hover:bg-main-200 cursor-pointer'}><IoTrashBin
                                size={14}/></span>
                        </div>
                        <div className={'w-full flex-col flex px-2 '}>
                            <SongItem
                                thumbnail={curSongData?.thumbnail}
                                title={curSongData?.title}
                                artists={curSongData?.artistNames}
                                sid={curSongData?.encodeId}
                                sm
                                style='bg-main-500 text-white'
                            />
                            <div className={'flex flex-col text-black pt-[15px] px-2 pb-[5px]'}>
                                <span className={' text-sm font-bold'}>Tiếp theo</span>
                                <span className={'opacity-70 text-xs flex gap-1'}>
                        <span>Từ playlist</span>
                        <span className={'font-semibold text-main-500'}>{curSongData?.album?.title}</span>
                    </span>
                            </div>
                            {playlist && <div className={'flex flex-col'}>
                                {playlist?.map(item => (
                                    <SongItem
                                        key={item.encodeId}
                                        thumbnail={item?.thumbnail}
                                        title={item?.title}
                                        artists={item?.artistNames}
                                        sid={item?.encodeId}
                                        sm
                                    />
                                ))}
                            </div>}
                        </div>
                    </div>
                </div>
            </Drawer>
            </div>
        </>
    );
};

export default RightSidebar;