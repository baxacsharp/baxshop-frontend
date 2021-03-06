import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { Link, NavLink as ActiveLink, withRouter } from "react-router-dom"
import Autosuggest from "react-autosuggest"
import AutosuggestHighlightMatch from "autosuggest-highlight/match"
import AutosuggestHighlightParse from "autosuggest-highlight/parse"
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import actions from "../../actions"
import Button from "../../components/Common/Button"
import CartIcon from "../../components/Common/CartIcon"
import { BarsIcon } from "../../components/Common/Icon"
import MiniBrand from "../../components/Store//MiniBrand"
import Menu from "../NavigationMenu"
import Cart from "../Cart"
import "../../styles/slider-animation.css"
class Navigation extends React.PureComponent {
  componentDidMount() {
    this.props.fetchStoreBrands()
  }

  toggleBrand() {
    this.props.fetchStoreBrands()
    this.props.toggleBrand()
  }

  toggleMenu() {
    this.props.fetchStoreCategories()
    this.props.toggleMenu()
  }

  getSuggestionValue(suggestion) {
    return suggestion.name
  }

  renderSuggestion(suggestion, { query, isHighlighted }) {
    const BoldName = (suggestion, query) => {
      const matches = AutosuggestHighlightMatch(suggestion.name, query)
      const parts = AutosuggestHighlightParse(suggestion.name, matches)

      return (
        <div>
          {parts.map((part, index) => {
            const className = part.highlight
              ? "react-autosuggest__suggestion-match"
              : null
            return (
              <span
                style={{ backgroundColor: "#d6c3c3" }}
                className={className}
                key={index}
              >
                {part.text}
              </span>
            )
          })}
        </div>
      )
    }

    return (
      <Link to={`/product/${suggestion.slug}`}>
        <div className="d-flex">
          <img
            className="item-image"
            src={`${
              suggestion.imageUrl
                ? suggestion.imageUrl
                : "/images/placeholder-image.png"
            }`}
          />
          <div>
            <Container>
              <Row>
                <Col>
                  <span className="name">{BoldName(suggestion, query)}</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span className="price">${suggestion.price}</span>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </Link>
    )
  }

