import React, { useState, useEffect } from 'react';
import axios from "axios";
import Validator from './FormValidator';

function OrderProduct() {
    const orderApi = "http://localhost:8080/sendRequest";
    const [orders, setOrders] = useState([
        {
            title: "Given Names",
            value: "",
            required: false,
            type: "text"
        },
        {
            title: "Surname",
            value: "",
            required: false,
            type: "text"
        },
        {
            title: "Email",
            value: "",
            required: false,
            type: "text"
        },
        {
            title: "Phone Number",
            value: "",
            required: true,
            type: "text",
        },
        {
            title: "Country code",
            value: "",
            required: false,
            type: "text"
        },
        {
            title: "Country name",
            value: "",
            required: false,
            type: "text"
        },
        {
            title: "Post code",
            value: "",
            required: false,
            type: "text"
        },
        {
            title: "Suburb",
            value: "",
            required: false,
            type: "text"
        },
        {
            title: "Line1",
            value: "",
            required: false,
            type: "text"
        },
        {
            title: "Item name",
            value: "",
            required: false,
            type: "text"
        },
        {
            title: "Quantity",
            value: "",
            required: false,
            type: "text"
        },
        {
            title: "Price",
            value: "",
            required: false,
            type: "text"
        },
        {
            title: "Category",
            value: "",
            required: false,
            type: "text"
        },
        {
            title: "Sku",
            value: "",
            required: false,
            type: "text"
        },

    ]);
    const [order, setOrder] = useState({
        givenNames:orders[0].value,
        surname:orders[1].value,
        email:orders[2].value,
        phoneNumber:orders[3].value,
        countryCode:orders[4].value,
        countryName:orders[5].value,
        postCode:orders[6].value,
        suburb:orders[7].value,
        line1:orders[8].value,
        itemName:orders[9].value,
        quantity:orders[10].value,
        price:orders[11].value,
        category:orders[12].value,
        sku:orders[13].value
    });

    useEffect(() => {

        setOrder((prevOrder) => ({
            ...prevOrder,
            givenNames:orders[0].value,
            surname:orders[1].value,
            email:orders[2].value,
            phoneNumber:orders[3].value,
            countryCode:orders[4].value,
            countryName:orders[5].value,
            postCode:orders[6].value,
            suburb:orders[7].value,
            line1:orders[8].value,
            itemName:orders[9].value,
            quantity:orders[10].value,
            price:orders[11].value,
            category:orders[12].value,
            sku:orders[13].value
        }));
    }, [orders]);

    function handleChange(event, index) {
        const { name, value } = event.target;
        const updatedOrders = [...orders];
        updatedOrders[index] = { ...updatedOrders[index], value: value };
        setOrders(updatedOrders);
        setOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value,
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${orderApi}`, order, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer qhtfs87hjnc12kkos`,
            },
        })
            .then((response) => {
               const objResponse = response.data;
                window.location.href = objResponse.checkoutUrl;
                console.log( objResponse.checkoutUrl);
            })
            .catch((error) => {
                console.log(order);
                console.error('Error sending request:', error);
            });
    };
    return (
        <div>
            <div className="container">
                <div className="title">
                    <h2>Product Order Form</h2>
                </div>
                <div className="d-flex">
                    <form>
                        {orders?.map(({title, value, required, type}, index) => (
                            <div className="input-wrapper" key={index}>
                                <label>
                                    <span className={title}>{title} <span className="required">*</span></span>
                                    <div className="input-container">
                                        <input type={type || "text"} required={required || ""} name={title} value={value || ""} onChange={(event) => handleChange(event, index)} />
                                        <div className="validator">
                                            <Validator
                                                value={value}
                                                rules={{
                                                    required: true,
                                                    noNumbers: (title === "Given Names" || title === "Surname") && required,
                                                    email: title === "Email",
                                                    phoneNumber: title === "Phone Number",
                                                    countryCode: title === "Country code",
                                                    isNum: (title === "Quantity" || title === "Price") && required
                                                }}
                                            />
                                        </div>

                                    </div>

                                </label>

                            </div>
                        ))}
                    </form>
                    <div className="Yorder">
                        <table>
                            <tr>
                                <th colSpan="2">Your order</th>
                            </tr>
                            <tr>
                                <td>{orders[9].value} x {orders[10].value} (Qty)</td>
                                <td>TOTAL => {orders[10].value*orders[11].value}  EUR</td>
                            </tr>
                            <tr>
                                <td>Shipping</td>
                                <td>Free shipping</td>
                            </tr>
                        </table>
                        <br></br>
                        <button type="button" onClick={handleSubmit}>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderProduct;
