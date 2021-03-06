import React, { useEffect } from "react";
import {
  Container,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  Button,
  Row,
  Input,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../component/NavBar";
import "../assets/style/style.css";
import CartAction from "../redux/actions/product";
import NumberFormat from "react-number-format";

//import component
import CartCard from "../component/CartCard";

const Cart = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    document.title= 'My Bag Belanja Online'
    dispatch(CartAction.getCart(token));
  }, [dispatch, token]);
  const cartIndex = useSelector((state) => state.product);
  const { isLoading, isError, dataCart } = cartIndex;
  const url = process.env.REACT_APP_BACKEND_URL;

  return (
    <div>
      <>
        <Navbar />
        <Container>
          <h1 className="mt-4">My Bag</h1>
          <Row>
            <div>
              <Card className="cart-check shadow-sm mt-3">
                <CardBody className="ml-3 row">
                  <Input type="checkbox" />
                  <p className="col-sm-11">Select All item</p>
                  <a href="/cart" className="text-danger">
                    {" "}
                    delete
                  </a>
                </CardBody>
              </Card>
              {!isLoading &&
                !isError &&
                dataCart.length !== 0 &&
                dataCart.data.map((item) => {
                  return (
                    <CartCard
                      cartId={item.id}
                      productName={item.name}
                      productCategory={item.category_name}
                      productPrice={item.price}
                      productImage={url + item.url}
                    />
                  );
                })}
            </div>
            <div>
              <Card className="card-buy shadow-sm mt-3 ml-4">
                <CardBody>
                  <CardTitle>Shopping summary</CardTitle>
                  <div className="row mb-5">
                    <CardSubtitle className="col-sm-7">
                      Total Harga
                    </CardSubtitle>
                    <p className="text-danger col-sm-5 row justify-content-end">
                      <NumberFormat
                        value={dataCart.sumPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp. "}
                      />
                    </p>
                  </div>
                  <Button className="btn-buy bg-success rounded-pill">Buy</Button>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    </div>
  );
};

export default Cart;
