import React from "react"
import AddCard from "../../../containers/Pay/pay.js"
import styled from "styled-components"
import Cards from "../../../containers/Cards/index.js"
export default function Card() {
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
            return <Cards card={card} />
          })}
      </div>
    </Container>
  )
}
