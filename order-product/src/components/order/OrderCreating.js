    import React, { useState, useEffect } from 'react';
    import axios from "axios";
    import OrderValidator from '../../validator/OrderValidator';
    import {CREATE_ORDER_API} from "../../api/orderAPI";
    import {ORDER_INFO_DATA} from "../../data/OrderInfoData";
    import {AUTH_TOKEN} from "../../constant/AppContant";

    function OrderCreating() {
        const [orderInfo, setOrderInfo] = useState(ORDER_INFO_DATA);
        const [order, setOrder] = useState({
            givenNames: orderInfo[0].value,
            surname: orderInfo[1].value,
            email: orderInfo[2].value,
            phoneNumber: orderInfo[3].value,
            countryCode: orderInfo[4].value,
            countryName: orderInfo[5].value,
            postCode: orderInfo[6].value,
            suburb: orderInfo[7].value,
            line1: orderInfo[8].value,
            itemName: orderInfo[9].value,
            quantity: orderInfo[10].value,
            price: orderInfo[11].value,
            category: orderInfo[12].value,
            sku: orderInfo[13].value
        });


        useEffect(() => {
            setOrder((prevOrder) => ({
                ...prevOrder,
                givenNames: orderInfo[0].value,
                surname: orderInfo[1].value,
                email: orderInfo[2].value,
                phoneNumber: orderInfo[3].value,
                countryCode: orderInfo[4].value,
                countryName: orderInfo[5].value,
                postCode: orderInfo[6].value,
                suburb: orderInfo[7].value,
                line1: orderInfo[8].value,
                itemName: orderInfo[9].value,
                quantity: orderInfo[10].value,
                price: orderInfo[11].value,
                category: orderInfo[12].value,
                sku: orderInfo[13].value
            }));
        }, [orderInfo]);

        const handleChange = (event, index) => {
            const { name, value } = event.target;
            const updatedOrders = [...orderInfo];
            updatedOrders[index] = { ...updatedOrders[index], value: value };
            setOrderInfo(updatedOrders);

            setOrder((prevOrder) => ({
                ...prevOrder,
                [name]: value,
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();

            axios.post(`${CREATE_ORDER_API}`, order, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                },
            })
                .then((response) => {
                   const objResponse = response.data;
                    window.location.href = objResponse.checkoutUrl;
                })
                .catch((error) => {
                    console.error('Error sending request:', error);
                });
        };
        return (
            <div>
                <div className="container">
                    <div className="title">
                        <h2>Place an Order</h2>
                    </div>
                    <div className="d-flex">
                        <form>
                            {orderInfo?.map(({title, value, required, type}, index) => (
                                <div className="input-wrapper" key={index}>
                                    <label>
                                        <span className={title}>{title} <span className="required">*</span></span>
                                        <div className="input-container">
                                            <input
                                                type={type || "text"}
                                                required={required || ""}
                                                name={title}
                                                value={value || ""}
                                                onChange={(event) => handleChange(event, index)} />
                                            <div className="validator">
                                                <OrderValidator
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
                        <div className="your-order">
                            <table>
                                <tr>
                                    <th colSpan="2">Your order</th>
                                </tr>
                                <tr>
                                    <td>{orderInfo[9].value} x {orderInfo[10].value} (Qty)</td>
                                    <td>TOTAL => {orderInfo[10].value*orderInfo[11].value}  EUR</td>
                                </tr>
                                <tr>
                                    <td>Shipping</td>
                                    <td>Free shipping</td>
                                </tr>
                            </table>
                            <br></br>
                            <button type="button" onClick={handleSubmit} >Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    export default OrderCreating;
