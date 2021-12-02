/**
 *
 * Homepage
 *
 */

import React from "react"
import ProductsShop from "../ProductsShop"
import styled from "styled-components"
import { connect } from "react-redux"
import { Row, Col, Container, Button } from "reactstrap"
import { Carousel } from "react-bootstrap"
import actions from "../../actions"
import banners from "./banners.json"
import { style } from "dom-helpers"

class Homepage extends React.PureComponent {
  render() {
     const registerLink = () => {
      this.props.history.push("/register")
    }
    return (
      <Container>
        <StyledRow>
          <Col xs={4}>
            <div className="sign">
              <h5>Sign up To get</h5>
              <h5>50% of Today</h5>
            </div>
          </Col>
          <Col xs={4}>
            <div>
              <img src="/images/banners/banner-3.jpg" alt="banners" />
            </div>
          </Col>
          <Col xs={4}>
            <StyledButton color="primary" onClick={registerLink}>Sign Up</StyledButton>
          </Col>
        </StyledRow>
        <Row>
          <img src="https://static.tumblr.com/be78aee4cd37c48961469d5f68b1e1f8/j29ykma/lIanjog4c/tumblr_static_tumblr_static_2ysj8lihjj6socgoo440sc0o8_focused_v3.gif" />
        </Row>
        <StyledRow2>
          <h2>
            Do You wanna be as strong as sharks do and be not beaten by anyone
            else
          </h2>
          <span> If yes, shop in our store and be as shark</span>
          <StyledCarousel fade>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://comps.canstockphoto.com/angry-cartoon-boxing-shark-clip-art-vector_csp21545864.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Muscular Shark</h3>
                <p>Shark in Gym</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="images\shark-sport-mascot-vector-701680.jpg"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Footballer Shark</h3>
                <p>Shark In footBall</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://w7.pngwing.com/pngs/1020/98/png-transparent-shark-on-surfboard-cartoon-surfing-extreme-sport-cartoon-sea-surfing-cartoon-character-mammal-sport.png"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Surfer Shark</h3>
                <p>Shark enjoying by surfing</p>
              </Carousel.Caption>
            </Carousel.Item>
          </StyledCarousel>
        </StyledRow2>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, actions)(Homepage)
const StyledRow = styled(Row)`
  background-color: #f2c4c4;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 20px;
  & h5 {
    font-size: 1.5rem !important;
    color: red !important;
  }
  & .sign {
    margin-top: 100px;
  }
`
const StyledButton = styled(Button)`
@media only screen and (min-size: 700px){
  width: 200px !important;
  margin-top: 100px;
  margin-left: 50px;
  }
  border-radius: 30px;
`
const StyledRow2 = styled(Row)`
  & h2 {
    margin-top: 20px;
    color: wheat !important;
    display: flex;
    justify-content: center;
  }
  & span {
    color: white;
    margin-bottom: 10px;
  }
`
const StyledCarousel = styled(Carousel)`
  & h3 {
    color: orangered;
  }
  & p {
    color: orangered;
  }
`
