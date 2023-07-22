import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';

const CustomerList = () => {
	const [list, setList] = useState([]);
	const [count, setCount] = useState(0);
	const [edit, setEdit] = useState(false);
	const [deleted, setDeleted] = useState(false);
	const [deletedData, setDeletedData] = useState(null);
	const [editDataItem, setEditFood] = useState(null);
	const [itemId, setDataId] = useState('');
	const [itemName, setDataName] = useState('');
	const [itemPhone, setDataPhone] = useState('');
	const [itemEmail, setDataEmail] = useState('');
	const [itemAddress, setDataAddress] = useState('');
	const [itemStatus, setDataStatus] = useState('');
	// const [foodPrice, setFoodPrice] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const fetchCustomer = async (count = 0) => {
		try {
			setLoading(true);
			const res = await axios.get(`http://localhost:5000/customers?page=${count}`, {
				headers: {
					token: JSON.parse(localStorage.getItem('token'))
				}
			});
			setList(res.data.list);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError('Failed to fetch food list');
		}
	};

	useEffect(() => {
		fetchCustomer(count);
	}, [count, edit, deleted]);

	// edit food handler
	const editHandler = (food) => {
		setEdit(true);
		setEditFood(food);
		setDataId(food.id);
		setDataName(food.full_name);
		setDataPhone(food.phone);
		setDataEmail(food.email);
		setDataAddress(food.address);
		setDataStatus(food.status);
	};

	const handleDelete = (food) => {
		setDeletedData(food);
		setDeleted(true);
	};

	const EditFood = async () => {
		setLoading(true);
		try {
			const res = await axios.put(`http://localhost:5000/customers/${editDataItem._id}`, {
				id: itemId,
				full_name: itemName,
				phone: itemPhone,
				email: itemEmail,
				address: itemAddress,
				status: itemStatus
			});

			if (res) {
				setLoading(false);
				setEdit(false);
			}
		} catch (err) {
			setLoading(false);
			setError('Failed to edit food');
		}
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
			setError('Failed to delete food');
		}
	};

	if (loading) {
		return 'Loading...';
	}
	return (
		<section className='container mx-auto px-4 sm:px-8 max-w-100'>
			<div className='py-8'>
				<div className='flex flex-row mb-1 sm:mb-0 justify-between w-full'>
					<h2 className='text-xl font-bold'>Customer List</h2>
					<div className='text-end'>
						<form className='flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center'>
							<div className=' relative '>
								<input
									type='text'
									className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
									placeholder='filter'
								/>
							</div>
							<button
								className='flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-600 shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200'
								type='submit'>
								Filter
							</button>
						</form>
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
										ID
									</th>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										Name
									</th>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										Phone
									</th>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										Email
									</th>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										Address
									</th>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										Status
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
									<tr key={data.id}>
										<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
											<div className='flex items-center'>
												<p className='text-gray-900 whitespace-no-wrap'>{data.id}</p>
											</div>
										</td>
										<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
											<p className='text-gray-900 whitespace-no-wrap'>{data.full_name}</p>
										</td>

										<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
											<p className='text-gray-900 whitespace-no-wrap'>{data.phone}</p>
										</td>
										<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
											<p className='text-gray-900 whitespace-no-wrap'>{data.email}</p>
										</td>
										<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
											<p className='text-gray-900 whitespace-no-wrap'>{data.address}</p>
										</td>
										<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
											<p className='text-gray-900 whitespace-no-wrap'>{data.status}</p>
										</td>
										<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
											<button
												onClick={() => editHandler(data)}
												className='text-green-600 hover:text-green-900 mx-2'>
												Edit
											</button>
											{/* <button
												onClick={() => handleDelete(data)}
												className='text-red-600 hover:text-red-700 ml-6'>
												Delete
											</button> */}
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className='px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between'>
							<div className='flex items-center'>
								<button
									onClick={() => count > 0 && setCount((prevCount) => prevCount - 1)}
									type='button'
									className='w-full p-3 border rounded-l-full text-gray-600 bg-white hover:bg-gray-100'>
									<MdArrowLeft className='text-md' />
								</button>
								<button
									onClick={() => setCount(1)}
									type='button'
									className='w-full px-4 py-2 border-t border-b text-base text-green-500 bg-white hover:bg-gray-100 '>
									1
								</button>
								<button
									onClick={() => setCount(2)}
									type='button'
									className='w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100'>
									2
								</button>
								<button
									onClick={() => setCount(3)}
									type='button'
									className='w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100'>
									3
								</button>
								<button
									onClick={() => setCount(4)}
									type='button'
									className='w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100'>
									4
								</button>
								<button
									onClick={() => count >= 0 && setCount((prevCount) => prevCount + 1)}
									type='button'
									className='w-full p-3 border-t border-b border-r  rounded-r-full text-gray-600 bg-white hover:bg-gray-100'>
									<MdArrowRight className='text-md' />
								</button>
							</div>
						</div>
						{edit && (
							<div className={`my-10 top-16 w-3/6 left-90 bg-white shadow-lg py-10 px-20 absolute`}>
								<div className='text-right'>
									<button className='ml-auto' onClick={() => setEdit(false)}>
										<IoMdClose className='text-right text-xl' />
									</button>
								</div>
								<div className='relative my-2'>
									<label for='id' className='block text-md py-3 font-medium text-gray-700'>
										ID :
									</label>
									<input
										onChange={(e) => setDataId(e.target.value)}
										type='text'
										className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
										placeholder='Type the item id'
										defaultValue={editDataItem.id}
									/>
								</div>
								<div className='relative my-4'>
									<label for='name' className='block text-md py-3 font-medium text-gray-700'>
										Name :
									</label>
									<input
										onChange={(e) => setDataName(e.target.value)}
										type='text'
										className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
										placeholder=' name'
										defaultValue={editDataItem.full_name}
									/>
								</div>
								<div className='relative my-4'>
									<label for='name' className='block text-md py-3 font-medium text-gray-700'>
										phone :
									</label>
									<input
										onChange={(e) => setDataPhone(e.target.value)}
										type='text'
										className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
										placeholder=' phone'
										defaultValue={editDataItem.phone}
									/>
								</div>
								<div className='relative my-4'>
									<label for='name' className='block text-md py-3 font-medium text-gray-700'>
										email :
									</label>
									<input
										onChange={(e) => setDataEmail(e.target.value)}
										type='text'
										className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
										placeholder=' email'
										defaultValue={editDataItem.email}
									/>
								</div>
								<div className='relative my-4'>
									<label for='name' className='block text-md py-3 font-medium text-gray-700'>
										address :
									</label>
									<input
										onChange={(e) => setDataAddress(e.target.value)}
										type='text'
										className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
										placeholder=' address'
										defaultValue={editDataItem.address}
									/>
								</div>
								<div className='relative px-2 w-1/2'>
									<label for='id' className='block text-md py-3 font-medium text-gray-700'>
										Status :
									</label>
									<select
										onChange={(e) => setDataStatus(e.target.value)}
										className='flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
										name='animals'
										defaultValue={editDataItem.status}>
										<option value='' disabled selected>
											Select an option
										</option>
										<option value='active'>Active</option>
										<option value='inActive'>InActive</option>
									</select>
								</div>

								<button
									onClick={() => EditFood()}
									type='button'
									className=' my-4 py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 '>
									{loading ? 'Loading' : 'Save'}
								</button>
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

export default CustomerList;
