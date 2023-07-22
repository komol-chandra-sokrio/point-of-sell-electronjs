import axios from 'axios';
import React, { useState } from 'react';

const AddCustomer = () => {
	const [id, setID] = useState('');
	const [name, setName] = useState('');
	const [phone, setPhone] = useState(null);
	const [email, setEmail] = useState(null);
	const [address, setAddress] = useState('');
	const [status, setStatus] = useState('');
	const [loading, setLoading] = useState('');

	const data = {
		id: id,
		full_name: name,
		phone: phone,
		email: email,
		address: address,
		status: status
	};

	const Add = async () => {
		setLoading(true);
		try {
			const res = await axios({
				method: 'post',
				url: `http://localhost:5000/customers`,
				data: data,
				headers: {
					token: JSON.parse(localStorage.getItem('token'))
				}
			});
			if (res) {
				setLoading(false);
				setID('');
				setName('');
				setPhone('');
				setEmail('');
				setAddress('');
				setStatus('');
			}
		} catch (err) {
			setLoading(false);
		}
	};

	return (
		<section className='container mx-auto px-4 sm:px-8 max-w-100'>
			<h4 className='text-xl font-bold'>Add new customer in list</h4>
			<div className='my-10'>
				<div className='flex flex-wrap items-center justify-between'>
					<div className='relative px-2 w-1/2'>
						<label for='name' className='block text-md py-3 font-medium text-gray-700'>
							Customer ID :
						</label>
						<input
							onChange={(e) => setID(e.target.value)}
							type='text'
							className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
							placeholder=' id'
						/>
					</div>
					<div className='relative px-2 w-1/2'>
						<label for='name' className='block text-md py-3 font-medium text-gray-700'>
							Full Name :
						</label>
						<input
							onChange={(e) => setName(e.target.value)}
							type='text'
							className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
							placeholder=' full name'
						/>
					</div>
					<div className='relative px-2 w-1/2'>
						<label for='name' className='block text-md py-3 font-medium text-gray-700'>
							Phone Number :
						</label>
						<input
							onChange={(e) => setPhone(e.target.value)}
							type='text'
							className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
							placeholder=' phone number'
						/>
					</div>
					<div className='relative px-2 w-1/2'>
						<label for='name' className='block text-md py-3 font-medium text-gray-700'>
							Email :
						</label>
						<input
							onChange={(e) => setEmail(e.target.value)}
							type='text'
							className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
							placeholder=' age'
						/>
					</div>
					<div className='relative px-2 w-1/2'>
						<label for='name' className='block text-md py-3 font-medium text-gray-700'>
							Address :
						</label>
						<input
							onChange={(e) => setAddress(e.target.value)}
							type='text'
							className=' flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
							placeholder='address'
						/>
					</div>
					<div className='relative px-2 w-1/2'>
						<label for='id' className='block text-md py-3 font-medium text-gray-700'>
							Status :
						</label>
						<select
							onChange={(e) => setStatus(e.target.value)}
							className='flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
							name='animals'>
							<option value='' disabled selected>
								Select an option
							</option>
							<option value='active'>Active</option>
							<option value='inActive'>InActive</option>
						</select>
					</div>
				</div>
				<button
					onClick={() => Add()}
					type='button'
					className='my-4 mx-2 py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 '>
					{loading ? 'Loading...' : 'Save'}
				</button>
			</div>
		</section>
	);
};

export default AddCustomer;
