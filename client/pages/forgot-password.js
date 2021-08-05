import React, { useState } from 'react'
import ChangePassword from '../components/forgot-password/change-password'
import ConfirmCode from '../components/forgot-password/confirm-code'
import SendEmail from '../components/forgot-password/send-email'
import Head from 'next/head'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [step, setStep] = useState(1)

    if (step === 1) {
        return (
            <>
                <Head>
                    <title>Send Confirmation Email</title>
                </Head>
                <SendEmail
                    email={email} setEmail={setEmail}
                    setStep={setStep} step={step} />
            </>
        )
    }

    if (step === 2) {
        return (
            <>
                <Head>
                    <title>Confirm Code</title>
                </Head>
                <ConfirmCode
                    email={email}
                    code={code} setCode={setCode}
                    setStep={setStep} step={step} />
            </>
        )
    }

    if (step === 3) {
        return (
            <>
                <Head>
                    <title>Change Password</title>
                </Head>
                <ChangePassword
                    email={email} code={code}
                    password={password} setPassword={setPassword}
                    passwordConfirm={passwordConfirm} setPasswordConfirm={setPasswordConfirm}
                />
            </>
        )
    }
}

export default ForgotPassword