  render() {
    const {
      history,
      authenticated,
      user,
      cartItems,
      brands,
      signOut,
      isMenuOpen,
      isCartOpen,
      isBrandOpen,
      toggleCart,
      toggleMenu,
      searchValue,
      suggestions,
      onSearch,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested,
    } = this.props

    const inputProps = {
      placeholder: "Search Products",
      value: searchValue,
      onChange: (_, { newValue }) => {
        onSearch(newValue)
      },
    }

    return (
      <header
        style={{ backgroundColor: "#4A4444" }}
        className="header fixed-mobile-header"
      >
        <StyledContainer>
          <Row className="align-items-center top-header">
            <Col
              xs={{ size: 12, order: 1 }}
              sm={{ size: 12, order: 1 }}
              md={{ size: 3, order: 1 }}
              lg={{ size: 3, order: 1 }}
            >
              <div className="brand">
                <Button
                  borderless
                  variant="empty"
                  className="d-none d-md-block"
                  ariaLabel="open the menu"
                  icon={<BarsIcon />}
                  onClick={() => this.toggleMenu()}
                />
                <Link to="/">
                  <Row>
                    <Col style={{ marginLeft: "10px" }} xs={11}>
                      <img
                        style={{ width: "90px" }}
                        src="https://cdn.awsli.com.br/1889/1889204/logo/437a0ea9a1.jpg"
                      />
                    </Col>
                  </Row>
                </Link>
              </div>
            </Col>
            <StyledCol
              xs={{ size: 12, order: 4 }}
              sm={{ size: 12, order: 4 }}
              md={{ size: 12, order: 4 }}
              lg={{ size: 5, order: 2 }}
              className="pt-2 pt-lg-0 search"
            >
              <StyledSearch
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={(_, item) => {
                  history.push(`/product/${item.suggestion.slug}`)
                }}
              />
            </StyledCol>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 4, order: 1 }}
              lg={{ size: 5, order: 3 }}
              className="desktop-hidden"
            >
              <div className="header-links">
                <Button
                  borderless
                  variant="empty"
                  ariaLabel="open the menu"
                  icon={<BarsIcon />}
                  onClick={() => this.toggleMenu()}
                />
                <CartIcon cartItems={cartItems} onClick={toggleCart} />
              </div>
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 9, order: 1 }}
              lg={{ size: 4, order: 3 }}
              // className='px-0'
            >
              <StyledNavbar expand="md" className="mt-1 mt-md-0">
                <CartIcon
                  className="d-none d-md-block"
                  cartItems={cartItems}
                  onClick={toggleCart}
                />
                <Nav navbar>
                  <Dropdown
                    direction="left"
                    nav
                    inNavbar
                    toggle={() => this.toggleBrand()}
                    isOpen={isBrandOpen}
                  >
                    <StyledDropdownToggle nav>
                      Brands
                      <span className="fa fa-chevron-down dropdown-caret"></span>
                    </StyledDropdownToggle>
                    <StyledDropdown left className="nav-brand-dropdown">
                      <div className="mini-brand">
                        {brands && brands.length > 0 && (
                          <MiniBrand
                            brands={brands}
                            toggleBrand={() => this.toggleBrand()}
                          />
                        )}
                      </div>
                    </StyledDropdown>
                  </Dropdown>
                  <NavItem>
                    <StyledNavLink tag={ActiveLink} to="/shop">
                      Shop
                    </StyledNavLink>
                  </NavItem>
                  {authenticated ? (
                    <UncontrolledDropdown nav inNavbar>
                      <StyledDropdownToggle nav>
                        {user.firstName ? user.firstName : "Welcome"}
                        <span className="fa fa-chevron-down dropdown-caret"></span>
                      </StyledDropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          onClick={() => history.push("/dashboard")}
                        >
                          Dashboard
                        </DropdownItem>
                        <DropdownItem onClick={signOut}>Sign Out</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) : (
                    <UncontrolledDropdown nav inNavbar>
                      <StyledDropdownToggle nav>
                        Welcome!
                        <span className="fa fa-chevron-down dropdown-caret"></span>
                      </StyledDropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={() => history.push("/login")}>
                          Login
                        </DropdownItem>
                        <DropdownItem onClick={() => history.push("/register")}>
                          Sign Up
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )}
                </Nav>
              </StyledNavbar>
            </Col>
          </Row>
        </StyledContainer>

        {/* hidden cart drawer */}
        <div
          className={isCartOpen ? "mini-cart-open" : "hidden-mini-cart"}
          aria-hidden={`${isCartOpen ? false : true}`}
        >
          <div className="mini-cart">
            <Cart />
          </div>
          <div
            className={
              isCartOpen ? "drawer-backdrop dark-overflow" : "drawer-backdrop"
            }
            onClick={toggleCart}
          />
        </div>

        {/* hidden menu drawer */}
        <div
          className={isMenuOpen ? "mini-menu-open" : "hidden-mini-menu"}
          aria-hidden={`${isMenuOpen ? false : true}`}
        >
          <div className="mini-menu">
            <Menu />
          </div>
          <div
            className={
              isMenuOpen ? "drawer-backdrop dark-overflow" : "drawer-backdrop"
            }
            onClick={toggleMenu}
          />
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isMenuOpen: state.navigation.isMenuOpen,
    isCartOpen: state.navigation.isCartOpen,
    isBrandOpen: state.navigation.isBrandOpen,
    cartItems: state.cart.cartItems,
    brands: state.brand.storeBrands,
    authenticated: state.authentication.authenticated,
    user: state.account.user,
    searchValue: state.navigation.searchValue,
    suggestions: state.navigation.searchSuggestions,
  }
}

export default connect(mapStateToProps, actions)(withRouter(Navigation))
const StyledNavLink = styled(NavLink)`
  color: white !important;
`
const StyledDropdownToggle = styled(DropdownToggle)`
  color: white !important;
`
const StyledContainer = styled(Container)`
  & h1 {
    color: whitesmoke !important;
  }
`
const StyledCol = styled(Col)`
  background-color: #d6c3c3;
  border: 2px solid #707070;
`
const StyledSearch = styled(Autosuggest)`
  background-color: #d6c3c3;
`
const StyledNavbar = styled(Navbar)`
  background-color: #4a4444 !important;
`
const StyledDropdown = styled(DropdownMenu)`
  margin-right: 100px !important;
`
