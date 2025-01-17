"use client";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";
import CustomImage from "@/components/shared/custom-image";
import { MdDelete } from "react-icons/md";
import { FiMinus, FiPlus } from "react-icons/fi";
import { addSpaceToNumber } from "@/lib/utils";
import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  changeChecked,
  checkAll,
} from "@/redux/slices/cartSlice";
import Link from "next/link";
import Counter from "@/components/shared/counter.tsx";
import Empty from "@/components/shared/empty";

const Page = () => {
  const [checkedAll, setCheckedAll] = useState<boolean>(true);
  const [filteredDataCount, setFilteredDataCount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const dispatch = useDispatch();
  const { cart } = useSelector((store: RootState) => store.cart);

  const handleClick = (type: string, id: number | null) => {
    switch (type) {
      case "increment":
        dispatch(incrementQuantity({ id }));
        break;
      case "decrement":
        dispatch(decrementQuantity({ id }));
        break;
      case "delete":
        dispatch(removeFromCart({ id }));
        break;
      case "checked":
        dispatch(changeChecked({ id }));
        break;
    }
  };

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      const filteredData = cart.filter((item) => item.checked === true);
      setFilteredDataCount(filteredData.length);

      if (filteredData.length === cart.length) {
        setCheckedAll(true);
      } else {
        setCheckedAll(false);
      }
      filteredData.forEach((item) => {
        total += item.price * item.quantity;
      });
      setTotal(total);
    };
    calculateTotal();
  }, [cart]);

  return (
    <div className="container py-10">
      {cart.length > 0 ? (
        <>
          <div>
            <h1 className=" text-2xl font-semibold">
            Giỏ hàng của bạn,{" "}
              <span className=" text-gray-400">{cart.length} sản phẩm</span>
            </h1>
          </div>
          <div className=" grid grid-cols-12 py-5 gap-2">
            <div className="col-span-9">
              <div className=" p-4 pb-0 border border-gray-300">
                <div className="flex items-center justify-between border-b pb-4 pt-1 border-b-gray-200">
                  <div className=" flex items-center gap-3">
                    <Checkbox
                      checked={checkedAll}
                      onCheckedChange={() => dispatch(checkAll(!checkedAll))}
                      className="data-[state=checked]:bg-[#7000FF] rounded-none data-[state=checked]:text-primary-foreground border-black"
                    />
                    <span className=" text-sm">
                    Mọi thứ {checkedAll ? "yechish" : "tanlash"}{" "}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className=" text-sm text-gray-500">
                    Ngày giao hàng mới nhất:
                    </span>
                    <div className="border border-[#7000FF] text-[#7000FF] p-1 text-[12px]">
                    M05 2(Ngày mai)
                    </div>
                  </div>
                </div>
                <div className=" py-5">
                  {cart.map((item, indx) => (
                    <div
                      key={indx}
                      className=" flex items-start border-b border-b-gray-200 py-5 last:border-b-0 gap-5"
                    >
                      {/* Checkbox and Image */}
                      <div className=" flex items-center gap-5">
                        <Checkbox
                          checked={item.checked}
                          onCheckedChange={() =>
                            handleClick("checked", item.id)
                          }
                          className="data-[state=checked]:bg-[#7000FF] rounded-none data-[state=checked]:text-primary-foreground border-black"
                        />
                        <div className=" relative w-24 h-24">
                          <CustomImage
                            image={item.thumbnail}
                            objectFit="cover"
                          />
                        </div>
                      </div>
                      {/* Checkbox and Image End*/}

                      <div className=" flex flex-col items-start justify-start h-full w-full">
                        {/* Title and Delete Btn */}
                        <div className=" flex justify-between w-full items-start">
                          <span className=" cursor-pointer">{item.title}</span>
                          <span
                            onClick={() => handleClick("delete", item.id)}
                            className=" text-gray-500 flex items-center cursor-pointer hover:text-black transition duration-200"
                          >
                            <MdDelete className=" text-2xl" />
                            Hủy
                          </span>
                        </div>
                        {/* Title and Delete Btn End*/}

                        <div className=" flex items-center justify-between w-full mt-2">
                          <span className=" text-sm text-gray-500">
                          Thương hiệu:{" "}
                            <span className=" text-black text-base">
                              {item.brand}
                            </span>
                          </span>

                          {/* Counter Btn */}
                          <Counter item={item} handleClick={handleClick} />
                          {/* Counter Btn End*/}
                          <span>
                            {addSpaceToNumber(
                              Math.floor((item.price * 12340) / 2) *
                                item.quantity
                            )}
                            VNĐ
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className=" p-4 border border-gray-200 rounded-md">
                <h1 className=" text-md font-medium">Đơn hàng của bạn</h1>
                <div className=" flex items-center justify-between py-4 text-sm">
                  <span className=" text-sm">
                  Các sản phẩm ({filteredDataCount}):
                  </span>
                  <span>
                    {addSpaceToNumber(Math.floor((total * 12340) / 2))} VNĐ
                  </span>
                </div>
                <div className="border border-[#7000FF] text-[#7000FF] px-2 text-center text-[12px] font-medium w-full">
                Giao hàng M05 2 (Ngày mai)
                </div>
                <div className=" flex items-start py-5 justify-between">
                  <span className=" text-sm">Tổng:</span>
                  <div className=" flex flex-col items-end">
                    <h3 className=" text-xl font-semibold">
                      {addSpaceToNumber(
                        Math.floor((total * 12340) / 2) -
                          Math.floor(((total * 12340) / 2) * 0.1)
                      )}
                      VNĐ
                    </h3>
                    <span className=" text-sm text-[#009C38] font-medium">
                      Tiết kiệm:{" "}
                      {addSpaceToNumber(
                        Math.floor(((total * 12340) / 2) * 0.1)
                      )}
                      VNĐ
                    </span>
                  </div>
                </div>
                <button className=" px-5 py-3 bg-[#7000FF] w-full rounded-lg text-white">
               Mua hàng
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Empty
          title="Savatda hozircha mahsulot yoʻq"
          subTitle="Bosh sahifadagi to’plamlardan boshlang yoki kerakli mahsulotni qidiruv orqali toping"
          image="/images/emptycart.png"
        />
      )}
    </div>
  );
};
1;

export default Page;
