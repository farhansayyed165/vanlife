import React, { useState, useRef, useEffect } from 'react'
import { TbHandClick } from "react-icons/tb";


function EditAvatar({ data, avatar, setAvatar, dimensions }) {
    const [avatarLink, setAvatarLink] = useState(data ? data : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png")
    const inputFeild = useRef(null)

    useEffect(() => {
        if (avatar == avatarLink || !avatar) {
            return
        }
        // console.log(typeof avatar)
        setAvatarLink(URL.createObjectURL(avatar))
    }, [avatar])

    function handleAvatarModal(e) {
        e.preventDefault()
        inputFeild.current.click()
    }
    function handleAvatarChange(e) {
        e.preventDefault()
        setAvatar(e.target.files[0])
    }
    return (
        <>
            <div className='avatar cursor-pointer w-[120px]' onClick={handleAvatarModal}>
                <img src={avatarLink} className={`${dimensions ? `w-[${dimensions}] h-[${dimensions}]` : "w-[120px] h-[120px]"} rounded-full shadow-md object-cover mb-0`} alt="" />
                {/* <span className='absolute top-0  text-white z-10 avatar-text w=[120px] h-[120px] flex items-center'>
                    <p className=' w-[120px] avatar-icon text-pClamp flex justify-center'><TbHandClick size={30} color='black' /></p>
                </span> */}
            </div>
            <input type="file" className='sr-only ' onChange={handleAvatarChange} ref={inputFeild} />
        </>
    )
}

export default EditAvatar