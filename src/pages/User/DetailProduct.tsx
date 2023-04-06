import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IProduct } from "../../type/product.type";
import {  handlegetProduct } from "../../api/productApi";
import { toast } from "react-toastify";
import { addtoCartUser } from "../../api/cart";

export default function DetailProduct() {
  const { id } = useParams();
  const idParams = id as string;
  const imageRef = useRef<HTMLImageElement>(null);
  const [watch, setWatch] = useState<Boolean>(false);
  const [getproduct, setProductList] = useState<IProduct>();
  const [buyCount, setBuyCount] = useState(1);
  useEffect(() => {
    try {
      handlegetProduct(idParams).then((result) => {
        if (!result.data) {
          return toast.error("Khong tim thay san pham");
        }

        setProductList((pre) => {
          return { ...pre, ...result.data };
        });
      });
    } catch (error: any) {
      toast(error);
    }
  }, []);

  // add to cart
  const addToCart =  (buyCount: number, idPro: number) => {
    addtoCartUser(buyCount, idPro).then((data) => {
      console.log(data);
      toast.success("Dat hang thanh cong");
    });
  };

  // hover zoom ảnh
  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const image = imageRef.current as HTMLImageElement;
    const { naturalHeight, naturalWidth } = image;

    const offsetX = e.pageX - (rect.x + window.scrollX);
    const offsetY = e.pageY - (rect.y + window.scrollX);

    const top = offsetY * (1 - naturalHeight / rect.height);
    const left = offsetX * (1 - naturalWidth / rect.width);

    image.style.width = naturalWidth + "px";
    image.style.height = naturalHeight + "px";
    image.style.maxWidth = "unset";
    image.style.top = top + "px";
    image.style.left = left + "px";

    // even bubble
  };

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute("style");
  };
  console.log("check ", getproduct);
  if (!getproduct) return null;
  return (
    <>
      {(getproduct as IProduct) && Object.keys(getproduct).length > 0 && (
        <div className="w-full m-auto">
          <div className=" py-1 flex shadow-md">
            <nav className=" w-3/4 m-auto text-[#707070]">
              <Link to="/" className="py-2 pr-3">
                Trang chu
              </Link>
              <Link to="/" className="py-2 pr-3">
                Dien thoai
              </Link>
              <Link to="/" className="py-2 pr-3">
                Sam sung
              </Link>
              <Link to="#" className="py-2 pr-3">
                {getproduct.name}
              </Link>
            </nav>
          </div>
          <div className="py-2.5 border-b-2 border-gray-100">
            <div className="text-lg w-3/4 m-auto">{getproduct.name}</div>
          </div>
          <div className="w-3/4 m-auto grid grid-cols-12 mt-9 gap-10">
            <div className="col-span-5">
              <div
                className="relative  w-full cursor-zoom-in overflow-hidden pt-[100%] shadow"
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  className="absolute top-0 left-0 h-full w-full bg-white object-cover"
                  src={getproduct.images[0].base_url}
                  ref={imageRef}
                />
              </div>
              <div className="mt-6 relative flex  items-center gap-5">
                <div className="w-16 h-16 border border-[#D70018] p-1.5 flex justify-center flex-col items-center">
                  <img className="w-5.5 " src="./Rectangle (8).png" alt="" />
                  <p className="text-center text-[10px]">Tinh nang noi bat</p>
                </div>
                <div className="relative flex-1 grid grid-cols-5 gap-2">
                  <button className="absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>

                  {getproduct.images.length > 0 &&
                    getproduct.images.map((image, index) => (
                      <div key={index} className="relative w-full pt-[100%]">
                        <img
                          className="pointer-events-none absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover"
                          src={image.base_url}
                          alt=""
                        />
                      </div>
                    ))}
                  <button
                    className="absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                    // onClick={next}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-7 flex flex-col pb-2 ">
              <div className=" flex mb-7 items-end">
                <p className="font-semibold text-3xl text-red-500">
                  <span>{getproduct.price}</span> đ
                </p>
                <p className="ml-6  text-[#707070] text-sm">
                  <span className="">{getproduct.original_price}</span>đ
                </p>
              </div>
              <div className="flex-1 text-[#444444] ">
                <p className="row-span-1">
                  Mô tả ngắn: Trước khi mua bất kỳ chiếc điện thoại nào, người
                  dùng cũng sẽ quan tâm đến thiết kế sản phẩm trước. Với phiên
                  bản A73, Samsung đã tạo nên một chiếc smartphone với vẻ ngoài
                  mang đến cảm giác sang trọng và tinh tế.
                </p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => {}}
                  type="button"
                  className="px-10 min-w-[200px] mr-10 py-3 font-semibold rounded bg-[#FF3945] text-white"
                >
                  Mua ngay
                </button>
                <div
                  className="flex gap-2 h-auto"
                  onClick={() => {
                    addToCart(buyCount, getproduct.id);
                  }}
                >
                  <div className="flex-1 cursor-pointer rounded-md flex justify-center items-center border border-[#FF3945]">
                    <i className="fa-solid py-1.5  px-2.5 text-lg block fa-cart-shopping text-[#eb0000]"></i>
                  </div>
                  <div className="w-20 cursor-pointer text-start capitalize text-sm">
                    Them vao gio hang
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* desc */}
          <div className="w-3/4 m-auto mt-10 overflow-hidden">
            <div className=" bg-[#F2F2F2] p-2">
              <h3 className="text-[#D70018] text-lg mb-2 text-center">
                ĐẶC ĐIỂM NỔI BẬT
              </h3>
              <div
                className={`${
                  !watch
                    ? "-webkit-box-orient-vertical  overflow-hidden max-h-[150vh] block p-5"
                    : "h-auto"
                }`}
              >
                <div className="-webkit-line-clamp-3">
                  <div
                    dangerouslySetInnerHTML={{ __html: getproduct.description }}
                  ></div>
                </div>
              </div>
            </div>
            {/* <div className="mt-3.5">
              <p>
                Năm 2022 hứa hẹn sẽ là một năm rất đáng trông đợi đối với những
                ai là fan của thương hiệu điện thoại Samsung. Mới đây, hãng sẽ
                tiếp tục cho ra mắt nhiều smartphone với sự cải tiến trong thiết
                kế và cấu hình, trong đó phải kể đến chiếc Samsung Galaxy A73
                với nhiều cải tiến so với thế hệ trước. Vậy sản phẩm có gì nổi
                bật, giá bao nhiêu và liệu có nên mua không? Tìm hiểu ngay nhé!
              </p>
            </div>
            <div>
              <h3 className="mt-7 mb-2 text-xl">
                Đánh giá Samsung A73 - Hiệu năng mượt mà, chụp ảnh chuyên nghiệp
              </h3>
              <p>
                Điện thoại cao cấp nhất dòng Galaxy A series sở hữu nhiều nâng
                cấp đáng giá so với thế hệ trước, từ ngoại hình cho đến hiệu
                năng, đặc biệt là hệ thống camera. Sau đây là những đánh giá chi
                tiết về chiếc
              </p>
            </div>
            <div>
              <h4 className="mt-7 mb-2 text-base">
                Thiết kế sang trọng, màn hình Super AMOLED
              </h4>
              <p>
                Trước khi mua bất kỳ chiếc điện thoại nào, người dùng cũng sẽ
                quan tâm đến thiết kế sản phẩm trước. Với phiên bản A73, Samsung
                đã tạo nên một chiếc smartphone với vẻ ngoài mang đến cảm giác
                sang trọng và tinh tế.
              </p>
            </div> */}
            <div className="text-center mt-4">
              <button
                type="button"
                className="px-8 text-center py-3 font-semibold border rounded border-gray-800"
                onClick={() => setWatch(!watch)}
              >
                {watch ? "Thu gon" : "Xem them"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
