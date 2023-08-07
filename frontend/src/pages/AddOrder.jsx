import axios from 'axios';
import React, { useState, useEffect } from 'react';

const AddOrder = () => {
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState('');
	const [userDetails, setUserDetails] = useState(null);
	const [userInfo, setUserInfo] = useState(null);

	const [cartItems, setCartItems] = useState([]);
	const [list, setList] = useState([]);

	// const [products, setProducts] = useState([]);

	const [note, setNote] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmitOrder = async () => {
		// Prepare the data for the POST request
		const orderData = {
			customerId: selectedUser,
			customerInfo: userInfo,
			note,
			products: cartItems, // Assuming you have a state variable named "cartItems" that contains the selected products
			grandTotal: calculateGrandTotal()
		};

		// console.log(orderData);
		try {
			setLoading(true);
			const res = await axios({
				method: 'post',
				url: `http://localhost:5000/orders/create`,
				data: orderData,
				headers: {
					token: JSON.parse(localStorage.getItem('token'))
				}
			});

			if (res) {
				console.log(res);
				setSelectedUser('');
				setUserDetails('');
				setUserInfo('');
				setCartItems([]);
				setNote('');
				setLoading(false);
			}
			// Clear the cart and any other required state variables after successful order submission
		} catch (error) {
			console.log(error);
			console.error('Error submitting order:', error);
			setLoading(false);
		}
	};

	const fetchProducts = async () => {
		try {
			const res = await axios.get(`http://localhost:5000/product-list`, {
				headers: {
					token: JSON.parse(localStorage.getItem('token'))
				}
			});
			setList(res.data.products);
			console.log(res.data.products);
		} catch (error) {}
	};

	const fetchUsers = async () => {
		try {
			const res = await axios.get(`http://localhost:5000/customer-list`, {
				headers: {
					token: JSON.parse(localStorage.getItem('token'))
				}
			});
			setUsers(res.data.customers);
		} catch (error) {
			//
		}
	};

	useEffect(() => {
		fetchUsers();
		fetchProducts();
	}, []);

	// Basic Functions Start

	const handleAddToCart = (product) => {
		if (!cartItems.find((item) => item.id === product.id)) {
			setCartItems([...cartItems, { ...product, quantity: 1 }]);
		}
	};

	const handleQtyChange = (index, newQuantity) => {
		const updatedCartItems = [...cartItems];
		updatedCartItems[index].quantity = parseInt(newQuantity, 10);
		setCartItems(updatedCartItems);
	};

	const calculateSubtotal = (quantity, price) => {
		return quantity * price;
	};

	const calculateGrandTotal = () => {
		const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
		return total;
	};

	const handleRemoveItem = (index) => {
		const updatedCartItems = [...cartItems];
		updatedCartItems.splice(index, 1);
		setCartItems(updatedCartItems);
	};

	// Basic Functions End

	useEffect(() => {
		if (selectedUser) {
			const user = users.find((user) => user._id === selectedUser);
			setUserDetails(user._id);
			setUserInfo(user);
		} else {
			setUserDetails(null);
			setUserInfo(null);
		}
	}, [selectedUser, users]);

	return (
		<div className='container mx-auto py-8'>
			<div className='flex justify-between mb-4'>
				<div className='w-2/5'>
					{/* Product List */}
					<div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
						<table className='w-full table-auto mb-4'>
							<thead>
								<tr>
									<th className='px-4 py-2'>Product Name</th>
									<th className='px-4 py-2'>Sell Price</th>
									<th className='px-4 py-2'>Action</th>
								</tr>
							</thead>
							<tbody>
								{list.length > 0 &&
									list.map((product) => (
										<tr key={product.id}>
											<td className='border px-4 py-2'>{product.name}</td>
											<td className='border px-4 py-2'>${product.price}</td>

											<td className='border px-4 py-2'>
												<button
													className={`bg-blue-500 text-white py-2 px-4 rounded ${
														cartItems.find((item) => item.id === product.id)
															? 'opacity-50 pointer-events-none'
															: ''
													}`}
													disabled={cartItems.find((item) => item.id === product.id)}
													onClick={() => handleAddToCart(product)}>
													Add
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Cart */}

				<div className='w-3/5 bg-gray-100 p-4 rounded shadow'>
					<h3 className='text-lg font-semibold mb-2'>Cart Added Products</h3>
					<table className='w-full table-auto mb-4'>
						<thead>
							<tr>
								<th className='px-4 py-2'>Product Name</th>
								<th className='px-4 py-2'>Sell Price</th>
								<th className='px-4 py-2'>Quantity</th>
								<th className='px-4 py-2'>Subtotal</th>
								<th className='px-4 py-2'>Remove</th>
							</tr>
						</thead>
						<tbody>
							{cartItems.length > 0 &&
								cartItems.map((item, index) => (
									<tr key={index}>
										<td className='border px-4 py-2'>{item.name}</td>
										<td className='border px-4 py-2'>${item.price}</td>
										<td className='border px-4 py-2'>
											<input
												className='w-16'
												type='number'
												value={item.quantity}
												onChange={(e) => handleQtyChange(index, e.target.value)}
											/>
										</td>
										<td className='border px-4 py-2'>
											${calculateSubtotal(item.quantity, item.price)}
										</td>
										<td className='border px-4 py-2'>
											<button
												className='px-2 py-1 bg-red-500 text-white rounded'
												onClick={() => handleRemoveItem(index)}>
												Remove
											</button>
										</td>
									</tr>
								))}
						</tbody>
					</table>

					<div className='relative px-2'>
						<label htmlFor='note' className='block text-md py-3 font-medium text-gray-700'>
							Note:
						</label>
						<input
							type='text'
							value={note}
							onChange={(e) => setNote(e.target.value)}
							className='flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
							placeholder='Note'
						/>
					</div>
					<div className='relative px-2'>
						<label htmlFor='customerId' className='block text-md py-3 font-medium text-gray-700'>
							Select Customer:
						</label>
						<select
							onChange={(e) => setSelectedUser(e.target.value)}
							value={selectedUser}
							className='flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
							name='customerId'>
							<option value='' disabled>
								Select a user
							</option>
							{users.map((user) => (
								<option key={user._id} value={user._id}>
									{user.full_name}
								</option>
							))}
						</select>
					</div>
					<div className='px-4 py-4 '>
						{userInfo && (
							<div>
								<div className='flex justify-between'>
									<span className='font-semibold'>User Name:</span>
									<span>{userInfo.full_name}</span>
								</div>

								<div className='flex justify-between'>
									<span className='font-semibold'>Address:</span>
									<span>{userInfo.address}</span>
								</div>
								<div className='flex justify-between'>
									<span className='font-semibold'>Phone:</span>
									<span>{userInfo.phone}</span>
								</div>
								<div className='flex justify-between'>
									<span className='font-semibold'>Email:</span>
									<span>{userInfo.email}</span>
								</div>
							</div>
						)}
						<div className='flex justify-between'>
							<span className='font-semibold'>Grand Total:</span>
							<span>${calculateGrandTotal()}</span>
						</div>

						<button
							onClick={() => handleSubmitOrder()}
							className=' my-4 py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2'>
							{loading ? 'Loading...' : 'Submit Order'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddOrder;
