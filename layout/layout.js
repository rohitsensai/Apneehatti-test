import { useEffect } from "react";
import { fetchCategories } from "../slices/categories";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Header from "../components/header";
import 'bootstrap/dist/css/bootstrap.css';
import { useRouter } from "next/router";
import { fetchProducts } from "../slices/product";
const Footer = dynamic(() => import("../components/footer"), { ssr: false });
const Whatsapp = dynamic(() => import("../components/whatsapp"), {
  ssr: false,
});
const Top = dynamic(() => import("../components/top"),{
  ssr:false,
})


const Layout = ({ children }) => {
  const router = useRouter();
  const isLoginPage = router.pathname  === '/login'
  const isRegisterPage = router.pathname  === '/register'
  const isForgetPasswordPage = router.pathname  === '/forgot-password'
  const isContactUsPage = router.pathname === '/contact-us'

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <div className="relative">
        {!isLoginPage && !isRegisterPage && !isForgetPasswordPage  && <Header categories={categories} />}
        {children}
        <Top/>
        <Whatsapp />
        {!isLoginPage && !isRegisterPage && !isForgetPasswordPage && !isContactUsPage && <Footer categories={categories} />}
      </div>
    </>
  );
};

export default Layout;
