import { BrowserRouter, Routes, Route } from "react-router-dom";
import SellerHome from "./pages/jaheok/SellerHome";
import Map from "./pages/jaheok/Map";
import ProductRegistration from "./pages/jaheok/ProductRegistration";
import SellingManage from "./pages/jaheok/SellingManage";
import SellingHistory from "./pages/jaheok/SellingHistory";
// dongjae part
import Layout from "./pages/dongjae/Layout";
import Customer_start from "./pages/dongjae/Customer_start";
import Login from "./pages/dongjae/Login";
import Subscribe from "./pages/dongjae/Subscribe";
import DashBoard from "./pages/jaheok/DashBoard";
import Customer_log from "./pages/dongjae/Customer_log";

// Yoonseon part
import UserHome from "./pages/Yoonseon/UserHome";
import ItemPage from "./pages/Yoonseon/ItemPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Login />} />
            <Route path="/sellerhome" element={<SellerHome />} />
            <Route path="/map/:buyerId" element={<Map />} />
            <Route path="/productregi" element={<ProductRegistration />} />
            <Route path="/sellingmanage" element={<SellingManage />} />
            <Route path="/sellinghistory" element={<SellingHistory />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/userhome" element={<UserHome />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/customer_start" element={<Customer_start />} />
            <Route path="/userhome/:buyerId" element={<UserHome />} />
            <Route path="/itempage/:category/:buyerId" element={<ItemPage />} />
            <Route path="/customerlog/:buyerId" element={<Customer_log />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
