import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {SongItem} from "../../components";
import axios from "axios";

const Album = () => {
    const [songs, setSongs] = useState([])
    const idPlaylist = useParams();
    const { pid} = useParams()
    const [playlistData, setPlaylistData] = useState([])
    const dispatch = useDispatch()

        useEffect(() => {
            axios.get("http://localhost:8080/songs/searchByIdPll/" + idPlaylist.id).then((res)=>{
                setSongs(res.data);
            })
        }, []);

    return (
        <div className={'flex gap-8 w-full px-[59px]'}>
            <div className={'flex-none w-1/4 border border-red-500 flex flex-col gap-1'}>
                <img  alt='' className={'w-full object-contain rounded-md shadow-md '}/>

                <div className={'flex flex-col items-center gap-1'}>
                    <h3 className={'text-[20px] font-bold text-gray-800'}>Title</h3>
                    <span className={'flex gap-2 items-center text-gray-500 text-xs'}>
                    <span>Update</span>
                </span>
                    <span className={'flex gap-2 items-center text-gray-500 text-xs'}>artist</span>
                    <span className={'flex gap-2 items-center text-gray-500 text-xs '}>like</span>
                </div>
            </div>
            <div className={'flex-auto border border-green-500'}>
                <span className={'text-sm'}>
                    <span className={'text-gray-600'}>Loi tua </span>
                    <span>{playlistData?.sortDescripton} Des</span>
                </span>
                <div
                    className={'flex flex-wrap w-full '}>
                    {songs?.map(item => (
                        <SongItem
                            sid={item.id}
                            key = {item.id}
                            thumbnail={item.url_img}
                            title={item.nameSong}
                            artists={item.singer}
                            releaseDate={new Date()}
                        />
                    ))}
                </div>

            </div>
        </div>
    )

}
export  default Album