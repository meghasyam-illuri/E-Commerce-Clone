import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: filteredList})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (id === eachItem.id) {
          const increaseQuantity = eachItem.quantity + 1
          return {...eachItem, quantity: increaseQuantity}
        }
        return eachItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const selectedItem = cartList.find(eachItem => eachItem.id === id)
    if (selectedItem.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === id) {
            const decreasedQuantity = eachItem.quantity - 1
            return {...eachItem, quantity: decreasedQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem
    const {cartList} = this.state
    const addedItem = cartList.find(eachItem => eachItem.id === product.id)
    if (addedItem) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === product.id) {
            const increaseQuantity = eachItem.quantity + product.quantity
            return {...eachItem, quantity: increaseQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]
      this.setState({cartList: updatedCartList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
