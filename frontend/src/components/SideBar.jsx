import React from 'react';
import { Link } from 'react-router-dom';
import { FaWpforms, FaUsers } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';
import { TiUserAdd } from 'react-icons/ti';
import { CgLogOff } from 'react-icons/cg';
import { AiOutlineDashboard } from 'react-icons/ai';
import { GiFoodChain } from 'react-icons/gi';

const SideBar = () => {
	const RemovedUser = () => {
		localStorage.removeItem('token');
		window.location.reload();
	};
	return (
		<aside className='bg-white dark:bg-gray-800'>
			<Link to='/dashboard' className='flex items-center justify-center mt-2'>
				<AiOutlineDashboard className='text-xl mr-2 text-green-600' />
				<h4 className='text-center py-3 text-xl text-green-600 font-semibold'>Dashboard</h4>
			</Link>
			<nav className='mt-6 px-6'>
				<Link
					className='hover:text-green-600 font-thin text-gray-500 dark:text-gray-400 hover:bg-green-200 flex items-center p-2 my-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 justify-start'
					to='accountinformation'>
					<span className='text-left text-green-600'>
						<MdFastfood />
					</span>
					<span className='mx-4 text-sm font-normal'>Account Info</span>
				</Link>
				<Link
					className='hover:text-green-600 font-thin text-gray-500 dark:text-gray-400 hover:bg-green-200 flex items-center p-2 my-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 justify-start'
					to='addproduct'>
					<span className='text-left text-green-600'>
						<MdFastfood />
					</span>
					<span className='mx-4 text-sm font-normal'>Add Product</span>
				</Link>
				<Link
					className='hover:text-green-600 font-thin text-gray-500 dark:text-gray-400 hover:bg-green-200 flex items-center p-2 my-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 justify-start'
					to='productlist'>
					<span className='text-left text-green-600'>
						<MdFastfood />
					</span>
					<span className='mx-4 text-sm font-normal'>Product List</span>
				</Link>
				<Link
					className='hover:text-green-600 font-thin text-gray-500 dark:text-gray-400 hover:bg-green-200 flex items-center p-2 my-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 justify-start'
					to='addcustomer'>
					<span className='text-left text-green-600'>
						<MdFastfood />
					</span>
					<span className='mx-4 text-sm font-normal'>Add Customer</span>
				</Link>
				<Link
					className='hover:text-green-600 font-thin text-gray-500 dark:text-gray-400 hover:bg-green-200 flex items-center p-2 my-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 justify-start'
					to='customerlist'>
					<span className='text-left text-green-600'>
						<MdFastfood />
					</span>
					<span className='mx-4 text-sm font-normal'>Customer List</span>
				</Link>
				<Link
					className='hover:text-green-600 font-thin text-gray-500 dark:text-gray-400 hover:bg-green-200 flex items-center p-2 my-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 justify-start'
					to='addorder'>
					<span className='text-left text-green-600'>
						<MdFastfood />
					</span>
					<span className='mx-4 text-sm font-normal'>Create Order</span>
				</Link>
				<Link
					className='hover:text-green-600 font-thin text-gray-500 dark:text-gray-400 hover:bg-green-200 flex items-center p-2 my-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 justify-start'
					to='orderlist'>
					<span className='text-left text-green-600'>
						<MdFastfood />
					</span>
					<span className='mx-4 text-sm font-normal'>Order List</span>
				</Link>
			</nav>
			<button
				onClick={() => RemovedUser()}
				className='hover:text-green-600 font-thin text-gray-500 dark:text-gray-400  flex items-center p-2 my-4 transition-colors dark:hover:text-white duration-200 justify-start  ml-6'>
				<span className='text-left text-green-600'>
					<CgLogOff />
				</span>
				<span className='mx-4 text-sm font-normal'>Log out</span>
			</button>
		</aside>
	);
};

export default SideBar;
