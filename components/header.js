import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "./search";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { fetchSearch } from "../slices/product";
import { FiUser } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { AnimatePresence, motion, transform } from "framer-motion";
import CurrencyFormatter from "../helper/currencyFormatter";
import MobileSidebar from "./mobileSidebar";
import Login from './login'
import Cart from "./cart";
import { useRouter } from "next/router";
import SignOutConfirmation from "./signOutConfimation";
import { FaUser, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BiSearch } from 'react-icons/bi';
import header from '../styles/Header.module.css'
import { link } from "fontawesome";

const Header = ({ categories }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginPage,setIsLoginPage] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [closeSidebar, setCloseSidebar] = useState(true);
  const [searchKey, setSearchKey] = useState();

  const { cartItems } = useSelector((state) => state.cart);
  const { data: session, status } = useSession();
  const { searchList } = useSelector((state) => state.products);
  const [isActive, setIsActive] = useState(false);
  const [isSessionLoaded, setIsSessionLoaded] = useState(false); // State to track if session data has been loaded


  const handleSearchClick = () => {
    setIsActive(true); // Set isActive to true when the search form is clicked
  };
  const handleLogin = () =>{
    setIsLoginPage(!isLoginPage)
  }
  useEffect(() => {
    if (status === 'loading') {
      // Session data is still loading
      setIsSessionLoaded(false); // Set session loaded state to false
    } else if (status === 'success' && session !== null) {
      
      // Session data has been successfully loaded and is not null
        setIsLoginPage(false)
      setIsSessionLoaded(true); // Set session loaded state to true
    }
  }, [status, session]);




  const renderChildrensCategories = (categories) => {
    let categoriesList = [];
    for (let category of categories) {
      if (category.active) {
        categoriesList.push(
          <li
            className=" cursor-pointer text-sm font-light list-none capitalize text-gray-500   hover:bg-gray-100 hover:font-medium hover:text-black"
            key={category._id}
          >
            <Link
              className="hidden md:block"
              href={{ pathname: "/search", query: { category: category.slug } }}
            >
              <span className="hidden md:block  p-2">{category.name} </span>
            </Link>
            <Link
              className="block md:hidden"
              href={{ pathname: "/search", query: { category: category.slug } }}
            >
              <span
                onClick={() => setCloseSidebar(!closeSidebar)}
                className="block md:hidden p-2"
              >
                {category.name}{" "}
              </span>
            </Link>
            {category.children.length > 0 ? (
              <ul className="sm:m-0 lg:ml-3" style={{ minWidth: "150px" }}>
                {renderChildrensCategories(category.children)}
              </ul>
            ) : null}
          </li>
        );
      }
    }
    return categoriesList;
  };

  useEffect(() => {
    if (searchKey == ' ') {
      searchKey = '';
    }
    const delayDebounceFn = setTimeout(() => {
      // Perform search operation here
      dispatch(fetchSearch(searchKey));
    }, 1000); // Adjust the debounce delay time according to your needs
    return () => clearTimeout(delayDebounceFn);
  }, [searchKey]);


  function show() {
    
    setCloseSidebar(!closeSidebar);
    console.log("closesidebar", closeSidebar)

  }
  const router = useRouter();

  const isCategoryPage = router.pathname.startsWith("/search")
  const isCheckoutPage = router.pathname.startsWith("/placeorder")
  const isBlogPage = router.pathname.startsWith("/blog")
  const isAboutUsPage = router.pathname.startsWith("/about-us")
  const isContactUsPage = router.pathname.startsWith("/contact-us")
  const isWishlistPage = router.pathname.startsWith("/wishlist")


  return (
    <>

      <div id={header["outer"]} className=" sticky top-0 z-20  w-full" >
        {/* <div className="flex p-2 items-center justify-center bg-green-400 px-4 text-sm font-medium text-white sm:px-6 lg:px-8 ">
          <p className="animate-pulse">
            Goodness of Himalayas at your Doorstep!
          </p>
        </div> */}
        <div className="bg-white">
          <div id={header["sidebar"]}>
            <div class={header["toggle-btn"]} onClick={show}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul>
              <li>Shop</li>
              <li>About Us</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>

          <header className="shadow container-fluid d-flex flex-row align-items-center justify-content-between  " class={header["container-fluid"]} id={header["header"]}>

            {/* Logo - Hidden on Small Screens */}
            <a href="/" className="a d-none d-md-block">
              <img src="/images/logo/ApneeHatti_light.png" width={100} alt="Logo" className="img-fluid" />
            </a>

            {/* Search Form */}

            <ul className=" d-none d-md-flex list-unstyled align-items-center justify-content-center  justify-content-md-around mb-0 " id={header["bar"]} style={{ width: '40%', maxWidth: '800px' }}>
              <li className="nav-item mx-2" class={header["nav-item"]}>
                <a className={`${header["nav-link"]} ${header["greyonhover"]}`} href="/">
                  <button type="button" class="btnn rounded">Shop</button>

                </a>
              </li>
              <li className="nav-item mx-2" class={header["nav-item"]}>
                <a className={`${header.nav - link} ${header["greyonhover"]}`} href="/about-us">
                  <button type="button" class="btnn  rounded">About Us</button>
                </a>
              </li>
              <li className="nav-item mx-2" class={header["nav-item"]}>
                <a className={`${header.nav - link} ${header["greyonhover"]}`} href="/blog">
                  <button type="button" class="btnn rounded">Blog </button>
                </a>
              </li>
              <li className="nav-item mx-2" class={header["nav-item"]}>
                <a className={`${header.nav - link} ${header["greyonhover"]}`} href="/contact-us">
                  <button type="button" class="btnn rounded">Contact</button>
                </a>
              </li>
            </ul>

            <form
              className={`d-flex align-items-center  my-2 my-md-0  ${isActive ? 'active' : ''}`}
              id="search"
            // onClick={handleSearchClick}
            >

              <input
                className="form-control custom-no-outline "
                class={header["form-control"]}
                type="search"
                placeholder="Search for Mountain Products"
                aria-label="Search"
                id="inside-search"
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
                value={searchKey}
              />


              <div>
                {searchKey ? (
                  <Link
                    href={{
                      pathname: "/search",
                      query: searchKey
                        ? { q: searchKey }
                        : { category: "all" },
                    }}
                  >
                    <svg
                      className="hidden md:block h-6 w-6 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </Link>
                ) : (
                  <svg
                    className="hidden md:block h-6 w-6 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                )}
              </div>

              <div
                className={`${searchKey
                  ? "absolute sm:top-10 top-2 mt-12  right-30 z-10 bg-white w-[300px] sm:w-[600px]  border-l-4 border-green-400"
                  : "hidden"
                  }`}
              >
                <div className="border-gray-400 border-l-0 border p-2 cursor-pointer max-h-80 overflow-y-auto ">
                  <AnimatePresence>
                    {searchList.length > 0 ? (
                      searchList.map((list) => (
                        <Link
                          key={list._id}
                          href={{
                            pathname: "/search",
                            query: { q: list.name },
                          }}
                        >
                          <motion.div
                            onClick={(e) => {
                              setSearchKey("");
                            }}
                            layout
                            key={list._id}
                            transition={{ duration: 0.3 }}
                            exit={{ opacity: 0 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-2 cursor-pointer text-gray-500 text-sm capitalize hover:bg-gray-100 hover:font-medium hover:text-black"
                          >
                            {list.name}
                          </motion.div>
                        </Link>
                      ))
                    ) : (
                      <div className="p-2 cursor-pointer text-gray-500 text-sm capitalize hover:bg-gray-100 hover:font-medium hover:text-black">
                        Not found
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>


            </form>


            {/* Navigation Links - Hidden on Small Screens */}



            {/* Login Button - Always Visible */}
            <div className="mx-2">
              {session == null && (
            
                  <button className="btn btn-primary mybtn text-white" class={header.mybtn} onClick={handleLogin}>
                    LOGIN <FaUser style={{ marginLeft: '5px', color: "white" }} />
                  </button>
               
              )}
            </div>

            {session && session.user && (
              <>
                <div className="d-flex flex-row " id="pwc">
                <Link 
                      href="myprofile"
                    >
                  <div className={`d-flex flex-column align-items-center cursor-pointer  mx-2${header["greyonhover"]} `}>
                    
                    <FaUser className="" />
                    <div className="d-none d-sm-block" style={{ fontSize: "16px" }}>Profile</div>
                    
                  </div>
                  </Link>
                  <Link
                      href="wishlist"
                    >
                  <div className="d-flex flex-column align-items-center cursor-pointer mx-2 ">
                   
                    <FaHeart className="" />
                    <div className="d-none d-sm-block" style={{ fontSize: "16px" }}>Wishlist</div>
                 
                  </div>
                  </Link>
                  <div className="d-flex flex-column align-item-center cursor-pointer " onClick={() => setIsOpen(!isOpen)}>
                    <FaShoppingCart className="" />
                    <button className="d-none d-sm-block" >


                      <div className=" " style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="d-flex flex-row align-items-center  d-none d-sm-block" style={{ fontSize: "16px" }}>
                          <span>Cart</span>
                          <span>({cartItems.length})</span>
                        </div>

                      </div>

                    </button>
                  </div>
                  <div className="d-none d-sm-flex flex-column align-items-center mx-2">
                    <SignOutConfirmation signOut={signOut} />
                  </div>
                </div>
               

              </>
            )
            }


          </header >
        </div >
      </div>
      {!isCheckoutPage && !isBlogPage && !isAboutUsPage && !isContactUsPage && !isWishlistPage && (
        <div className=" bg-white pt-2 rounded " id={header["navbarNav1"]}>
          <ul className="navbar-nav d-flex flex-row justify-content-around" >
            <li className={header["nav-item"]} >

              <a class="nav-link greyonhover" href="/search?category=all" >
                <img alt="aLL PRODUCTS" className={header["cat-img"]} src="/images/pictures/category/all.jpg" style={{}}></img>
                <div className="greyonhover" > All Products</div>
              </a>
            </li>
            <li className={header["nav-item"]}>

              <a class="nav-link greyonhover" href="/search?category=Handlooms" >
                <img className={header["cat-img"]} src="/images/pictures/category/1.jpg"></img>
                <div className="greyonhover" > Handlooms</div>
              </a>
            </li>
            <li className={header["nav-item"]}>
              <a class="nav-link greyonhover" href="/search?category=Skincare-and-Beauty">
                <img className={header["cat-img"]} src="/images/pictures/category/2.jpg"></img>
                <div className="greyonhover" >  Skincare & Beauty</div>

              </a>
            </li>
            <li className={header["nav-item"]}>
              <a class="nav-link greyonhover" href="/search?category=Handcrafts">
                <img className={header["cat-img"]} src="/images/pictures/category/3.jpeg"></img>
                <div className="greyonhover" > Handcrafts</div>

              </a>
            </li>
            <li className={header["nav-item"]}>
              <a class="nav-link greyonhover" href="/search?category=Organic-Food-Products">
                <img className={header["cat-img"]} src="/images/pictures/category/4.jpeg"></img>
                <div className="greyonhover" > Organic Food Porducts</div>

              </a>
            </li>
            <li className={header["nav-item"]}>
              <a class="nav-link greyonhover" href="/search?category=Health-Care">
                <img className={header["cat-img"]} src="/images/pictures/category/5.jpeg"></img>
                <div className="greyonhover" > Health Care</div>
              </a>
            </li>
          </ul>
        </div>
      )
      }





      <Cart
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        session={session}
        status={status}
      />

      {/* <Search setIsSearchOpen={setIsSearchOpen} isSearchOpen={isSearchOpen} /> */}

      <MobileSidebar
        setCloseSidebar={setCloseSidebar}
        closeSidebar={closeSidebar}
        categories={categories}
        session={session}
        status={status}
        signOut={signOut}
      />

      {isLoginPage && !session &&
        
        <Login
         
          onClose={handleLogin}

       
      />}





    </>
  );
};

export default Header;
