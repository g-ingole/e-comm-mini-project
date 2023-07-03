import * as React from 'react';
import {
    Container, Nav, Navbar, Avatar, Badge, Box, Menu,
    MenuItem, ListItemIcon, IconButton, Tooltip, Logout,
    useState, useEffect, NavLink, useNavigate, useDispatch, useSelector, DLT
} from './File'

function Header() {
    const [anchorEll, setAnchorEll] = React.useState(null);
    const open1 = Boolean(anchorEll);
    const handleClick1 = (event) => {
        setAnchorEll(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorEll(null);
    };



    const auth = localStorage.getItem('user')
    const navigate = useNavigate();


    const logout = () => {
        localStorage.clear();
        navigate("/login")
    }


    const getdata = useSelector((state) => state.cartreducer.carts);
    // console.log(getdata);

    const dispatch = useDispatch();

    const dlt = (id) => {
        dispatch(DLT(id))
    }

    const total = () => {
        let price = 0;
        getdata.map((ele, k) => {
            price = ele.price.mrp * ele.qnty + price
            console.log(price)

        });
        setPrice(price)
    };

    useEffect(() => {
        total();
    }, [total])
    const [price, setPrice] = useState(0);
    // console.log(price)


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };




    return (
        <Navbar expand="lg" className="bg-body">
            <Container>
                <Navbar.Brand href="/" className='b f1'>Gaurav</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    {
                        auth ?
                            <Nav
                                className="ms-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link><NavLink to="/home" className='b f3' style={{ textDecoration: "none", color: "black" }}>Home</NavLink></Nav.Link>
                                {/* <Nav.Link><NavLink to="/login" onClick={logout} className='b f3' style={{ textDecoration: "none", color: "black" }}><span style={{ marginRight: "5px" }}>logout</span></NavLink></Nav.Link>
                                <Nav.Link><Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }}>{JSON.parse(auth).result.userValid.fname[0].toUpperCase()}</Avatar></Nav.Link> */}
                                <NavLink className='gap mt2' to='/home'><Badge badgeContent={getdata.length} color="secondary"
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                ><i className="fa-solid fa-cart-shopping f2" style={{ color: "black" }}></i></Badge></NavLink>
                                <React.Fragment>
                                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                                        <Tooltip title="Account settings">
                                            <IconButton
                                                onClick={handleClick1}
                                                size="small"
                                                sx={{ ml: 2 }}
                                                aria-controls={open1 ? 'account-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open1 ? 'true' : undefined}
                                            >
                                                <Avatar sx={{ width: 50, height: 50, color: "black", fontSize: "30px", fontWeight: "bold" }}>{JSON.parse(auth).result.userValid.fname[0].toUpperCase()}</Avatar>
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Menu
                                        anchorEl={anchorEll}
                                        id="account-menu"
                                        open={open1}
                                        onClose={handleClose1}
                                        onClick={handleClose1}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem to="/login" onClick={logout} >
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </React.Fragment>

                            </Nav>
                            :
                            <div style={{ display: "flex" }}>
                                <Nav.Link className='mt3'><NavLink to="/" className='b f3' style={{ textDecoration: "none", color: "black" }}>Sign Up</NavLink></Nav.Link>
                                <Nav.Link className='mt3'><NavLink to="/login" className='b f3 ml4' style={{ textDecoration: "none", color: "black" }}>Login</NavLink></Nav.Link>
                            </div>
                    }
                </Navbar.Collapse>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    {
                        getdata.length ?
                            <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <div>Photo</div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div>Name</div>
                                    </div>
                                    <div className='row'>
                                        {
                                            getdata.map((e) => {
                                                return (
                                                    <div className='d-flex'>
                                                        <div >
                                                            <NavLink to={`/cartdetails/${e.id}`} onClick={handleClose}><img src={e.url} alt='' width={120} height={120} className='p-1' /></NavLink>
                                                        </div>
                                                        <div style={{ marginLeft: "60px" }}>
                                                            <h6>{e.title.shortTitle}</h6>
                                                            <p>Price: $ {e.price.mrp}</p>
                                                            <p>Quantity: $ {e.qnty}</p>
                                                            <p>Remove: <i className="fa-solid fa-trash" onClick={() => dlt(e.id)} style={{ cursor: "pointer", color: "red" }}></i></p>
                                                            {/* <h1>{e.price.mrp * e.qnty}</h1> */}

                                                        </div>
                                                    </div>


                                                )
                                            })
                                        }
                                        <p>Total: $ {price}</p>


                                    </div>

                                </div>
                            </div> :
                            <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10, position: "relative" }}>
                                <i className='fas fa-close smallclose'
                                    onClick={handleClose}
                                    style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}></i>
                                <p style={{ fontSize: 22 }}>Your carts is empty</p>
                                <img src="https://react-redux-cart-youtube.netlify.app/cart.gif" alt="" className='emptycart_img' style={{ width: "5rem", padding: 10 }} />
                            </div>
                    }


                </Menu>
            </Container>
        </Navbar>
    );
}

export default Header;