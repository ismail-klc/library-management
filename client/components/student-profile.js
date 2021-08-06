import React from 'react'
import { DateTime } from "luxon";
import MyDataTable from './my-table';
import { Badge } from 'react-bootstrap';
import useRequest from '../hooks/use-request';
import Router from 'next/router'
import BorrowComplete from './borrow-complete'

const columns = [
    {
        name: 'Id',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Taken Date',
        selector: row => DateTime.fromISO(row.takenDate, { locale: "tr" }).toLocaleString(DateTime.DATETIME_MED),
        sortable: true,
    },
    {
        name: 'Is Completed',
        selector: row => row.isCompleted
            ? <Badge pill bg="success" >&nbsp;&nbsp;&nbsp;</Badge>
            : <Badge pill bg="danger" >&nbsp;&nbsp;&nbsp;</Badge>,
        sortable: true,
    },
    {
        name: 'Book',
        selector: row => row.book.name,
        sortable: true,
    },
    {
        name: 'Complete',
        selector: row => !row.isCompleted &&
            <BorrowComplete borrowId={row.id} />,
    },
    {
        name: 'Broughten Date',
        selector: row => row.isCompleted &&
            DateTime.fromISO(row.broughtDate, { locale: "tr" }).toLocaleString(DateTime.DATETIME_MED),
        sortable: true
    },
];

function StudentProfile({ student }) {
    const { doRequest, errors } = useRequest({
        url: `http://localhost:3000/api/students/activate/${student.id}`,
        method: 'post',
        onSuccess: () => Router.push('/students')
    });

    const handleActivate = async (e) => {
        e.preventDefault();
        await doRequest();
    }

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card card-primary card-outline">
                            <div className="card-body box-profile">
                                <div className="text-center">
                                    <img className="profile-user-img img-fluid img-circle"
                                        src="/img/user.jpg" alt="User profile picture" />
                                </div>
                                <h3 className="profile-username text-center">{student.firstName} {student.lastName}</h3>
                                <p className="text-muted text-center">{student.email}</p>
                                <ul className="list-group list-group-unbordered mb-3">

                                    <li className="list-group-item">
                                        <b>Classroom</b> <a className="float-right">{student.class}</a>
                                    </li>
                                    <li className="list-group-item">
                                        <b>Gender</b> <a className="float-right">
                                            {student.gender}
                                        </a>
                                    </li>
                                    <li className="list-group-item">
                                        <b>Borrowed Book</b> <a className="float-right">
                                            {student.borrows.length}
                                        </a>
                                    </li>
                                    <li className="list-group-item">
                                        <b>Is Active</b> <a className="float-right">
                                            {student.isActive ? "True" : "False"}</a>
                                    </li>
                                    <li className="list-group-item">
                                        <b>Birth Date</b> <a className="float-right">
                                            {
                                                DateTime.fromISO(student.birthDate, { locale: "tr" }).toLocaleString(DateTime.DATE_FULL)
                                            }
                                        </a>
                                    </li>
                                </ul>
                                {
                                    student.isActive
                                        ? <a onClick={handleActivate} className="btn btn-danger btn-block text-light"><b>Inactive</b></a>
                                        : <a onClick={handleActivate} className="btn btn-primary btn-block text-light"><b>Active</b></a>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <form className="form-horizontal">
                                    <div className="form-group row">
                                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                                        <div className="col-sm-10">
                                            <input type="email" className="form-control" id="inputName" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                                        <div className="col-sm-10">
                                            <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputName2" className="col-sm-2 col-form-label">Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="inputName2" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputExperience" className="col-sm-2 col-form-label">Experience</label>
                                        <div className="col-sm-10">
                                            <textarea className="form-control" id="inputExperience" placeholder="Experience" defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Skills</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="inputSkills" placeholder="Skills" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="offset-sm-2 col-sm-10">
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" /> I agree to the <a href="#">terms and conditions</a>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="offset-sm-2 col-sm-10">
                                            <button type="submit" className="btn btn-danger">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <MyDataTable
                            columns={columns}
                            data={student.borrows}
                            title="Borrows"
                        // btnClick={() => Router.push('/borrows/new')}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StudentProfile
