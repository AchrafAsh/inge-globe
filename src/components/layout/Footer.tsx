const Footer: React.FC = () => {
    return (
        <footer className='max-w-3xl mx-auto border-t border-purple-200 text-center p-6 absolute inset-x-0 bottom-0'>
            <small className='w-full text-center'>
                <span className='font-semibold uppercase'>
                    🌍 Ingé Globe &nbsp;
                </span>{' '}
                by &nbsp;
                <a
                    className='bg-purple-400 text-gray-100 p-1 rounded'
                    href='https://twitter.com/achrafnotashraf'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    @achrafnotashraf&nbsp;
                </a>
            </small>
        </footer>
    )
}

export default Footer
