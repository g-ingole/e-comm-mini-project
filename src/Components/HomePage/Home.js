import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Data } from '../Data/Data'
import Button from 'react-bootstrap/Button';
import { ADD } from '../redux/actions/Action';
import { useDispatch } from 'react-redux';



const Home = () => {

    const [data] = useState(Data);
    const [searchFeild, setSearchFeild] = useState('')




    const dispatch = useDispatch();

    const send = (e) => {
        // console.log(e)

        dispatch(ADD(e));

    }

    return (
        <div>
            <div className='container'>
                <Form.Control
                    type="search"
                    className="ms-5 mt3"
                    aria-label="Search"
                    style={{ height: "40px", width: "100%" }}
                    onChange={(e) => {
                        setSearchFeild(e.target.value)
                    }} placeholder='Search...'
                />
            </div>

            {
                Data.filter((val) => {
                    if (searchFeild === '') {
                        return val;
                    } else if (
                        val.title.shortTitle.toLowerCase().includes(searchFeild.toLowerCase()) ||
                        val.title.shortTitle.toLowerCase().includes(searchFeild.toLowerCase()) ||
                        val.title.shortTitle.toLowerCase().includes(searchFeild.toLocaleLowerCase())
                    ) {
                        return val;
                    }
                }).map((e, i) => {
                    return (
                        <div className='container'>

                            <div className='card fl pa2 m-5' style={{ width: "320px" }}>

                                <div key={i} className='dib fl pa2 m-5' style={{ width: "200px", height: "280px" }} >
                                    <img alt='' src={e.url} />
                                    <h1 style={{ fontSize: "15px" }}>{e.title.shortTitle}</h1>
                                    <h1 style={{ fontSize: "15px" }}>Price  : ₹ {e.price.mrp}</h1>
                                    <h1 style={{ fontSize: "15px" }}>Discount  :  {e.price.discount}</h1>

                                </div>
                                <Button variant="outline-success" className='ms-5' style={{ width: "200px" }} onClick={() => send(e)}>Add To Cart</Button>


                            </div>

                        </div>

                    )
                })
            }
        </div>
    )
}

export default Home
