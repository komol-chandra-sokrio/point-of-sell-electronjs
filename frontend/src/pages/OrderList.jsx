import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';

const OrderList = () => {
	//list
	const [notfound, setnotfound] = useState(false);
	const [search, setSearch] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [searchtext, setsearchText] = useState('');
	const [list, setList] = useState([]);
	const [count, setCount] = useState(0);
	//
	const [edit, setEdit] = useState(false);
	const [deleted, setDeleted] = useState(false);
	const [deletedData, setDeletedData] = useState(null);
	const [editData, setEditData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const fetchDataList = async () => {
		try {
			setnotfound(false);
			setSearch(false);
			// setLoading(true);
			const res = await axios.get(`http://localhost:5000/orders?page=${count}`, {
				headers: {
					token: JSON.parse(localStorage.getItem('token'))
				}
			});
			setList(res.data.list);
			setTotalPages(res.data.total);
			// setLoading(false);

			if (res.data.data.length === 0) {
				setnotfound(true);
			} else {
				setList(res.data.data);
				setsearchText('');
				setnotfound(false);
			}
		} catch (error) {
			setLoading(false);
			setError('Failed to fetch data list');
		}
	};

	const fetchDataListBySearch = async () => {
		setnotfound(false);
		setSearch(false);
		try {
			const res = await axios.get(`http://localhost:5000/orders?name=${searchtext}&page=${count}`, {
				headers: {
					token: JSON.parse(localStorage.getItem('token'))
				}
			});
			if (res.data.list.length === 0) {
				setnotfound(true);
			} else {
				setList(res.data.list);
				setsearchText('');
				setnotfound(false);
				setSearch(true);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchDataList(count);
	}, [count, edit, deleted]);

	// edit food handler
	const editHandler = (obj) => {
		setEdit(true);
		setEditData(obj);
	};
	const handleDelete = (food) => {
		setDeletedData(food);
		setDeleted(true);
	};
	const DeleteFood = async () => {
		setLoading(true);
		try {
			const res = await axios.delete(`http://localhost:5000/products/${deletedData._id}`);

			if (res) {
				setLoading(false);
				setEdit(false);
				setDeleted(false);
			}
		} catch (err) {
			setLoading(false);
			setError('Failed to delete product');
		}
	};
	if (loading) {
		return 'Loading...';
	}
	return (
		<section className='container mx-auto px-4 sm:px-8 max-w-100'>
			<div className='py-8'>
				<div className='flex flex-row mb-1 sm:mb-0 justify-between w-full'>
					<h2 className='text-xl font-bold'>Order Report</h2>
					<div className='text-end'>
						<div className='flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center'>
							<div className=' relative '>
								<input
									onChange={(e) => setsearchText(e.target.value)}
									type='text'
									className='flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
									placeholder='invoice id'
									value={searchtext}
								/>
							</div>
							{search ? (
								<button
									onClick={() => fetchDataList()}
									className='flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-600 shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200'>
									Reset
								</button>
							) : (
								<button
									onClick={() => fetchDataListBySearch()}
									className='flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-600 shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200'>
									Filter
								</button>
							)}
						</div>
					</div>
				</div>
				<div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
					<div className='inline-block min-w-full shadow overflow-hidden'>
						<table className='min-w-full leading-normal'>
							<thead>
								<tr>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										invoiceId
									</th>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										date
									</th>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										grandTotal $
									</th>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										Items $
									</th>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'>
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{list.map((data, index) => (
									<tr key={data._id}>
										<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
											<div className='flex items-center'>
												<p className='text-gray-900 whitespace-no-wrap'>{data.invoiceId}</p>
											</div>
										</td>
										<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
											<p className='text-gray-900 whitespace-no-wrap'>
												{new Date(data.date).toLocaleString()}
											</p>
										</td>
										<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
											<p className='text-gray-900 whitespace-no-wrap'>{data.grandTotal}</p>
										</td>
										<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
											<p className='text-gray-900 whitespace-no-wrap'>{data.products.length}</p>
										</td>

										<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
											<button
												onClick={() => editHandler(data)}
												className='text-green-600 hover:text-green-900 mx-2'>
												View Order
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className='px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between'>
							<div className='flex items-center'>
								{Array.from({ length: totalPages }, (_, index) => index + 1).map((pg, index) => (
									<button
										onClick={() => setCount(pg - 1)}
										type='button'
										className='w-full px-4 py-2 border-t border-b text-base text-green-500 bg-white hover:bg-gray-100'>
										{pg}
									</button>
								))}
							</div>
						</div>

						{edit && (
							<div className={`my-10 top-16 w-3/6 left-90 bg-white shadow-lg py-10 px-20 absolute`}>
								<div className='text-right'>
									<button className='ml-auto' onClick={() => setEdit(false)}>
										<IoMdClose className='text-right text-xl' />
									</button>
								</div>

								{/* Customer TABLE */}

								<div className='relative my-4'>
									<table className='min-w-full leading-normal'>
										<tbody>
											<tr>
												<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
													<h6>Customer Info</h6>
													<p className='text-gray-900 whitespace-no-wrap'>
														Name: <span>{editData.customerInfo.full_name}</span>
													</p>
													<p className='text-gray-900 whitespace-no-wrap'>
														Phone: <span>{editData.customerInfo.phone}</span>
													</p>
													<p className='text-gray-900 whitespace-no-wrap'>
														Address:<span>{editData.customerInfo.address}</span>
													</p>
												</td>
												<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
													<h6>Order Info</h6>
													<p className='text-gray-900 whitespace-no-wrap'>
														Invoice Id: <span>{editData.invoiceId}</span>
													</p>
													<p className='text-gray-900 whitespace-no-wrap'>
														Product Items: <span>{editData.products.length}</span>
													</p>
													<p className='text-gray-900 whitespace-no-wrap'>
														Date:<span>{new Date(editData.date).toLocaleString()}</span>
													</p>
												</td>
											</tr>
										</tbody>
									</table>
								</div>

								{/* PRODUCTS TABLE */}
								<div className='relative my-4'>
									<label for='name' className='block text-md py-3 font-medium text-gray-700'>
										Products :
									</label>

									<table className='min-w-full leading-normal'>
										<thead>
											<tr>
												<th
													scope='col'
													className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
													Name
												</th>

												<th
													scope='col'
													className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
													Price $
												</th>
												<th
													scope='col'
													className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
													Quantity
												</th>
												<th
													scope='col'
													className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
													Sub Total $
												</th>
											</tr>
										</thead>
										<tbody>
											{editData.products.length > 0 &&
												editData.products.map((data, index) => (
													<tr key={data._id}>
														<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
															<p className='text-gray-900 whitespace-no-wrap'>{data.name}</p>
														</td>
														<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
															<p className='text-gray-900 whitespace-no-wrap'>{data.price}</p>
														</td>
														<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
															<p className='text-gray-900 whitespace-no-wrap'>{data.quantity}</p>
														</td>
														<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
															<p className='text-gray-900 whitespace-no-wrap text-end'>
																{data.quantity * data.price}
															</p>
														</td>
													</tr>
												))}
										</tbody>
									</table>
								</div>
								{/* Order TABLE */}

								<div className='relative my-4'>
									<table className='min-w-full leading-normal'>
										<tbody>
											<tr>
												<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
													<p className='text-gray-900 whitespace-no-wrap'>{editData.note}</p>
												</td>
												<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
													<p className='text-gray-900 whitespace-no-wrap text-end'>
														Grand Total:<span>{editData.grandTotal}</span>
													</p>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						)}
					</div>
				</div>
				{/*  */}
				<div
					className={`${
						!deleted && 'hidden'
					} absolute top-56 left-26 shadow-lg p-4 bg-white w-1/2 m-auto`}>
					<p className='text-center text-lg font-medium py-6'>Are you sure? To remove this</p>
					<div className='flex items-center justify-center'>
						<button
							className='text-white py-2 px-6 rounded-sm mr-10 bg-orange-600'
							onClick={() => DeleteFood()}>
							Yes
						</button>
						<button
							className='text-white py-2 px-6 rounded-sm bg-orange-600'
							onClick={() => setDeleted(false)}>
							No
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default OrderList;
