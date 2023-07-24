import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';

const ProductList = () => {
	const [list, setList] = useState([]);
	const [count, setCount] = useState(0);
	const [edit, setEdit] = useState(false);
	const [deleted, setDeleted] = useState(false);
	const [deletedData, setDeletedData] = useState(null);
	const [editData, setEditData] = useState(null);
	const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [purchasePrice, setPurchasePrice] = useState('');
	const [sellPrice, setSellPrice] = useState('');
	const [sku, setSku] = useState('');
	const [description, setDescription] = useState('');
	// const [foodPrice, setFoodPrice] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const fetchDataList = async (count = 0) => {
		try {
			setLoading(true);
			const res = await axios.get(`http://localhost:5000/products?page=${count}`, {
				headers: {
					token: JSON.parse(localStorage.getItem('token'))
				}
			});
			setList(res.data.list);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError('Failed to fetch data list');
		}
	};

	useEffect(() => {
		fetchDataList(count);
	}, [count, edit, deleted]);

	// edit food handler
	const editHandler = (obj) => {
		setEdit(true);
		setEditData(obj);
		setId(obj.id);
		setName(obj.name);
		setPurchasePrice(obj.purchase_price);
		setSellPrice(obj.price);
		setSku(obj.sku);
		setDescription(obj.description);
	};

	const handleDelete = (food) => {
		setDeletedData(food);
		setDeleted(true);
	};

	const EditFood = async () => {
		setLoading(true);
		try {
			const res = await axios.put(`http://localhost:5000/products/${editData._id}`, {
				id: id,
				name: name,
				purchase_price: purchasePrice,
				price: sellPrice,
				sku: sku,
				description: description
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
					<h2 className='text-xl font-bold'>Product List</h2>
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
										Purchase Price $
									</th>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										Sell Price $
									</th>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										Created at
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
											<p className='text-gray-900 whitespace-no-wrap'>{data.name}</p>
										</td>
										<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
											<p className='text-gray-900 whitespace-no-wrap'>{data.purchase_price}</p>
										</td>
										<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
											<p className='text-gray-900 whitespace-no-wrap'>{data.price}</p>
										</td>
										<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
											<p className='text-gray-900 whitespace-no-wrap'>13/12/22</p>
										</td>
										<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
											<button
												onClick={() => editHandler(data)}
												className='text-green-600 hover:text-green-900 mx-2'>
												Edit
											</button>
											<button
												onClick={() => handleDelete(data)}
												className='text-red-600 hover:text-red-700 ml-6'>
												Delete
											</button>
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
										onChange={(e) => setId(e.target.value)}
										type='text'
										className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
										placeholder='Type the  item id'
										defaultValue={editData.id}
									/>
								</div>
								<div className='relative my-4'>
									<label for='name' className='block text-md py-3 font-medium text-gray-700'>
										Name :
									</label>
									<input
										onChange={(e) => setName(e.target.value)}
										type='text'
										className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
										placeholder=' name'
										defaultValue={editData.name}
									/>
								</div>
								<div className='relative my-4'>
									<label for='name' className='block text-md py-3 font-medium text-gray-700'>
										purchase price :
									</label>
									<input
										onChange={(e) => setPurchasePrice(e.target.value)}
										type='text'
										className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
										placeholder=' purchase price'
										defaultValue={editData.purchase_price}
									/>
								</div>
								<div className='relative my-4'>
									<label for='name' className='block text-md py-3 font-medium text-gray-700'>
										sell price :
									</label>
									<input
										onChange={(e) => setSellPrice(e.target.value)}
										type='text'
										className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
										placeholder='sell price'
										defaultValue={editData.price}
									/>
								</div>
								<div className='relative my-4'>
									<label for='name' className='block text-md py-3 font-medium text-gray-700'>
										sku :
									</label>
									<input
										onChange={(e) => setSku(e.target.value)}
										type='text'
										className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
										placeholder='sku'
										defaultValue={editData.sku}
									/>
								</div>
								<div className='relative my-4'>
									<label for='name' className='block text-md py-3 font-medium text-gray-700'>
										description :
									</label>
									<input
										onChange={(e) => setDescription(e.target.value)}
										type='text'
										className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
										placeholder='description'
										defaultValue={editData.description}
									/>
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

export default ProductList;
