import React from 'react'
import BtnRender from './BtnRender'
import { Link } from 'react-router-dom'

function ProductItem({ product, isAdmin }) {
  return (
    <div className="product_card">

      {
        isAdmin && <input type="checkbox" checked={product.checked} />
      }
      <img src={product.images.url} alt="" />

      <div className="product_box">
        <h2>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>
      <BtnRender product={product} />
    </div>
  )
}

export default ProductItem
