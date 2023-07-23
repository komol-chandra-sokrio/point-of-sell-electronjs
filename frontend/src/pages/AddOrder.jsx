import axios from 'axios';
import React, { useState } from 'react';

const AddOrder = () => {
	const [date, setDate] = useState('');
	const [invoiceId, setInvoiceId] = useState('');
	const [customerId, setCustomerId] = useState('');
	const [grandTotal, setGrandTotal] = useState('');
	const [note, setNote] = useState('');
	const [status, setStatus] = useState('');
	const [loading, setLoading] = useState('');
	const data = {
		date: date,
		invoice_id: invoiceId,
		customer_id: customerId,
		grand_total: grandTotal,
		note: note,
		status: status
	};
	const GetInfo = async () => {
		setLoading(true);
		try {
			const res = await axios({
				method: 'post',
				url: `http://localhost:5000/orders`,
				data: data,
				headers: {
					token: JSON.parse(localStorage.getItem('token'))
				}
			});
			if (res) {
				setLoading(false);
				setDate('');
				setInvoiceId('');
				setCustomerId('');
				setGrandTotal('');
				setNote('');
				setStatus('');
			}
		} catch (err) {
			setLoading(false);
		}
	};

	return (
		<section className='container mx-auto px-4 sm:px-8 max-w-100'>
			<h4 className='text-xl font-bold'>Create New Order</h4>
			<div className='my-10'>
				<div className='flex flex-wrap items-center justify-between'>
					<div className='relative px-2 w-1/2'>
						<label for='id' className='block text-md py-3 font-medium text-gray-700'>
							Date :
						</label>
						<input
							onChange={(e) => setDate(e.target.value)}
							type='data'
							className='flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
							placeholder='Set Date'
						/>
					</div>
					<div className='relative px-2 w-1/2'>
						<label for='name' className='block text-md py-3 font-medium text-gray-700'>
							Invoice Id :
						</label>
						<input
							onChange={(e) => setInvoiceId(e.target.value)}
							type='text'
							className='flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
							placeholder='Invoice Id :'
						/>
					</div>
					<div className='relative px-2 w-1/2'>
						<label for='purchase' className='block text-md py-3 font-medium text-gray-700'>
							Select Customer Id :
						</label>
						<input
							onChange={(e) => setCustomerId(e.target.value)}
							type='number'
							className='flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
							placeholder='Product Purchase Price'
						/>
					</div>

					<div className='relative px-2 w-1/2'>
						<label for='sellPrice' className='block text-md py-3 font-medium text-gray-700'>
							Grand total :
						</label>
						<input
							onChange={(e) => setGrandTotal(e.target.value)}
							type='number'
							className='flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
							placeholder='grand total'
						/>
					</div>

					<div className='relative px-2 w-1/2'>
						<label for='note' className='block text-md py-3 font-medium text-gray-700'>
							Note :
						</label>
						<input
							onChange={(e) => setNote(e.target.value)}
							type='text'
							className='flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
							placeholder='Note'
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
							<option value='complete'>Complete</option>
							<option value='pending'>Pending</option>
						</select>
					</div>
					<button
						onClick={() => GetInfo()}
						type='button'
						className=' my-4 py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 '>
						{loading ? 'Loading' : 'Save'}
					</button>
				</div>
			</div>
		</section>
	);
};

export default AddOrder;
