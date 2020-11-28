import Link from 'next/link'

const Navbar: React.FC = () => {
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
                <Link href='/forum'>
                    <a>Forum</a>
                </Link>
                <Link href='/faq'>
                    <a>FAQ</a>
                </Link>
            </nav>
        </header>
    )
}

export default Navbar
