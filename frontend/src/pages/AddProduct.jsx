import axios from 'axios';
import React, { useState } from 'react';

const AddProduct = () => {
	const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [purchasePrice, setPurchasePrice] = useState('');
	const [sellPrice, setSellPrice] = useState('');
	const [sku, setSku] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState('');
	const data = {
		id: id,
		name: name,
		purchase_price: purchasePrice,
		price: sellPrice,
		sku: sku,
		description: description
	};
	const GetInfo = async () => {
		setLoading(true);
		try {
			const res = await axios({
				method: 'post',
				url: `http://localhost:5000/products`,
				data: data,
				headers: {
					token: JSON.parse(localStorage.getItem('token'))
				}
			});
			if (res) {
				setLoading(false);
				setId('');
				setName('');
				setPurchasePrice('');
				setSellPrice('');
				setSku('');
				setDescription('');
			}
		} catch (err) {
			setLoading(false);
		}
	};

	return (
		<section className='container mx-auto px-4 sm:px-8 max-w-100'>
			<h4 className='text-xl font-bold'>Add new product item</h4>
			<div className='my-10'>
				<div className='relative my-2'>
					<label for='id' className='block text-md py-3 font-medium text-gray-700'>
						Product ID :
					</label>
					<input
						onChange={(e) => setId(e.target.value)}
						type='text'
						className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
						placeholder='Type the Product item id'
						value={id}
					/>
				</div>
				<div className='relative my-4'>
					<label for='name' className='block text-md py-3 font-medium text-gray-700'>
						Product Name :
					</label>
					<input
						onChange={(e) => setName(e.target.value)}
						type='text'
						className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
						placeholder='Product name'
						value={name}
					/>
				</div>
				<div className='relative my-4'>
					<label for='purchase' className='block text-md py-3 font-medium text-gray-700'>
						Product Purchase Price :
					</label>
					<input
						onChange={(e) => setPurchasePrice(e.target.value)}
						type='number'
						className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
						placeholder='Product Purchase Price'
						value={purchasePrice}
					/>
				</div>

				<div className='relative my-4'>
					<label for='sellPrice' className='block text-md py-3 font-medium text-gray-700'>
						Product Sell Price :
					</label>
					<input
						onChange={(e) => setSellPrice(e.target.value)}
						type='number'
						className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
						placeholder='Product Sell Price'
						value={sellPrice}
					/>
				</div>
				<div className='relative my-4'>
					<label for='sku' className='block text-md py-3 font-medium text-gray-700'>
						Product Sku :
					</label>
					<input
						onChange={(e) => setSku(e.target.value)}
						type='text'
						className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
						placeholder='Product Sku '
						value={sku}
					/>
				</div>
				<div className='relative my-4'>
					<label for='sku' className='block text-md py-3 font-medium text-gray-700'>
						Product Description :
					</label>
					<input
						onChange={(e) => setDescription(e.target.value)}
						type='text'
						className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
						placeholder='Product Description '
						value={description}
					/>
				</div>
				<button
					onClick={() => GetInfo()}
					type='button'
					className=' my-4 py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 '>
					{loading ? 'Loading' : 'Save'}
				</button>
			</div>
		</section>
	);
};

export default AddProduct;
