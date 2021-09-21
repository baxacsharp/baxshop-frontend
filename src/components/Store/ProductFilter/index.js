/**
 *
 * ProductFilter
 *
 */

import React from "react"
import { Card, CardBody, CardHeader, Badge } from "reactstrap"
import Aos from "aos"
import { useEffect } from "react"
import "aos/dist/aos.css"
import Radio from "../../Common/Radio"
import RangeSlider from "../../Common/RangeSlider"

const ProductFilter = (props) => {
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])
  const { totalProducts, pageNumber, filterProducts } = props
  // console.log(totalProducts)
  return (
    <div className="product-filter" data-aos="fade-up">
      <Card style={{ background: "greenyellow" }}>
        <CardHeader tag="h3">
          Showing:{" "}
          <Badge color="dark" style={{ whiteSpace: "break-spaces" }}>{`${
            totalProducts < 8 ? 0 : 8 * pageNumber - 8
          } – ${
            totalProducts < 8 ? totalProducts : 8 * pageNumber
          } products of ${totalProducts} products`}</Badge>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader tag="h3">Sort By:</CardHeader>
        <CardBody className="radio">
          <Radio
            handleChangeSubmit={(n, v) => {
              filterProducts(n, v)
            }}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader tag="h3">Price Range:</CardHeader>
        <CardBody>
          <RangeSlider
            name={"Range"}
            handlePriceChangeSubmit={(n, v) => {
              filterProducts(n, v)
            }}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader tag="h3">Customer Rating:</CardHeader>
        <CardBody>
          <RangeSlider
            name={"Slider"}
            handleRatingChangeSubmit={(n, v) => {
              filterProducts(n, v)
            }}
          />
        </CardBody>
      </Card>
    </div>
  )
}

export default ProductFilter
