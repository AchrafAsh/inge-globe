import Layout from '@components/layout'
import { GetServerSideProps } from 'next'
import { withIronSession } from 'next-iron-session'
import { useState } from 'react'

interface User {
    uid: string
    firstname: string
    lastname: string
    email: string
}

const Page: React.FC<{ user: User }> = ({ user }) => {
    return (
        <Layout initials={user.firstname[0] + user.lastname[0]} uid={user.uid}>
            <main className='max-w-6xl mx-auto py-12'>
                <div className='py-6'>
                    <h1 className='font-black text-3xl text-center'>
                        Trouver la formation qui vous convient!
                    </h1>
                    <div className='py-6'>
                        <div className='bg-white shadow-md rounded-md w-max mx-auto flex flex-row items-center overflow-hidden'>
                            <input
                                className='px-6 py-2 flex-1'
                                type='text'
                                name='search'
                                placeholder='Double diplôme au Canada'
                            />
                            <button className='px-6 py-2'>
                                <img src='img/search.png' />
                            </button>
                        </div>
                    </div>

                    <div className='p-6 flex flex-row items-center space-x-6'>
                        <Filter
                            label='Type'
                            feature='type'
                            values={[
                                'Double diplôme',
                                'Partenaire',
                                'Semestre non-diplômant'
                            ]}
                        />
                        <Filter
                            label='Pays'
                            feature='city'
                            values={['Canada', 'Espagne', 'Suède']}
                        />
                        <Filter
                            label='Ville'
                            feature='city'
                            values={['Montréal', 'Stockholm', 'Madrid']}
                        />
                    </div>
                </div>
                <hr className='py-3' />

                <div
                    id='results'
                    className='px-6 flex flex-col items-stretch space-y-3'
                >
                    <ResultCard
                        title='McGill University'
                        subtitle='Montréal, Canada'
                        features={[
                            {
                                key: 'Alumni',
                                value: 'Khaoula Belahsen, ... (6)'
                            }
                        ]}
                    />
                    <ResultCard
                        title='McGill University'
                        subtitle='Montréal, Canada'
                        features={[]}
                    />
                </div>
            </main>
        </Layout>
    )
}

interface ResultProps {
    title: string
    subtitle: string
    features: { key: string; value: string }[]
}

const ResultCard: React.FC<ResultProps> = ({ title, subtitle, features }) => {
    return (
        <div className='p-6 bg-white shadow-md rounded-md flex flex-row space-x-3'>
            <div>
                <div className='rounded-full w-20 h-20 bg-purple-500' />
            </div>
            <div className=''>
                <div className='mb-4'>
                    <h3 className='text-lg font-semibold'>{title}</h3>
                    <p className='text-md font-light'>{subtitle}</p>
                </div>
                <div className='flex flex-row space-x-6 items-center font-light text-sm'>
                    {features &&
                        features.map((feature) => (
                            <div>
                                {feature.key}: {feature.value}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

interface FilterProps {
    label: string
    feature: 'type' | 'country' | 'city'
    values: string[]
}

const Filter: React.FC<FilterProps> = ({ feature, label, values }) => {
    const [toggle, setToggle] = useState(false)
    const [value, setValue] = useState<typeof values[0] | undefined>()

    const handleValueChange = (value: typeof values[0] | undefined) => {
        setValue(value)
        setToggle(false)
    }

    return (
        <div>
            <button
                onClick={() => setToggle(!toggle)}
                className='bg-purple-500 text-gray-50 rounded flex flex-row items-center justify-center space-x-2 py-1 px-3'
            >
                <div>{value ? value : label}</div>
                <svg
                    viewBox='0 0 16 16'
                    className='w-3 h-3 transform rotate-90'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fillRule='evenodd'
                        d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
                    />
                </svg>
            </button>
            {toggle && (
                <div className='absolute mt-1 bg-white p-1 rounded-md shadow-lg flex flex-col'>
                    {values && (
                        <>
                            <div
                                onClick={() => handleValueChange(undefined)}
                                className='p-1 rounded cursor-pointer hover:bg-purple-50'
                            >
                                Tous
                            </div>
                            {values.map((value, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleValueChange(value)}
                                    className='p-1 rounded cursor-pointer hover:bg-purple-50'
                                >
                                    {value}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = withIronSession(
    async ({ req, res }) => {
        const user = req.session.get('user')

        if (user) {
            // fetch some more information
            console.log({ user })
            return {
                props: {
                    user
                }
            }
        }

        if (!user) {
            // redirect to login page

            res.writeHead(301, {
                Location: '/login'
            })
            res.end()
            return { props: {} }
        }
    },
    {
        cookieName: process.env.COOKIE_NAME!,
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production'
        },
        password: process.env.SESSION_SECRET!
    }
)

export default Page
