/**
 *
 * Footer
 *
 */

import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Container } from "reactstrap"

import Newsletter from "../../../containers/Newsletter"

const Footer = () => {
  const infoLinks = [
    { id: 0, name: "Contact Us", to: "/contact" },
    { id: 1, name: "Sell With Us", to: "/sell" },
    { id: 2, name: "Shipping", to: "/shipping" },
  ]

  const footerBusinessLinks = (
    <ul className="support-links">
      <li className="footer-link">
        <Link to="/dashboard">Account Details</Link>
      </li>
      <li className="footer-link">
        <Link to="/dashboard/orders">Orders</Link>
      </li>
    </ul>
  )

  const footerLinks = infoLinks.map((item) => (
    <li key={item.id} className="footer-link">
      <Link key={item.id} to={item.to}>
        {item.name}
      </Link>
    </li>
  ))

  return (
    <footer style={{ backgroundColor: "#502E2E" }} className="footer">
      <Container>
        <div className="footer-content">
          <div className="footer-block">
            <div className="block-title">
              <StyledH2>Customer Service</StyledH2>
            </div>
            <div className="block-content">
              <StyledUl id="link">{footerLinks}</StyledUl>
            </div>
          </div>
          <div className="footer-block">
            <div className="block-title">
              <StyledH2>Links</StyledH2>
            </div>
            <div className="block-content">
              <StyledUl id="links">{footerLinks}</StyledUl>
            </div>
          </div>
          <div className="footer-block">
            <div className="block-title">
              <StyledH2>Newsletter</StyledH2>
              <Newsletter />
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <StyledSpan>© {new Date().getFullYear()} BaxShop</StyledSpan>
        </div>
        <ul className="footer-social-item">
          <li>
            <a href="/#facebook" rel="noreferrer noopener" target="_blank">
              <span className="facebook-icon" />
            </a>
          </li>
          <li>
            <a href="/#instagram" rel="noreferrer noopener" target="_blank">
              <span className="instagram-icon" />
            </a>
          </li>
          <li>
            <a href="/#pinterest" rel="noreferrer noopener" target="_blank">
              <span className="pinterest-icon" />
            </a>
          </li>
          <li>
            <a href="/#twitter" rel="noreferrer noopener" target="_blank">
              <span className="twitter-icon" />
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  )
}

export default Footer

const StyledH2 = styled.h2`
  color: rosybrown !important;
`
const StyledUl = styled.ul`
  color: aquamarine !important;

  & #links {
    color: aquamarine !important;
  }
`

const StyledSpan = styled.span`
  color: seagreen !important;
`
