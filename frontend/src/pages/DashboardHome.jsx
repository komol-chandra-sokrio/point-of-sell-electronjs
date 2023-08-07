import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';

const DashboardHome = () => {
	const [data, setData] = useState({ products: 0, customers: 0, orders: 0 });

	const fetchDataList = async () => {
		try {
			// setLoading(true);
			const res = await axios.get('http://localhost:5000/report-data', {
				headers: {
					token: JSON.parse(localStorage.getItem('token'))
				}
			});
			setData(res.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchDataList();
	}, []);

	return (
		<>
			<section>
				<div className='flex flex-wrap gap-16 justify-center'>
					<div className='card w-1/5 hover:bg-orange-500 bg-orange-400 py-10 px-5 rounded shadow'>
						<h4 className='text-2xl font-bold text-white'>Total Product</h4>
						<h4 className='text-2xl font-bold text-white'>{data.products}</h4>
					</div>
					<div className='card w-1/5 hover:bg-green-500 bg-green-400 py-10 px-5 rounded shadow'>
						<h4 className='text-2xl font-bold text-white'>Total Customer</h4>
						<h4 className='text-2xl font-bold text-white'>{data.customers}</h4>
					</div>
					<div className='card w-1/5 hover:bg-green-500 bg-green-400 py-10 px-5 rounded shadow'>
						<h4 className='text-2xl font-bold text-white'>Total Order</h4>
						<h4 className='text-2xl font-bold text-white'>{data.orders}</h4>
					</div>
				</div>
			</section>
		</>
	);
};

export default DashboardHome;
