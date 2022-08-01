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
import { Containers, Categories, Services } from "./Banners.js"
import { MdDeliveryDining } from "react-icons/md"
import { IoWallet } from "react-icons/io5"
import { Link } from "react-router-dom"
import { BsChatFill, BsCreditCardFill } from "react-icons/bs"
import { ToastContainer, toast, cssTransition } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../styles/slider-animation.css"
class Homepage extends React.PureComponent {
  swirl = cssTransition({
    enter: "swirl-in-fwd",
    exit: "swirl-out-bck",
  })
  toggleMenu() {
    this.props.fetchStoreCategories()
    this.props.toggleMenu()
  }
  toggleBrand() {
    this.props.fetchStoreBrands()
    this.props.toggleBrand()
  }
  renderAlert() {
    toast.info("Sign in to see personalized products", {
      transition: this.swirl,
    })
  }
  render() {
    const { history, brands, isMenuOpen, isBrandOpen, toggleMenu } = this.props

    const Services = [
      {
        image: <MdDeliveryDining />,
        title: "Free Shipping",
        subtitle: "Free Shipping on all orders over $100",
      },
      {
        image: <IoWallet />,
        title: "Secure Payment",
        subtitle: "Shop with Safet and Security",
      },
      {
        image: <BsChatFill />,
        title: "100% Satisfaction",
        subtitle: "30 Days money back Guarantee",
      },
      {
        image: <BsCreditCardFill />,
        title: "Customer Service",
        subtitle: "24/7 Customer Support",
      },
    ]

    return (
      <>
        <Carousel interval={null}>
          <Carousel.Item>
            <StyledImg
              className="d-block w-100"
              src="https://i.imgur.com/0ASbjos.jpg"
              alt="First slide"
            />
            <FirstCaption>
              <h3>Sign-up bonus</h3>
              <p>Sign-up to get 50% of on your first purchase</p>
              <Link to="/register">
                <button>Sign Up</button>
              </Link>
            </FirstCaption>
          </Carousel.Item>
          <Carousel.Item>
            <StyledImg
              className="d-block w-100"
              src="/images/banners/running.jpg"
              alt="Second slide"
            />

            <SecondCaption>
              <h3>Excellent shopping experience</h3>
              <p>Feel the awesome shopping experience</p>
              <Link to="/shop">
                <button>Shop Now</button>
              </Link>
            </SecondCaption>
          </Carousel.Item>
          <Carousel.Item>
            <StyledImg
              className="d-block w-100"
              src="https://i.imgur.com/hdeCel6.jpg"
              alt="Third slide"
            />

            <ThirdCaption>
              <h3>Discover New Arrivals</h3>
              <p>New Arrivals 2022</p>
              <Link to="/shop">
                <button>
                  <span>See More</span>
                </button>
              </Link>
            </ThirdCaption>
          </Carousel.Item>
        </Carousel>
        <StyledContainer fluid>
          <Row>
            <StyledCol xs={6} md={3}>
              <h3>Shop Trending</h3>
              <Link to="/shop">
                <ColumnsImages src="/images/banners/trending.jpg" />
              </Link>
            </StyledCol>
            <StyledCol xs={6} md={3}>
              <h3>Shop by Category</h3>
              <ColumnsImages
                src="/images/banners/category.jpg"
                onClick={() => this.toggleMenu()}
              />
            </StyledCol>
            <StyledCol xs={6} md={3}>
              <h3>Pick up For You</h3>
              <ColumnsImages
                src="/images/banners/picky.jpg"
                onClick={() => this.renderAlert()}
              />
              <StyledToast />
            </StyledCol>
            <StyledCol xs={6} md={3}>
              <h3>Baxshop Top Brands</h3>
              <ColumnsImages
                src="/images/banners/brands.jpg"
                onClick={() => this.toggleBrand()}
              />
            </StyledCol>
          </Row>
        </StyledContainer>
        <StyledContainer fluid>
          <Row>
            {Containers.map((item) => (
              <StyledCol xs={6} md={3}>
                <h3>{item.text}</h3>
                <Link to={item.link}>
                  <ColumnsImages src={item.image} />
                </Link>
              </StyledCol>
            ))}
          </Row>
        </StyledContainer>
        <Container fluid style={{ marginBottom: "20px" }}>
          <ParentDiv>
            <div>
              <CategoryImg src="/images/banners/women.png" />
            </div>
            <ChildDiv>
              <Link to="/shop/category/women">
                <button>View More {">"}</button>
              </Link>
            </ChildDiv>
          </ParentDiv>
        </Container>
        <StyledContainer fluid>
          <Row>
            {Categories.slice(0, 3).map((item) => (
              <StyledCol sm={12} md={4}>
                <ParentDiv>
                  <ColumnsImages src={item.image} />
                  <h4>{item.title}</h4>
                  <p>{item.price}</p>
                  <CategoryChildDiv>
                    <Link to={item.link}>
                      <button>See Item {">"}</button>
                    </Link>
                  </CategoryChildDiv>
                </ParentDiv>
              </StyledCol>
            ))}
          </Row>
        </StyledContainer>
        <Container fluid>
          <ParentDiv>
            <div>
              <CategoryImg src="/images/banners/men.png" />
            </div>
            <ChildDiv>
              <Link to="/shop/category/men">
                <button>View More {">"}</button>
              </Link>
            </ChildDiv>
          </ParentDiv>
        </Container>
        <StyledContainer fluid>
          <Row>
            {Categories.slice(3).map((item) => (
              <StyledCol sm={12} md={4}>
                <ParentDiv>
                  <ColumnsImages src={item.image} />
                  <h4>{item.title}</h4>
                  <p>{item.price}</p>
                  <CategoryChildDiv>
                    <Link to={item.link}>
                      <button>See Item {">"}</button>
                    </Link>
                  </CategoryChildDiv>
                </ParentDiv>
              </StyledCol>
            ))}
          </Row>
        </StyledContainer>
        <StyledContainer fluid>
          <Row>
            {Services.map((item) => (
              <StyledCol xs={12} md={3}>
                <ParentDiv>
                  <div>{item.image}</div>
                  <h4>{item.title}</h4>
                  <p>{item.subtitle}</p>
                </ParentDiv>
              </StyledCol>
            ))}
          </Row>
        </StyledContainer>
        <StyledContainer>
          <Row>
            <SignCol style={{ height: "150px" }} xs={12}>
              <Link to="/login">
                <SignButton>Sign in to see personalized products</SignButton>
              </Link>
            </SignCol>
          </Row>
        </StyledContainer>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const StyledToast = styled(ToastContainer)`
  background-color: aquamarine;
  border: 2px solid blueviolet;
`
const SignCol = styled(Col)`
  background-color: white;
  border: 2px solid black;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
`
const SignButton = styled.button`
  width: 80%;
  height: 50px;
  background-color: black;
  color: white;
`
const CategoryChildDiv = styled.div`
  position: absolute;
  bottom: 50%;
  left: 60%;
  z-index: 99;
  & button {
    background-color: black;
    color: white;
  }
`
const CategoryImg = styled.img`
  width: 100%;
  height: 900px;
  @media only screen and (max-width: 750px) {
    height: auto;
  }
`
const ParentDiv = styled.div`
  position: relative;
`
const ChildDiv = styled.div`
  position: absolute;
  top: 40%;
  left: 7%;
  z-index: 99;
  & button {
    background-color: black;
    color: white;
  }
`
const StyledContainer = styled(Container)`
  margin-top: 20px;
  background-color: #502e2e;
  margin-bottom: 20px;
`
const StyledCol = styled(Col)`
  background-color: white;
  border: 2px solid black;
  & h3 {
    @media only screen and (max-width: 350px) {
      font-size: 1rem;
    }
  }
`

const ColumnsImages = styled.img`
  width: auto;
  height: 200px;
  @media only screen and (max-width: 400px) {
    height: 100px;
  }
`
const StyledImg = styled.img`
  height: 400px;

  @media only screen and (max-width: 1000px) {
    height: 300px;
  }
`

const FirstCaption = styled(Carousel.Caption)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  word-break: break-all;
  width: 60%;
  padding-top: 0px;
  padding-bottom: 0px;
  & h3 {
    display: flex;
    justify-content: flex-start;
    color: white;
    font-weight: bold;
    font-size: 2.5rem;
    @media only screen and (max-width: 600px) {
      font-size: 1.5rem;
    }
    @media only screen and (max-width: 410px) {
      font-size: 1rem;
    }
  }
  p {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
    margin-bottom: 30px;
    color: white;
    font-size: 1.5rem;
    text-align-last: left;
    @media only screen and (max-width: 700px) {
      margin-bottom: 5px;
      margin-top: 5px;
    }
    @media only screen and (max-width: 600px) {
      font-size: 1rem;
    }
    @media only screen and (max-width: 400px) {
      font-size: 0.7rem;
      margin: 0px;
    }
  }
  & button {
    display: flex;
    justify-content: center;
    background-color: white;
    width: 80px;
    height: 50px;
    @media only screen and (max-width: 500px) {
      margin-top: 5px;
      height: 30px;
    }
  }
`
const SecondCaption = styled(Carousel.Caption)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  text-align-last: left;
  word-break: break-word;
  padding-top: 0px;
  padding-bottom: 0px;
  width: 60%;
  & h3 {
    display: flex;
    justify-content: flex-start;
    color: black;
    font-weight: bold;
    font-size: 1.5rem;
    text-align-last: left;
    @media only screen and (max-width: 600px) {
      font-size: 1.3rem;
    }
    @media only screen and (max-width: 430px) {
      font-size: 0.8rem;
    }
  }
  p {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
    margin-bottom: 30px;
    color: black;
    font-size: 1.5rem;
    text-align-last: left;
    @media only screen and (max-width: 700px) {
      margin-bottom: 5px;
      margin-top: 5px;
    }
    @media only screen and (max-width: 600px) {
      font-size: 0.9rem;
    }
    @media only screen and (max-width: 400px) {
      font-size: 0.5rem;
      margin: 0px;
    }
  }
  & button {
    display: flex;
    justify-content: center !important;
    background-color: black;
    color: white;
    width: 100px;
    height: 50px;
    @media only screen and (max-width: 500px) {
      margin-top: 5px;
      height: 30px;
    }
  }
`
const ThirdCaption = styled(Carousel.Caption)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 0px;
  padding-bottom: 0px;

  & h3 {
    display: flex;
    justify-content: center;
    color: black;
    font-weight: bold;
    font-size: 1.5rem;
    text-align-last: left;
    @media only screen and (max-width: 600px) {
      font-size: 1.5rem;
    }
    @media only screen and (max-width: 410px) {
      font-size: 1rem;
    }
  }
  p {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 30px;
    color: black;
    font-size: 1.5rem;
    text-align-last: left;
    @media only screen and (max-width: 700px) {
      margin-bottom: 5px;
      margin-top: 5px;
    }
    @media only screen and (max-width: 600px) {
      font-size: 1rem;
    }
    @media only screen and (max-width: 400px) {
      font-size: 0.7rem;
      margin: 0px;
    }
  }
  & button > span {
    display: flex;
    justify-content: center;
    background-color: black;
    color: white;
    width: 100px;
    height: 50px;
    @media only screen and (max-width: 500px) {
      margin-top: 5px;
      height: 30px;
    }
  }
`
export default connect(mapStateToProps, actions)(Homepage)
