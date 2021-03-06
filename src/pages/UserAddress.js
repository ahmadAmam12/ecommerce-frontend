import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Media,
  Nav,
  NavItem,
  Card,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaSignOutAlt } from "react-icons/fa";

import Navbar from "../component/NavBar";
import CardAddress from "../component/CardAddress";
//import style
import "../assets/style/style.css";
// import image
import EditSvg from "../assets/image/userDef.svg";
import MapPin from "../assets/image/map-pin.svg";
import Clipbord from "../assets/image/clipboard.svg";
import profileAction from "../redux/actions/profile";
import user from "../assets/image/avatar.png";

const Address = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { data, isLoading, isError, message } = useSelector(
    (state) => state.profile
  );
  const [avatar, setAvatar] = useState("");
  const [user_name, setName] = useState("");

  const [modal, setModal] = useState(false);
  const modalOpen = () => setModal(!modal);
  const [home, setHome] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    document.title= 'User Address Blanja Online'
    dispatch(profileAction.getAddress(token));
    if (data.length) {
      setName(data[0].user_name);
      setAvatar(data[0].photo);
    }
  }, [dispatch, token, data]);
  const dataAddress = useSelector((state) => state.profile.dataAddress);

  const onAddAddress = async () => {
    const data = {
      home,
      recipientName,
      recipientPhone,
      address,
      city,
      postalCode,
    };
    await dispatch(profileAction.addAddress(token, data));
    modalOpen()
    return dispatch(profileAction.getAddress(token));
  };

  const onLogout = () => {
    localStorage.clear();
  };

  const url = process.env.REACT_APP_BACKEND_URL;

  return (
    <React.Fragment>
      <Navbar />
      <div className="d-flex">
        <div className="sidebar">
          <aside className="row justify-content-center">
            <div>
              <Media className="mt-3">
                <Media left>
                  <Media
                    className="rounded-circle m-3 side-img"
                    object
                    src={avatar ? url + avatar : user}
                  />
                </Media>
                <Media body>
                  <div className="font-weight-bold mt-3">{user_name}</div>
                  <div className="text-muted row mt-1 ml-1">
                    <FaPencilAlt />
                    <p className="ml-1 edit-text">Ubah profile</p>
                  </div>
                </Media>
              </Media>
              <Nav vertical className="pl-5">
                <NavItem className="nav-item">
                  <Link to="/profile">
                    <Media className="align-items-center">
                      <Media
                        left
                        className="edit-img-wrap d-flex justify-content-center"
                      >
                        <img src={EditSvg} alt="edit" />
                      </Media>
                      <Media body className="ml-2">
                        My account
                      </Media>
                    </Media>
                  </Link>
                </NavItem>
                <NavItem className="nav-item">
                  <Link to="/profile/address">
                    <Media className="align-items-center">
                      <Media
                        left
                        className="pin-img-wrap d-flex justify-content-center"
                      >
                        <img src={MapPin} alt="mapPin" />
                      </Media>
                      <Media body className="ml-2">
                        Address
                      </Media>
                    </Media>
                  </Link>
                </NavItem>
                <NavItem className="nav-item">
                  <Link to="/user/address">
                    <Media className="align-items-center">
                      <Media
                        left
                        className="clip-img-wrap d-flex justify-content-center"
                      >
                        <img src={Clipbord} alt="clip" />
                      </Media>
                      <Media body className="ml-2">
                        My Order
                      </Media>
                    </Media>
                  </Link>
                </NavItem>
                <NavItem className="nav-item">
                  <Link to="/" onClick={onLogout}>
                    <Media className="align-items-center">
                      <Media left className="d-flex justify-content-center">
                        <FaSignOutAlt color="#8e8e8e" size={22} />
                      </Media>
                      <Media body className="ml-2">
                        Logout
                      </Media>
                    </Media>
                  </Link>
                </NavItem>
              </Nav>
            </div>
          </aside>
        </div>
        <div className="d-flex content p-5" sm="9">
          <div className="profile-edit shadow p-3 ">
            <div className="heading h3 font-weight-bold">
              Choose Another Address
            </div>
            <div className="text-muted small">
              add or change address rescipients
            </div>
            <hr />
            <div className="ml-5 mr-5 pb-5">
              <Card
                className="d-flex justify-content-center align-items-center card-add"
                onClick={modalOpen}
              >
                <CardTitle className="h5 text-muted">Add New Address</CardTitle>
              </Card>
              {!isLoading &&
                !isError &&
                dataAddress.length !== 0 &&
                dataAddress.map((item) => {
                  return (
                    <CardAddress
                      addressId={item.id}
                      userName={item.recipients_name}
                      userAddress={item.address}
                      userHome={item.home}
                      postalCode={item.postal_code}
                      userPhone={item.recipients_phone}
                    />
                  );
                })}
              {isLoading && !isError && <div>Loading</div>}
              {isError && message !== "" && <div>{message}</div>}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal isOpen={modal} className="modal-dialog-centered modal-lg">
          <ModalHeader className="row justify-content-center mt-3 ml-2 mr-2">
            <p className="font-weight-bold">Add New Address</p>
          </ModalHeader>
          <ModalBody>
            <label className="text-muted small mb-2">
              Save address as (ex: home address, office address)
            </label>
            <Input onChange={(e) => setHome(e.target.value)} type="text" />
            <div className="row justify-content-center">
              <div className="col">
                <label className="text-muted small">Recipient's Name</label>
                <Input
                  onChange={(e) => setRecipientName(e.target.value)}
                  type="text"
                />
              </div>
              <div className="col">
                <label className="text-muted small">
                  Recipient's Telphone Number
                </label>
                <Input
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  type="number"
                />
              </div>
            </div>
            <div className="row justify-content-center mt-2">
              <div className="col">
                <label className="text-muted small">Address</label>
                <Input
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                />
              </div>
              <div className="col">
                <label className="text-muted small">Postal Code</label>
                <Input
                  onChange={(e) => setPostalCode(e.target.value)}
                  type="number"
                />
              </div>
            </div>
            <div>
              <label className="text-muted small mt-2">
                City or Subdistrict
              </label>
              <Input
                className="mb-5"
                type="text"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary btn-modal m-3" onClick={modalOpen}>
              Cancel
            </Button>{" "}
            <Button color="success btn-modal m-3" onClick={onAddAddress}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Address;
