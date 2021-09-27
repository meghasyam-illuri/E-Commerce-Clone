// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalAmount = 0
      cartList.forEach(eachItem => {
        totalAmount += eachItem.price * eachItem.quantity
      })

      return (
        <>
          <div className="cart-summary-container">
            <h1 className="total-price">
              <span className="total-price-span">Order Total: </span>Rs{' '}
              {totalAmount} /-
            </h1>
            <p className="total-items">{cartList.length} Items in cart</p>
            <button type="button" className="checkout-button">
              Checkout
            </button>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
