import axios from 'axios'
import { get } from 'express/lib/request'
import {useEffect, useState} from 'react'
const UserAPI = (token) =>  {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])

    useEffect(() => {
        if(token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                } catch (err) {
                    alert(err.responce.data.msg)
                }
            }
            getUser()
        }
    }, [token])
    
    const addCart = async (product) => {
        if(!isLogged) return alert("Please login to continue buying")

        const check = cart.every(item => {
            return item._id !== product._id
        })
        if(check) {
            setCart([...cart, {...product, quantity: 1 }]) 
        }else {
            alert("This product has been added to card.")
        }
      }

    return {
        isLogged:[isLogged, setIsLogged],
        isAdmin:[isAdmin,setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart
    }
}

export default UserAPI