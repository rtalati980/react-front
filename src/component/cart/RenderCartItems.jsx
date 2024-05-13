// Cart/RenderCartItems.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../Slices/CartSlice";

export default function RenderCartItems() {
	const { cart } = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	return (
		<div>
			{cart.map((dataObj, index) => (
				<div
					key={index}
					className={`flex w-full flex-wrap i
								tems-start justify-between gap-6 
						${
							index !== cart.length - 1 &&
							"border-b border-b-richblack-400 pb-6"
						} 
						${index !== 0 && "mt-6"} `}
				>
					<div>
						<div>{dataObj.title}</div>
						<img
							src={dataObj.image}
							width={200}
							height={150}
							alt=""
						/>
						<p>{dataObj.description}</p>
					</div>

					<div>
						<button
							onClick={() =>
								dispatch(removeFromCart(dataObj._id))
							}
						>
							<RiDeleteBin6Line size={20} />
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
