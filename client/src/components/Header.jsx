import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
    const { currentUser } = useSelector(state => state.user);
    return (
        <div className='bg-[#1C1C1C] p-8 pb-0'>
            <div className=''>
            <nav className='bg-white rounded-2xl flex justify-between items-center max-w-6xl mx-auto p-3 '>
                <Link to="/">
                    <h1 className='font-bold text-2xl italic'>IOT BASED WATER DISPESER</h1>
                </Link>
                <ul className='flex gap-4 items-center font-semibold italic text-[18px]'>
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/profile">
                        {
                            currentUser ? (
                                <img src={currentUser.profilePicture} alt="profile" className='h-9 w-9 rounded-full object-cover' />
                            ) : (
                                 <li>Sign In</li>
                            )
                        }
                    </Link>
                </ul>
            </nav>
        </div>
        </div>
        
    )
}

export default Header