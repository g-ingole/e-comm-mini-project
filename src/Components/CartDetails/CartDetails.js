import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { DLT, ADD, REMOVE } from '../redux/actions/Action';

const CartDetails = () => {


    const [data, setData] = useState([]);
    // console.log(data);


    const { id } = useParams();
    // console.log(id);

    const history = useNavigate();

    const dispatch = useDispatch();



    //add data

    const send = (e) => {
        // console.log(e)

        dispatch(ADD(e));

    }
    const dlt = (id) => {
        dispatch(DLT(id));
        history("/home")
    }

    //remove one

    const remove = (item) => {
        dispatch(REMOVE(item))
    }


    const getdata = useSelector((state) => state.cartreducer.carts);
    // console.log(getdata);

    const compare = () => {
        let comparedata = getdata.filter((e) => {
            return e.id == id
        });
        setData(comparedata);
    }

    useEffect(() => {
        compare();
    }, [id])


    return (
        <div>
            <>
                <div className='container mt-5 tc' >
                    <h2>Add To Cart</h2>
                    <section className='container mt-5' >
                        <div className='itemsdetails' style={{ display: "flex" }}>
                            {
                                data.map((ele) => {
                                    return (
                                        <div className='d-flex shadow-1 p-5' >
                                            <div className='items_img '>
                                                <img alt='' src={ele.url} width={400} height={300} />
                                            </div>
                                            <div className='details ml5'>
                                                <h1>Name: <strong>{ele.title.shortTitle}</strong></h1>
                                                <h1>Price: <strong>{ele.price.mrp}</strong></h1>
                                                <h1>Total: <strong>{ele.price.mrp * ele.qnty}$</strong></h1>
                                                <div className='mt5 d-flex justify-content-between' style={{ width: 100, cursor: "pointer", background: "#ddd", color: "gray" }}>
                                                    <span style={{ fontSize: "24px" }} onClick={ele.qnty <= 1 ? () => dlt(ele.id) : () => remove(ele)} >-</span>
                                                    <span style={{ fontSize: "22px" }}>{ele.qnty}</span>
                                                    <span style={{ fontSize: "24px" }} onClick={() => send(ele)}>+</span>

                                                </div>
                                                <h1>Remove: <strong><i className="fa-solid fa-trash" style={{ cursor: "pointer" }} onClick={() => dlt(ele.id)}></i></strong></h1>

                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </section>



                </div>
            </>
        </div>
    )
}

export default CartDetails
