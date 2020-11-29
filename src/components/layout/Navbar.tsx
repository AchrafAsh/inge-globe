import { useState, useEffect } from 'react'
import Link from 'next/link'

interface NavProps {
    uid: string
    initials: string
}

const useIsMobile = () => {
    const [windowWidth, setWindowWidth] = useState<number>(400)

    const resize = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') setWindowWidth(window.innerWidth)
        window.addEventListener('resize', resize)
        // clean up function
        return () => {
            window.removeEventListener('resize', resize)
        }
    })

    return windowWidth <= 640
}

const Navbar: React.FC<NavProps> = ({ uid, initials }) => {
    const [profileToggle, setProfileToggle] = useState(false)
    const [toggle, setToggle] = useState(false)
    const isMobile = useIsMobile()

    return (
        <header className='w-full flex flex-row items-center justify-between p-6 max-w-6xl mx-auto'>
            <div className='relative z-10'>
                <Link href='/'>
                    <a className='text-xl font-black uppercase'>
                        🌍 Ingé Globe
                    </a>
                </Link>
            </div>
            {(isMobile && toggle) || !isMobile ? (
                <nav className='absolute sm:relative inset-0 bg-white sm:bg-transparent flex flex-col space-y-6 text-center sm:flex-row items-center justify-center sm:space-x-6 sm:space-y-0'>
                    {isMobile && (
                        <button
                            onClick={() => setToggle(!toggle)}
                            className='absolute top-6 right-6 bg-purple-100 rounded-md p-3'
                        >
                            <img src='/img/close.svg' />
                        </button>
                    )}

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
                            onClick={() => setProfileToggle(!profileToggle)}
                            className='cursor-pointer bg-purple-400 text-gray-50 rounded-full w-8 h-8 flex justify-center items-center'
                        >
                            {initials}
                        </button>
                        {profileToggle && (
                            <div className='absolute transform -translate-x-full mt-1 bg-white p-1 flex flex-col rounded shadow-lg'>
                                <Link href={`/user/${uid}`}>
                                    <a>
                                        <div className='hover:bg-purple-50 rounded py-1 px-3'>
                                            Profile
                                        </div>
                                    </a>
                                </Link>
                                <Link href='/api/auth/logout'>
                                    <a>
                                        <div className='hover:bg-purple-50 rounded py-1 px-3 w-max'>
                                            Se déconnecter
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            ) : (
                <button
                    onClick={() => setToggle(!toggle)}
                    className='bg-purple-100 rounded-md p-3'
                >
                    <img src='/img/hamburger.svg' />
                </button>
            )}
        </header>
    )
}

export default Navbar
