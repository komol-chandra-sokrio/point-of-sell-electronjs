import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import CustomerList from './CustomerList';
import AddCustomer from './AddCustomer';
import DashboardHome from './DashboardHome';
import AccountInfo from './AccountInfo';
import AddOrder from './AddOrder';
import OrderList from './OrderList';

const Dashboard = () => {
	return (
		<>
			<Header />
			<SideBar />
			<main>
				<Routes>
					<Route path='/' element={<DashboardHome />} />
					<Route path='accountinformation' element={<AccountInfo />} />
					<Route path='addproduct' element={<AddProduct />} />
					<Route path='productlist' element={<ProductList />} />
					<Route path='addcustomer' element={<AddCustomer />} />
					<Route path='customerlist' element={<CustomerList />} />
					<Route path='addorder' element={<AddOrder />} />
					<Route path='orderlist' element={<OrderList />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
};

export default Dashboard;
