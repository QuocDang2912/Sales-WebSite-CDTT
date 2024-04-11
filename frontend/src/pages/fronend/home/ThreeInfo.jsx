import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiSupport } from "react-icons/bi";

export default function ThreeItem() {
  return (
    <>
      <div
        className="info-boxes-slider mb-2  row product-list d-flex justify-content-between"
        style={{ marginTop: "10px" }}
      >
        <div className="info-box info-box-icon-left col-6 col-md-4 mb-3">
          <i class="icon-shipping">
            <LiaShippingFastSolid />
          </i>
          <div className="info-box-content">
            <h4>MIỄN PHÍ VẬN CHUYỂN</h4>
          </div>
        </div>

        <div className="info-box info-box-icon-left col-6 col-md-4 mb-3">
          <i class="icon-money">
            <MdOutlineAttachMoney />
          </i>
          <div className="info-box-content">
            <h4>TRẢ HÀNG HOÀN TIỀN</h4>
          </div>
        </div>

        <div className="info-box info-box-icon-left col-6 col-md-4 mb-3">
          <i className="icon-support">
            <BiSupport />
          </i>
          <div className="info-box-content">
            <h4>HỖ TRỢ TRỰC TUYẾN 24/7</h4>
          </div>
        </div>
      </div>
    </>
  );
}
