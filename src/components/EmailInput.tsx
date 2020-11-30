interface EmailInputProps {
    value: string
    handleChange: (value: string) => void
}

const EmailInput: React.FC<EmailInputProps> = ({ value, handleChange }) => {
    return (
        <div className='flex flex-row items-center bg-purple-50 rounded-md overflow-hidden'>
            <input
                className='p-2 bg-transparent text-right'
                placeholder='prenom.nom'
                type='text'
                name='email'
                value={value}
                onChange={(e) => handleChange(e.currentTarget.value)}
                required
            />
            <div className='px-3 text-gray-500'>@ensta-paris.fr</div>
        </div>
    )
}

export default EmailInput
