import { FC, useState } from 'react'
import Layout from '@components/layout/index'

const Page: FC = () => {
    return (
        <Layout>
            <main className='max-w-6xl mx-auto py-12'>
                <div className='pb-12 max-w-4xl mx-auto'>
                    <h1 className='text-3xl font-black'>FAQ</h1>
                </div>

                <div className='p-6 rounded-md bg-white shadow-md flex flex-col space-y-6 max-w-4xl mx-auto'>
                    <QACard
                        question='Dois-je faire une démarche à la DFR pour une formation hors catalogue?'
                        answer='Oui. Quelque soit la formation il faut toujours passer par la DFR avant toute démarche.'
                    />
                    <hr />
                    <QACard
                        question='Dois-je faire une démarche à la DFR pour une formation hors catalogue?'
                        answer='Oui. Quelque soit la formation il faut toujours passer par la DFR avant toute démarche.'
                    />
                </div>
            </main>
        </Layout>
    )
}

interface QAProps {
    question: string
    answer: string
}

const QACard: React.FC<QAProps> = ({ question, answer }) => {
    const [toggle, setToggle] = useState(false)

    return (
        <div>
            <div
                onClick={() => setToggle(!toggle)}
                className='cursor-pointer flex flex-row items-center justify-between'
            >
                <h4 className='text-xl font-semibold'>{question}</h4>
                <svg
                    className={`w-6 h-6 transform ${
                        toggle ? '-rotate-90' : 'rotate-90'
                    }`}
                    viewBox='0 0 16 16'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fill-rule='evenodd'
                        d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
                    />
                </svg>
            </div>

            {toggle && (
                <div className='pt-6'>
                    <p className='font-light'>{answer}</p>
                </div>
            )}
        </div>
    )
}

export default Page
