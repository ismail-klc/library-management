import React, { useState } from 'react'
import withAuth from '../../hocs/withAuth'
import { Form, Button } from 'react-bootstrap'
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import DatePicker from "react-datepicker";
import Head from 'next/head';

function NewStudent() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [classroom, setClassroom] = useState('')
    const [email, setEmail] = useState('')
    const [birthDate, setBirthDate] = useState(new Date())
    const [gender, setGender] = useState('Male')
    const [schoolNo, setSchoolNo] = useState('')

    const { doRequest, errors } = useRequest({
        url: 'http://localhost:3000/api/students',
        method: 'post',
        body: {
            firstName, lastName, email, birthDate, class: classroom, gender, schoolNumber: schoolNo
        },
        onSuccess: () => Router.push('/students')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(gender);
        await doRequest();
    }

    return (
        <>
            <Head>
                <title>Add New Student</title>
            </Head>
            <Form className="col-sm-6 mx-auto my-5" onSubmit={handleSubmit}>
                <h4 className="mb-3">Add New Student</h4>
                <Form.Group className="mb-3" >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        value={firstName} onChange={e => setFirstName(e.target.value)}
                        type="text" placeholder="Enter the first name" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        value={lastName} onChange={e => setLastName(e.target.value)}
                        type="text" placeholder="Enter the last name" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        value={email} onChange={e => setEmail(e.target.value)}
                        type="email" placeholder="Enter an email" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Classroom</Form.Label>
                    <Form.Control
                        value={classroom} onChange={e => setClassroom(e.target.value)}
                        type="text" placeholder="Enter a class" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Birth Date</Form.Label>
                    <div>
                        <DatePicker
                            className="form-control"
                            selected={birthDate} onChange={(date) => setBirthDate(date)} />
                    </div>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                        aria-label="Select a type">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>School No</Form.Label>
                    <Form.Control
                        value={schoolNo} onChange={e => setSchoolNo(e.target.value)}
                        type="number" placeholder="Enter school no" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default withAuth(NewStudent)
