import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import CustomerList from './CustomerList';
import AddCustomer from './AddCustomer';
import AddStudent from './AddStudent';
import DistributionForm from './DistributionForm';
import StudentList from './StudentList';
import DashboardHome from './DashboardHome';
import FoodList from './FoodList';
import AccountInfo from './AccountInfo';

const Dashboard = () => {
	return (
		<>
			<Header />
			<SideBar />
			<main>
				<Routes>
					<Route path='/' element={<DashboardHome />} />
					<Route path='addproduct' element={<AddProduct />} />
					<Route path='productlist' element={<ProductList />} />
					<Route path='addcustomer' element={<AddCustomer />} />
					<Route path='customerlist' element={<CustomerList />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
};

export default Dashboard;
