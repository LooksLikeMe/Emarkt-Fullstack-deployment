import React ,{useContext} from 'react'
import { Switch, Route } from 'react-router-dom'
import Products from './products/Products'
import Login from './auth/Login'
import DetailProduct from './detailProduct/DetailProduct'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound  from './utils/not_found/NotFound.js'

import {GlobalState} from '../../GlobalState'

function Pages() {
  const state = useContext(GlobalState)
  const [isLogged] = state.UserAPI.isLogged

  return (
      <Switch>
          <Route path="/" exact component={Products} />
          <Route path="/detail/:id" exact component={DetailProduct} />

          <Route path="/login" exact component={!isLogged ? Login : NotFound} />
          <Route path="/register" exact component={!isLogged ? Register : NotFound} />
          <Route path="/cart" exact component={Cart} />

          <Route  path="*" exact component={NotFound}/>
      </Switch>
  )
}

export default Pages
