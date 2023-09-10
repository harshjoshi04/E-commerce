import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowProduct, chagepage } from "@/redux/product/ProductSlice";
import { Pagination } from "@nextui-org/react";

export default function Paggination() {
  const [Pages, setPages] = React.useState([]);
  const Product = useSelector(ShowProduct);
  const filter = useSelector((state) => state.productItem.filterProduct);
  const totalPage = useSelector((state) => state.productItem.totalPage);
  const dispatch = useDispatch();
  React.useEffect(() => {
    let arr = [];
    for (let index = 0; index < totalPage; index++) {
      arr.push(index);
    }
    setPages(arr);
  }, [Product, totalPage, filter]);

  return (
    <div className="flex items-center mt-7   gap-4 ">
      <Pagination
        color="#27272A"
        total={totalPage}
        page={1}
        onChange={(page) => {
          dispatch(chagepage(page));
        }}
      />
    </div>
  );
}
