import React from "react"
import { Link } from "react-router-dom"
import AddCard from "../../../containers/Pay/pay.js"
import styled from "styled-components"
import Cards from "../../../containers/Cards/index.js"
export default function Card(props) {
  const { order } = props
  const [cardList, setCardList] = React.useState([])
  const [addCard, setCard] = React.useState(false)
  const Container = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `
  const StyledH2 = styled.h2`
    color: #bc8f8f !important;
  `
  return (
    <Container>
      <AddCard
        setCardList={setCardList}
        cardList={cardList}
        addCard={addCard}
        setCard={setCard}
      />
      <div style={{ overflow: "scroll" }}>
        {!addCard &&
          cardList.map((card) => {
            return (
              <>
                <Cards card={card} />
                <div className="order-message">
                  <StyledH2>Thank you for your order.</StyledH2>
                  <p>A confirmation email will be sent to you shortly.</p>
                  <div className="order-success-actions">
                    <Link to="/dashboard/orders" className="btn-link">
                      Manage Orders
                    </Link>
                    <Link to="/shop" className="btn-link shopping-btn">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </>
            )
          })}
      </div>
    </Container>
  )
}
