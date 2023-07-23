import React from 'react';
const DashboardHome = () => {
	return (
		<>
			<section>
				<div className='flex flex-wrap gap-16 justify-center'>
					<div className='card w-1/5 hover:bg-orange-500 bg-orange-400 py-10 px-5 rounded shadow'>
						<h4 className='text-2xl font-bold text-white'>Total Product</h4>
						<h4 className='text-2xl font-bold text-white'>559</h4>
					</div>
					<div className='card w-1/5 hover:bg-green-500 bg-green-400 py-10 px-5 rounded shadow'>
						<h4 className='text-2xl font-bold text-white'>Total Customer</h4>
						<h4 className='text-2xl font-bold text-white'>559</h4>
					</div>
				</div>
			</section>
		</>
	);
};

export default DashboardHome;
