import React, {useCallback, useEffect, useContext, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap'
import { Table } from "react-bootstrap";
import { Navbar } from "../components/Navbar";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import {Alert} from "../components/Alert";

export const TablePage = () => {
    const { request } = useHttp()
    const { users, setUsers } = useContext(AuthContext)
    const fetchUsers = useCallback(async () => {
        const data = await request('/api/users/', 'GET', null);

        const newUsers = data.reduce((result, user) => ({ ...result, [user.id]: { ...user, checked: false } }), {});
        setUsers(newUsers);
    }, [request]);

    const checkUser = (oldUsers, id, checked) => ({ ...oldUsers, [id]: { ...oldUsers[id], checked } })
    const checkUsers = checked => Object.keys(users).reduce((result, id) => checkUser(result, id, checked), users)

    const checkHandler = event => {
        setUsers(checkUser(users, event.target.id, event.target.checked));
    }

    const checkAllHandler = (event) => {
        setUsers(checkUsers(event.target.checked));
    }

    const isCheckedAll = !Object.values(users).some(user => user.checked !== true);

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    return (<>
        <div>
            <Navbar />
            <Table className="textStyle2">
                <thead>
                    <tr>
                        <th>
                            <div className="form-check">
                                <input className="form-check-input" onChange={checkAllHandler} type="checkbox" value="" id="checkAll" checked={isCheckedAll} />
                            </div>
                        </th>
                        <th>id</th>
                        <th>name</th>
                        <th>mail</th>
                        <th>regDate</th>
                        <th>lastLogin</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(users).map(us => {
                        return (
                            <tr key={us.id}>
                                <td> <div className="form-check">
                                    <input className="form-check-input" onChange={checkHandler} type="checkbox" value="" id={us.id} checked={us.checked} />
                                </div>
                                </td>
                                <td>{us.id}</td>
                                <td>{us.name}</td>
                                <td>{us.email}</td>
                                <td>{us.createdAt}</td>
                                <td>{us.updatedAt}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </Table>
        </div>
        </>
    )
}