import { useState } from 'react'
import Link from 'next/link'

interface NavProps {
    uid: string
    initials: string
}

const Navbar: React.FC<NavProps> = ({ uid, initials }) => {
    const [toggle, setToggle] = useState(false)
    return (
        <header className='w-screen flex flex-row items-center justify-between p-6 max-w-6xl mx-auto'>
            <div>
                <Link href='/'>
                    <a className='text-xl font-black uppercase'>
                        🌍 Ingé Globe
                    </a>
                </Link>
            </div>
            <nav className='flex flex-row items-center justify-center space-x-6'>
                <Link href='/catalogue'>
                    <a>Catalogue</a>
                </Link>
                <Link href='/'>
                    <a>Forum</a>
                </Link>
                <Link href='/faq'>
                    <a>FAQ</a>
                </Link>
                <div>
                    <button
                        onClick={() => setToggle(!toggle)}
                        className='cursor-pointer bg-purple-400 text-gray-50 rounded-full w-8 h-8 flex justify-center items-center'
                    >
                        {initials}
                    </button>
                    {toggle && (
                        <div className='absolute mt-1 bg-white p-1 flex flex-col rounded shadow-lg'>
                            <Link href={`/user/${uid}`}>
                                <a>
                                    <div className='hover:bg-purple-50 rounded py-1 px-3'>
                                        Profile
                                    </div>
                                </a>
                            </Link>
                            <Link href='api/auth/logout'>
                                <a>
                                    <div className='hover:bg-purple-50 rounded py-1 px-3'>
                                        Se déconnecter
                                    </div>
                                </a>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar
