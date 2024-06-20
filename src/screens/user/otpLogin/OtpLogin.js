import { Link } from 'react-router-dom'
import FormInput from '../../../components/formInput/FormInput'




const OtpLogin = () => {
    const input = {
        name: 'phoneNumber',
        type: 'text',
        errorMessage: 'Enter a valid phone number',
        placeholder: 'Enter your mobile Number',
        pattern: `^\\d{10}$`,
        required: true,
    }
    return (
        <div className='login'>
            <div className='container'>
                <h1>DOLOMEDIA</h1>
                <form >
                    <FormInput {...input} />
                    <button>Generate OTP</button>
                </form>
                <Link to='/'>Back</Link>
            </div>
        </div>
    )
}

export default OtpLogin