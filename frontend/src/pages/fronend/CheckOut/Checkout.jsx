import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { urlImage } from "../../../Api/config";
import { reset } from "../../../state/CartSlice";
import { useState, useEffect } from "react";
import OrderServie from "../../../services/OrderService";
import OrderDetailService from "../../../services/OrderDetailService";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import emailjs from "@emailjs/browser";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DiscountcodeService from "../../../services/DiscountcodeService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ProductServie from "../../../services/ProductService";

export default function Checkout() {
    const location = useLocation();
    const dispatch = useDispatch();

    const navi = useNavigate()
    // lấy thông tin user  trên redux

    let user = useSelector((state) => state.user.current);

    const [inputs, setInputs] = useState({
        user_id: user.id,
        delivery_name: user.name,
        delivery_gender: user.gender,
        delivery_email: user.email,
        delivery_phone: user.phone,
        note: "Chưa thanh toán",
        status: 1,
        delivery_address: "",
    });
    console.log("inputs", inputs)
    // redux

    // state call api địa chỉ
    const [cityData, setCityData] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    // state call api địa chỉ

    // tổng tiền giảm giá ( mã code)
    const [code, setCode] = useState('');
    // Modal show mã giảm giá
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // Modal show mã giảm giá
    const [discountCodes, setDiscountCodes] = useState([]);
    // code được chọn
    const [selectCode, setSelectCode] = useState({})


    const [totalSale, setTotalSale] = useState(0)
    // tổng tiền giảm giá ( mã code)


    let cartItem = useSelector((state) => state.cart.items); // lấy ra mảng item

    const total = cartItem.reduce((totalPrice, item) => {
        // toongr tien
        return (
            totalPrice +
            item.count * (item.pricesale ? item.price - item.pricesale : item.price)
        );
    }, 0);

    // convert arr form orderdetail

    const convert_arr_form_ordedetail = [];

    cartItem.map((item) => {
        return convert_arr_form_ordedetail.push({
            product_id: item.id,
            price: item.price,
            qty: item.count,
            discount: item.pricesale ? item.pricesale : 0,
        });
    });
    // lấy dữ liệu form
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    };

    // call api địa chỉ ; lấy dữ liệu từ local ;call mã code
    useEffect(() => {
        const fetchCityData = async () => {
            try {
                const response = await axios.get(
                    "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
                );
                setCityData(response.data);

                const savedInputs = JSON.parse(localStorage.getItem("checkoutInputs"));
                if (savedInputs) {
                    setInputs(savedInputs);
                    setSelectedCity(savedInputs.selectedCity || "");
                    setSelectedDistrict(savedInputs.selectedDistrict || "");
                    setSelectedWard(savedInputs.selectedWard || "");
                }
                /// call mã code
                const result = await DiscountcodeService.index();
                setDiscountCodes(result.Discountcode)
                /// call mã code

            } catch (error) {
                console.error("Error fetching city data:", error);
            }
        };
        fetchCityData();
    }, []);
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const message = queryParams.get("message");

        if (message === "Successful.") {
            const savedInputs = JSON.parse(localStorage.getItem("checkoutInputs"));
            if (savedInputs) {
                const updatedInputs = { ...savedInputs, note: "Đã thanh toán" };
                setInputs(updatedInputs);
                handleSubmitAfterMomo(updatedInputs);
            }
        }
    }, [location.search]);

    useEffect(() => {
        const selectedCityName =
            cityData.find((city) => city.Id === selectedCity)?.Name || "";
        const selectedDistrictName =
            cityData
                .find((city) => city.Id === selectedCity)
                ?.Districts.find((district) => district.Id === selectedDistrict)
                ?.Name || "";
        const selectedWardName =
            cityData
                .find((city) => city.Id === selectedCity)
                ?.Districts.find((district) => district.Id === selectedDistrict)
                ?.Wards.find((ward) => ward.Id === selectedWard)?.Name || "";
        const address = `${selectedWardName}, ${selectedDistrictName}, ${selectedCityName}`;
        setInputs((prevInputs) => ({ ...prevInputs, delivery_address: address }));
    }, [selectedCity, selectedDistrict, selectedWard]);

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        setSelectedDistrict("");
        setSelectedWard("");
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
        setSelectedWard("");
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
        "Tỉnh Cà Mau": 347,
    };

    let distance_Kilomet = 0;
    const selectedCityName = cityData.find(
        (city) => city.Id === selectedCity
    )?.Name;
    if (selectedCityName && selectedCityName in shippingDistancesFromHCM) {
        distance_Kilomet = shippingDistancesFromHCM[selectedCityName];
    }
    const shippingFee = distance_Kilomet * 100; // mỗi km tạm tính 100 (VND)



    // test momo
    const handleSubmit1 = async (event) => {
        event.preventDefault();
        try {
            const total_momo = total - totalSale + shippingFee;
            const savedInputs = {
                ...inputs,
                // selectedCity,
                // selectedDistrict,
                // selectedWard,
            };
            localStorage.setItem("checkoutInputs", JSON.stringify(savedInputs));

            const response = await OrderServie.momo_pay({ total_momo });
            window.location.href = response.payUrl;
        } catch (error) {
            console.error("Error:", error);
        }
    };


    // test mã giảm giá

    const handleUseDiscount = (discountCode) => {
        // lưu đoạn code
        localStorage.setItem("selectedDiscountCode", discountCode.code);
        // lưu thông code được chọn
        setSelectCode(discountCode)
        handleClose()
    };

    const selectedDiscountCode = localStorage.getItem("selectedDiscountCode");

    const handleOnclickUseCode = async () => {
        const macode = new FormData();

        // nếu mà lấy từ local ko có thì lấy ô input do người dùng nhập
        if (selectedDiscountCode === null) {
            macode.append("code", code);
        } else {
            macode.append("code", selectedDiscountCode);
        }
        const result = await DiscountcodeService.check(macode);
        if (result.message === 'success') {
            toast.success("Áp dụng mã giám giá thành công")
            // vì lúc này đã chỉnh type là 1 hoặc 2 thành đoạn text để show nên 
            if (selectCode.type === '1') {
                const percentage = parseInt(selectCode.percentage) // %
                const resultSale = (percentage / 100) * total
                setTotalSale(resultSale)
            } else {
                const resultSale = parseInt(selectCode.percentage) //  thành tiền 
                setTotalSale(resultSale)
            }

        } else {
            toast.error("Áp dụng mã giám giá thất bại")
        }

        // nếu mà trả về thành công mới set số tiền giảm giá ;
        // ko thì báo mã không hợp lệ

        localStorage.removeItem("selectedDiscountCode"); // Xóa selectedDiscountCode sau khi đã sử dụng
        setCode("")
    };
    // test mã giảm giá

    // đặc vào giỏ hàng
    const handleSubmit = (event) => {
        event.preventDefault();
        (async () => {
            try {

                // tạo form đẩy lên store ; có total tiền đơn hàng
                const dataOrder = {
                    ...inputs,
                    total: total - totalSale + shippingFee
                }
                console.log("🚀 ~ dataOrder: siuuuuuuuuuuuuuu:", dataOrder)

                // đẩy lên order
                // const res = await OrderServie.store(inputs);
                const res = await OrderServie.store(dataOrder);
                // đẩy lên order detail
                // tạo form đúng với backend
                const form_orderDetail = {
                    order_id: res.order.id,
                    products: convert_arr_form_ordedetail,
                };
                const Call_Order_detail = await OrderDetailService.store(
                    form_orderDetail
                );

                // Cập nhật số lượng trong productStore duy nhất ở đây test
                await Promise.all(convert_arr_form_ordedetail.map(async (item) => {
                    const resultupdateProductStore = await ProductServie.updateProductStore(item.product_id, item.qty);
                    console.log("🚀 ~ awaitPromise.all ~ resultupdateProductStore:", resultupdateProductStore)
                }));
                // Cập nhật số lượng trong productStore duy nhất ở đây test


                // gửi email khi đặc hàng thành công

                // tổng tiền
                const amount = new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(total - totalSale + shippingFee);

                emailjs
                    .send(
                        "service_gjtj4yf",
                        "template_4hu27vp",
                        {
                            user_email: user.email,
                            // user_email: "bngoc7498@gmail.com",
                            user_name: user.name,
                            address: inputs.delivery_address,
                            result: amount,
                        },
                        {
                            publicKey: "IMiWlEiyoza8USljv",
                        }
                    )
                    .then(
                        () => {
                            console.log("gửi email thành công!");
                        },
                        (error) => {
                            console.log("gửi email...", error.text);
                        }
                    );

                // end gửi email khi đặc hàng thành công

                toast.success("Đặt Hàng Thành công");

                // reset

                localStorage.removeItem("cart");
                localStorage.removeItem("checkoutInputs");

                dispatch(reset());
            } catch (error) {
                console.log("🚀 ~ ngu checkout out sai:", error);
                toast.error("Đặt Hàng Thất Bại");
            }
        })();
        console.log(inputs);
    };


    const [checkoutType, setCheckoutType] = useState(1);

    const showbankinfo = (value) => {
        setCheckoutType(Number(value));
    };

    const handleSubmitAfterMomo = async (updatedInputs) => {  // THAY ĐỔI 3: Hàm xử lý đơn hàng sau khi thanh toán Momo
        console.log("🚀 ~ handleSubmitAfterMomo ~ updatedInputs:", updatedInputs)
        try {
            const dataOrder = {
                ...updatedInputs,
                total: total - totalSale + shippingFee,
            };

            const res = await OrderServie.store(dataOrder);

            const form_orderDetail = {
                order_id: res.order.id,
                products: convert_arr_form_ordedetail,
            };
            const Call_Order_detail = await OrderDetailService.store(form_orderDetail);

            await Promise.all(
                convert_arr_form_ordedetail.map(async (item) => {
                    const resultupdateProductStore = await ProductServie.updateProductStore(item.product_id, item.qty);
                    console.log("🚀 ~ resultupdateProductStore after Momo:", resultupdateProductStore);
                })
            );

            const amount = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(total - totalSale + shippingFee);

            await emailjs.send(
                "service_gjtj4yf",
                "template_4hu27vp",
                {
                    user_email: user.email,
                    user_name: user.name,
                    address: updatedInputs.delivery_address,
                    result: amount,
                },
                {
                    publicKey: "IMiWlEiyoza8USljv",
                }
            );

            toast.success("Đặt Hàng Thành công");
            localStorage.removeItem("cart");
            localStorage.removeItem("checkoutInputs");
            dispatch(reset());
            navi("/")
        } catch (error) {
            console.log("🚀 ~ Error after Momo:", error);
            toast.error("Đặt Hàng Thất Bại");
        }
    };

    document.title = "Thanh toán";

    return (
        <div>
            <section className="bg-light">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb py-2 my-0">
                            <li className="breadcrumb-item">
                                <a className="text-main" href="index.html">
                                    Trang chủ
                                </a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Thanh toán
                            </li>
                        </ol>
                    </nav>
                </div>
            </section>
            <section className="hdl-maincontent py-2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <h2 className="fs-5 text-main">Thông tin giao hàng</h2>
                            <p>
                                Bạn có tài khoản chưa? <a href="login.html">Đăng nhập</a>
                            </p>
                            <div className="card">
                                <div className="card-header text-main">Địa chỉ nhận hàng</div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="address">Địa chỉ</label>
                                        <input
                                            type="text"
                                            name="delivery_address"
                                            value={inputs.delivery_address || ""}
                                            onChange={handleChange}
                                            id="address"
                                            className="form-control"
                                            placeholder="Nhập địa chỉ"
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <select
                                                value={selectedCity}
                                                onChange={handleCityChange}
                                                className="form-select form-select-sm mb-3"
                                                aria-label=".form-select-sm"
                                            >
                                                <option value="" selected>
                                                    Chọn tỉnh thành
                                                </option>
                                                {cityData.map((city) => (
                                                    <option key={city.Id} value={city.Id}>
                                                        {city.Name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <select
                                                value={selectedDistrict}
                                                onChange={handleDistrictChange}
                                                className="form-select form-select-sm mb-3"
                                                aria-label=".form-select-sm"
                                            >
                                                <option value="" selected>
                                                    Chọn quận huyện
                                                </option>
                                                {selectedCity &&
                                                    cityData
                                                        .find((city) => city.Id === selectedCity)
                                                        ?.Districts.map((district) => (
                                                            <option key={district.Id} value={district.Id}>
                                                                {district.Name}
                                                            </option>
                                                        ))}
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <select
                                                value={selectedWard}
                                                onChange={(event) =>
                                                    setSelectedWard(event.target.value)
                                                }
                                                className="form-select form-select-sm"
                                                aria-label=".form-select-sm"
                                            >
                                                <option value="" selected>
                                                    Chọn phường xã
                                                </option>
                                                {selectedDistrict &&
                                                    cityData
                                                        .find((city) => city.Id === selectedCity)
                                                        ?.Districts.find(
                                                            (district) => district.Id === selectedDistrict
                                                        )
                                                        ?.Wards.map((ward) => (
                                                            <option key={ward.Id} value={ward.Id}>
                                                                {ward.Name}
                                                            </option>
                                                        ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h4 className="fs-6 text-main mt-4">Phương thức thanh toán</h4>
                            <div className="thanhtoan mb-4">
                                <div className="p-4 border">
                                    <input
                                        name="typecheckout"
                                        onChange={(e) => showbankinfo(e.target.value)}
                                        type="radio"
                                        value={1}
                                        id="check1"
                                        defaultChecked={checkoutType === 1}
                                    />
                                    <label htmlFor="check1">Thanh toán khi giao hàng</label>
                                    {checkoutType === 1 && (
                                        <div className="mt-2">
                                            <button style={{ backgroundColor: "red", color: "white" }} className="btn btn-main px-4" onClick={handleSubmit} type="button">
                                                Xác nhận Thanh toán khi giao hàng
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 border">
                                    <input
                                        name="typecheckout"
                                        onChange={(e) => showbankinfo(e.target.value)}
                                        type="radio"
                                        value={2}
                                        id="check2"
                                        defaultChecked={checkoutType === 2}
                                    />
                                    <label htmlFor="check2">Chuyển khoản qua ngân hàng</label>
                                    {checkoutType === 2 && (

                                        <div className="mt-2">
                                            <button style={{ backgroundColor: "red", color: "white" }} className="btn btn-main px-4" onClick={handleSubmit1} type="button">
                                                Thanh toán Momo
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-7">
                            <h2 className="fs-5 text-main">Thông tin đơn hàng</h2>
                            <table className="table table-borderless">
                                <thead>
                                    <tr className="bg-dark">
                                        <th style={{ width: 30 }} className="text-center">
                                            STT
                                        </th>
                                        <th style={{ width: 100 }}>Hình</th>
                                        <th>Tên sản phẩm</th>
                                        <th style={{ width: 130 }} className="text-center">
                                            Số lượng
                                        </th>
                                        <th className="text-center">Giá</th>
                                        <th className="text-center">Giá giảm</th>
                                        <th className="text-center">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItem &&
                                        cartItem.length > 0 &&
                                        cartItem.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="text-center align-middle">{index}</td>
                                                    <td>
                                                        <img
                                                            style={{ height: 80, width: 100 }}
                                                            classname="img-fluid "
                                                            src={urlImage + "product/" + item.image}
                                                            alt=""
                                                        />
                                                    </td>
                                                    <td className="align-middle">{item.name}</td>
                                                    {/* <input type="text" value={item.count} id="qty" className="form-control text-center" /> */}
                                                    <td class="text-center align-middle">{item.count}</td>

                                                    <td className="text-center align-middle">
                                                        {new Intl.NumberFormat("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }).format(item.price)}
                                                    </td>

                                                    <td className="text-center align-middle">
                                                        {new Intl.NumberFormat("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }).format(
                                                            item.pricesale ? item.pricesale : parseInt(0)
                                                        )}
                                                    </td>
                                                    <td className="text-center align-middle">
                                                        {new Intl.NumberFormat("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }).format(
                                                            item.pricesale
                                                                ? (item.price - item.pricesale) * item.count
                                                                : item.price * item.count
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={7} className="text-end">
                                            <strong>
                                                Tổng:
                                                {new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(total)}
                                            </strong>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div>
                                <div className="input-group mb-3">
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Mã giảm giá"
                                            onChange={(e) => setCode(e.target.value)}
                                            value={selectedDiscountCode}
                                            aria-describedby="basic-addon2"
                                        />
                                        <button
                                            // variant="primary"
                                            className="bg-main"
                                            id="basic-addon2"
                                            onClick={handleOnclickUseCode}
                                        >
                                            Sử dụng
                                        </button>
                                        <Button variant="success" onClick={(handleShow)}>
                                            Chọn Mã giảm giá
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <th>Tạm tính</th>
                                        <td className="text-end">
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(total)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Phí vận chuyển</th>
                                        <td className="text-end">
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(shippingFee)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Giảm giá</th>
                                        <td className="text-end">
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(totalSale)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Tổng cộng</th>
                                        <td className="text-end" style={{ color: "red" }}>
                                            <span>
                                                {new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(total - totalSale + shippingFee)}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            {/* show modal mã giảm giá */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th style={{ width: "140px" }}>Mã</th>
                                <th style={{ width: "180px" }}>Phần trăm/Gía giảm</th>
                                <th style={{ width: "140px" }}>Chi tiết</th>
                                <th style={{ width: "140px" }}>Kiểu </th>
                                <th style={{ width: "140px" }}>Ngày kết thúc</th>
                                <th style={{ width: "140px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {discountCodes.length > 0 && discountCodes.map((discountCode, index) => (
                                <tr key={index}>
                                    <td>{discountCode.code}</td>
                                    <td>{discountCode.percentage}</td>
                                    <td>{discountCode.description}</td>
                                    <td>{
                                        discountCode.type
                                    }</td>
                                    <td>{discountCode.expires_kt}</td>
                                    <td>
                                        <Button

                                            variant="success"
                                            onClick={() => handleUseDiscount(discountCode)}
                                        >
                                            Sử dụng
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* show modal mã giảm giá */}
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
        </div>
    );
}
