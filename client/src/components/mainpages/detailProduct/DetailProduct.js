import React, {useContext, useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'; 

function DetailProduct () {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [detailProduct, setDetailProduct] = useState([])
    
    useEffect(() => {
        if(params) {
            products.forEach(product => {
                if(product._id === params.id) {
                    setDetailProduct(product)
                }
            })
        }
    },[params, products])
    return (
        <div>
            
        </div>
    );
}

export default DetailProduct;