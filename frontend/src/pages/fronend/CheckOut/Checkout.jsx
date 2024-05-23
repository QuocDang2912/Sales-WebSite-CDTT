import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { urlImage } from '../../../Api/config'
import { reset } from '../../../state/CartSlice'
import { useState, useEffect } from 'react';
import OrderServie from '../../../services/OrderService'
import OrderDetailService from '../../../services/OrderDetailService'
import { ToastContainer, toast } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'
import emailjs from '@emailjs/browser';

import axios from 'axios';
import { useLocation } from 'react-router-dom';



export default function Checkout() {
    const location = useLocation();
    const dispatch = useDispatch()
    // lấy thông tin user  trên redux

    let user = useSelector((state) => state.user.current)
    // const [statusNote, setStatusNote] = useState("Chưa thanh toán")
    // console.log("🚀 ~ Checkout ~ statusNote:", statusNote)

    const [inputs, setInputs] = useState({
        user_id: user.id,
        delivery_name: user.name,
        delivery_gender: user.gender,
        delivery_email: user.email,
        delivery_phone: user.phone,
        note: "Chưa thanh toán",
        status: 1,
        delivery_address: ""
    });
    console.log("🚀 ~ Checkout ~ inputs:", inputs)
    // redux

    // state call api địa chỉ
    const [cityData, setCityData] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    // state call api địa chỉ




    let cartItem = useSelector((state) => state.cart.items) // lấy ra mảng item

    const total = cartItem.reduce((totalPrice, item) => { // toongr tien

        return totalPrice + item.count * (item.pricesale ? (item.price - item.pricesale) : item.price)
    }, 0)







    // convert arr form orderdetail

    const convert_arr_form_ordedetail = []

    cartItem.map((item) => {
        return convert_arr_form_ordedetail.push(
            {
                product_id: item.id,
                price: item.price,
                qty: item.count,
                discount: item.pricesale ? item.pricesale : 0,
                amount: item.count
            }
        )
    })
    // lấy dữ liệu form
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    };

    // call api địa chỉ
    useEffect(() => {
        const fetchCityData = async () => {
            try {
                const response = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
                setCityData(response.data);

                const savedInputs = JSON.parse(localStorage.getItem('checkoutInputs'));
                if (savedInputs) {
                    setInputs(savedInputs);
                    setSelectedCity(savedInputs.selectedCity || '');
                    setSelectedDistrict(savedInputs.selectedDistrict || '');
                    setSelectedWard(savedInputs.selectedWard || '');
                }

                const queryParams = new URLSearchParams(location.search);
                const message = queryParams.get('message');
                if (message === 'Successful.') {
                    console.log("cc")
                    const updatedInputs = { ...inputs, note: "Đã thanh toán" };
                    setInputs(updatedInputs);
                }
            } catch (error) {
                console.error("Error fetching city data:", error);
            }
        };
        fetchCityData();
    }, [location.search]);


    useEffect(() => {
        const selectedCityName = cityData.find(city => city.Id === selectedCity)?.Name || '';
        const selectedDistrictName = cityData.find(city => city.Id === selectedCity)?.Districts.find(district => district.Id === selectedDistrict)?.Name || '';
        const selectedWardName = cityData.find(city => city.Id === selectedCity)?.Districts.find(district => district.Id === selectedDistrict)?.Wards.find(ward => ward.Id === selectedWard)?.Name || '';
        const address = `${selectedWardName}, ${selectedDistrictName}, ${selectedCityName}`;
        setInputs(prevInputs => ({ ...prevInputs, delivery_address: address }));
    }, [selectedCity, selectedDistrict, selectedWard]);

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        setSelectedDistrict('');
        setSelectedWard('');
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
        setSelectedWard('');
    };
    // tác động đến ô input khi chọn ở ô select

    // end call api địa chỉ


    // test tính tiền ship
    const shippingDistancesFromHCM = {
        "Thành phố Hà Nội": 1719,
        "Tỉnh Hà Giang": 1400,
        "Tỉnh Cao Bằng": 1982,
        "Tỉnh Bắc Kạn": 1557,
        "Tỉnh Tuyên Quang": 1553,
        "Tỉnh Lào Cai": 1197,
        "Tỉnh Điện Biên": 1215,
        "Tỉnh Lai Châu": 1197,
        "Tỉnh Sơn La": 1380,
        "Tỉnh Yên Bái": 1551,
        "Tỉnh Hoà Bình": 1643,
        "Tỉnh Thái Nguyên": 1643,
        "Tỉnh Lạng Sơn": 1656,
        "Tỉnh Quảng Ninh": 1566,
        "Tỉnh Bắc Giang": 1668,
        "Tỉnh Phú Thọ": 1670,
        "Tỉnh Vĩnh Phúc": 1670,
        "Tỉnh Bắc Ninh": 1688,
        "Tỉnh Hải Dương": 1663,
        "Thành phố Hải Phòng": 1618,
        "Tỉnh Hưng Yên": 1657,
        "Tỉnh Thái Bình": 1610,
        "Tỉnh Hà Nam": 1708,
        "Tỉnh Nam Định": 1629,
        "Tỉnh Ninh Bình": 1626,
        "Tỉnh Thanh Hóa": 1566,
        "Tỉnh Nghệ An": 1428,
        "Tỉnh Hà Tĩnh": 1379,
        "Tỉnh Quảng Bình": 1231,
        "Tỉnh Quảng Trị": 898,
        "Tỉnh Thừa Thiên Huế": 1065,
        "Thành phố Đà Nẵng": 977,
        "Tỉnh Quảng Nam": 439,
        "Tỉnh Quảng Ngãi": 835,
        "Tỉnh Bình Định": 835,
        "Tỉnh Phú Yên": 560,
        "Tỉnh Khánh Hòa": 439,
        "Tỉnh Ninh Thuận": 439,
        "Tỉnh Bình Thuận": 188,
        "Tỉnh Kon Tum": 837,
        "Tỉnh Gia Lai": 837,
        "Tỉnh Đắk Lắk": 837,
        "Tỉnh Đắk Nông": 837,
        "Tỉnh Lâm Đồng": 292,
        "Tỉnh Bình Phước": 189,
        "Tỉnh Tây Ninh": 99,
        "Tỉnh Bình Dương": 40,
        "Tỉnh Đồng Nai": 40,
        "Tỉnh Bà Rịa - Vũng Tàu": 120,
        "Thành phố Hồ Chí Minh": 0,
        "Tỉnh Long An": 50,
        "Tỉnh Tiền Giang": 70,
        "Tỉnh Bến Tre": 85,
        "Tỉnh Trà Vinh": 135,
        "Tỉnh Vĩnh Long": 135,
        "Tỉnh Đồng Tháp": 123,
        "Tỉnh An Giang": 170,
        "Tỉnh Kiên Giang": 244,
        "Thành phố Cần Thơ": 170,
        "Tỉnh Hậu Giang": 189,
        "Tỉnh Sóc Trăng": 230,
        "Tỉnh Bạc Liêu": 280,
        "Tỉnh Cà Mau": 347
    };

    let distance_Kilomet = 0;
    const selectedCityName = cityData.find(city => city.Id === selectedCity)?.Name;
    if (selectedCityName && selectedCityName in shippingDistancesFromHCM) {
        distance_Kilomet = shippingDistancesFromHCM[selectedCityName];
    }
    const shippingFee = distance_Kilomet * 100; // mỗi km tạm tính 100 (VND)



    // đặc vào giỏ hàng
    const handleSubmit = (event) => {
        event.preventDefault();
        (
            async () => {
                try {
                    // đẩy lên order
                    const res = await OrderServie.store(inputs)
                    // đẩy lên order detail
                    // tạo form đúng với backend
                    const form_orderDetail = {
                        order_id: res.order.id,
                        products: convert_arr_form_ordedetail
                    }
                    const Call_Order_detail = await OrderDetailService.store(form_orderDetail)

                    // gửi email khi đặc hàng thành công

                    // tổng tiền
                    const amount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total + shippingFee)

                    emailjs.send("service_gjtj4yf", "template_4hu27vp", {
                        // user_email: user.email,
                        user_email: "bngoc7498@gmail.com",
                        user_name: user.name,
                        address: inputs.delivery_address,
                        result: amount
                    }, {
                        publicKey: 'IMiWlEiyoza8USljv',
                    })
                        .then(
                            () => {
                                console.log('SUCCESS!');
                            },
                            (error) => {
                                console.log('FAILED...', error.text);
                            },
                        );

                    // end gửi email khi đặc hàng thành công

                    toast.success("Đặt Hàng  Thành công");

                    // reset 

                    localStorage.removeItem('cart');
                    localStorage.removeItem('checkoutInputs');

                    dispatch(
                        reset()
                    )

                } catch (error) {
                    console.log("🚀 ~ ngu check out sai:", error)
                    toast.error("Đặt Hàng Thất Bại");
                }

            }
        )()
        console.log(inputs);
    }

    // test momo
    const handleSubmit1 = async (event) => {
        console.log("test momo")
        event.preventDefault();
        try {
            const total_momo = total + shippingFee
            // Save selections to localStorage
            const savedInputs = { ...inputs, selectedCity, selectedDistrict, selectedWard };
            localStorage.setItem('checkoutInputs', JSON.stringify(savedInputs));

            const response = await OrderServie.momo_pay({ total_momo: total_momo })
            window.location.href = response.payUrl;

        } catch (error) {
            console.error('Error:', error);
            // Xử lý lỗi nếu có
        }
    }



    return (
        <div>
            <section className="bg-light">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb py-2 my-0">
                            <li className="breadcrumb-item">
                                <a className="text-main" href="index.html">Trang chủ</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Thanh toán
                            </li>
                        </ol>
                    </nav>
                </div>
            </section >
            <section className="hdl-maincontent py-2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <form onSubmit={handleSubmit}>
                                <h2 className="fs-5 text-main">Thông tin giao hàng</h2>
                                <p>Bạn có tài khoản chưa? <a href="login.html">Đăng nhập</a></p>
                                <div className="card">
                                    <div className="card-header text-main">
                                        Địa chỉ nhận hàng
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label htmlFor="address">Địa chỉ</label>
                                            <input type="text" name="delivery_address"

                                                value={inputs.delivery_address || ""}
                                                onChange={handleChange}

                                                id="address" className="form-control" placeholder="Nhập địa chỉ" />
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <select value={selectedCity} onChange={handleCityChange} className="form-select form-select-sm mb-3" aria-label=".form-select-sm">
                                                    <option value="" selected>Chọn tỉnh thành</option>
                                                    {cityData.map(city => (
                                                        <option key={city.Id} value={city.Id}>{city.Name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-4">
                                                <select value={selectedDistrict} onChange={handleDistrictChange} className="form-select form-select-sm mb-3" aria-label=".form-select-sm">
                                                    <option value="" selected>Chọn quận huyện</option>
                                                    {selectedCity && cityData.find(city => city.Id === selectedCity)?.Districts.map(district => (
                                                        <option key={district.Id} value={district.Id}>{district.Name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-4">
                                                <select value={selectedWard} onChange={(event) => setSelectedWard(event.target.value)} className="form-select form-select-sm" aria-label=".form-select-sm">
                                                    <option value="" selected>Chọn phường xã</option>
                                                    {selectedDistrict && cityData.find(city => city.Id === selectedCity)?.Districts.find(district => district.Id === selectedDistrict)?.Wards.map(ward => (
                                                        <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h4 className="fs-6 text-main mt-4">Phương thức thanh toán</h4>
                                <div className="thanhtoan mb-4">
                                    <div className="p-4 border">
                                        <input name="typecheckout" onchange="showbankinfo(this.value)" type="radio" defaultValue={1} id="check1" />
                                        <label htmlFor="check1">Thanh toán khi giao hàng</label>
                                    </div>
                                    <div className="p-4 border">
                                        <input name="typecheckout" onchange="showbankinfo(this.value)" type="radio" defaultValue={2} id="check2" />
                                        <label htmlFor="check2">Chuyển khoản qua ngân hàng</label>
                                    </div>
                                    <div className="p-4 border bankinfo">
                                        <form>
                                            <input type='hidden' name='total_momo' /> {/* Set the value as per your requirement */}
                                            <button onClick={handleSubmit1} type='submit'>Thanh toán Momo</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <button style={{ backgroundColor: "red" }} type="submit" className="btn btn-main px-4">XÁC NHẬN</button>
                                </div>
                            </form>
                        </div>

                        <div className="col-md-7">
                            <h2 className="fs-5 text-main">Thông tin đơn hàng</h2>
                            <table className="table table-borderless">
                                <thead>
                                    <tr className="bg-dark">
                                        <th style={{ width: 30 }} className="text-center">STT</th>
                                        <th style={{ width: 100 }}>Hình</th>
                                        <th>Tên sản phẩm</th>
                                        <th style={{ width: 130 }} className="text-center">Số lượng</th>
                                        <th className="text-center">Giá</th>
                                        <th className="text-center">Giá giảm</th>
                                        <th className="text-center">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartItem && cartItem.length > 0 &&
                                        cartItem.map((item, index) => {

                                            return (
                                                <tr key={index}>
                                                    <td className="text-center align-middle">{index}</td>
                                                    <td>
                                                        <img style={{ height: 80, width: 100 }} classname="img-fluid " src={urlImage + "product/" + item.image} alt="" />
                                                    </td>
                                                    <td className="align-middle">{item.name}</td>
                                                    {/* <input type="text" value={item.count} id="qty" className="form-control text-center" /> */}
                                                    <td class="text-center align-middle">{item.count}</td>

                                                    <td className="text-center align-middle">
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}

                                                    </td>

                                                    <td className="text-center align-middle">
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.pricesale ? item.pricesale : parseInt(0))}
                                                    </td>
                                                    <td className="text-center align-middle">
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.pricesale ? (item.price - item.pricesale) * item.count : item.price * item.count)}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }


                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={7} className="text-end">
                                            <strong>Tổng:
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                                            </strong>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Mã giảm giá" aria-describedby="basic-addon2" />
                                    <span className="input-group-text" id="basic-addon2">Sử dụng</span>
                                </div>
                            </div>
                            <table className="table table-borderless">
                                <tbody><tr>
                                    <th>Tạm tính</th>
                                    <td className="text-end">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                                    </td>
                                </tr>
                                    <tr>
                                        <th>Phí vận chuyển</th>
                                        <td className="text-end">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shippingFee)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Giảm giá</th>
                                        <td className="text-end">0 đ</td>
                                    </tr>
                                    <tr>
                                        <th>Tổng cộng</th>
                                        <td className="text-end" style={{ color: "red" }}>
                                            <span>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total + shippingFee)}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

        </div >

    )
}
