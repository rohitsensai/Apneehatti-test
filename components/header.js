import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "./search";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { fetchSearch } from "../slices/product";
import { FiUser } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import CurrencyFormatter from "../helper/currencyFormatter";
import MobileSidebar from "./mobileSidebar";
import Cart from "./cart";
import SignOutConfirmation from "./signOutConfimation";
import { FaUser, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BiSearch } from 'react-icons/bi'; 

const Header = ({ categories }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [closeSidebar, setCloseSidebar] = useState(true);
  const [searchKey, setSearchKey] = useState();

  const { cartItems } = useSelector((state) => state.cart);
  const { data: session, status } = useSession();
  const { searchList } = useSelector((state) => state.products);
  const [isActive, setIsActive] = useState(false);

  const handleSearchClick = () => {
    setIsActive(true); // Set isActive to true when the search form is clicked
  };





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
    const delayDebounceFn = setTimeout(() => {
      // Perform search operation here
      dispatch(fetchSearch(searchKey));
    }, 300); // Adjust the debounce delay time according to your needs
    return () => clearTimeout(delayDebounceFn);
  }, [searchKey]);


  function show() {
    // var element = document.getElementById('sidebar'),
    //   style = window.getComputedStyle(element),
    //   left = style.getPropertyValue('left');


    // console.log(left)
    // if (left == "-200px") {

    //   document.getElementById('sidebar').classList.toggle('active');
    //   document.getElementById('sidebar').style.left = '0';
    //   document.getElementById('sidebar').style.top = '0'
    //   document.getElementsByClassName('toggle-btn').display = 'none'
    // }
    // else {
    //   document.getElementById('sidebar').style.left = '-200px';
    //   document.getElementById('sidebar').style.top = '0'
    // }
    setCloseSidebar(!closeSidebar);
    console.log("closesidebar", closeSidebar)

  }


  return (
    <>
      <div id="outer" className=" " >
      <div className="flex p-2 items-center justify-center bg-green-400 px-4 text-sm font-medium text-white sm:px-6 lg:px-8 ">
              <p className=" animate-pulse">
                Goodness of Himalayas at your Doorstep!
              </p>
            </div>
        <div id="upper"  style={{backgroundColor:"grey"}}>
          <div id="sidebar">
            <div class="toggle-btn" onClick={show}>
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

          <header className="container-fluid d-flex flex-row align-items-center justify-content-between  " id="header">

            {/* Logo - Hidden on Small Screens */}
            <a href="/" className=" d-none d-md-block">
              <img src="/images/logo/ApneeHatti_light.png" width={100} alt="Logo" className="img-fluid" />
            </a>

            {/* Search Form */}

            <form
              className={`d-flex align-items-center mx-30 my-2 my-md-0 ${isActive ? 'active' : ''}`}
              id="search"
              onClick={handleSearchClick}
            >
              <input
                className="form-control custom-no-outline flex-grow-1"
                type="search"
                placeholder="Search for Mountain Products"
                aria-label="Search"
                id="inside-search"
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
                value={searchKey}
              />
              <button className="btn " type="submit">
          <BiSearch /> {/* Search icon from React Icons */}
        </button>
            </form>





            {/* Navigation Links - Hidden on Small Screens */}
            <ul className=" d-none d-md-flex list-unstyled align-items-center justify-content-center text-white justify-content-md-around mb-0 border-border-danger" id="bar" style={{ width: '40%', maxWidth: '800px' }}>
              <li className="nav-item mx-2">
                <a className="nav-link" href="/">
                  <button type="button" class="btnn rounded">Shop</button>

                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#">
                  <button type="button" class="btnn  rounded">About Us</button>
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#">
                  <button type="button" class="btnn rounded">Blog </button>
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#">
                  <button type="button" class="btnn rounded">Contact</button>
                </a>
              </li>
            </ul>


            {/* Login Button - Always Visible */}
            <div className="mx-2">
              {session == null && (
                <a href="/login">
                  <button className="btn btn-primary mybtn text-white">
                    LOGIN <FaUser style={{ marginLeft: '5px', color: "white" }} />
                  </button>
                </a>
              )}
            </div>

            {session !== null && (
              <>
                <ul className=" d-flex flex-row navbar-nav mx-2" id="pwc">
                  <li className="nav-item">
                    <a className="nav-link" href="/myprofile">
                      <FaUser />
                      <div className="name" style={{ fontSize: "9px" }}>Profile</div>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/wishlist">
                      <FaHeart />
                      <div className="name" style={{ fontSize: "9px" }}>Liked</div>
                    </a>
                  </li>
                  <li className="nav-item">
                    <button onClick={() => setIsOpen(!isOpen)} className="nav-link">
                      <FaShoppingCart />
                      <div className="name" style={{ fontSize: "9px" }}>Cart</div>
                    </button>
                  </li>
                </ul>

              </>
            )}


          </header >
        </div >
        <div className="mx-4 bg-white py-2 rounded " id="navbarNav1">
          <ul className="navbar-nav d-flex flex-row justify-content-around">
            <li className="nav-item">

              <a className="nav-link" href="/search?category=Handlooms">
                <img className="cat-img" src="/images/pictures/category/1.jpg"></img>
                <div className="text"> Handlooms</div>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/search?category=Skincare-and-Beauty">
                <img className="cat-img" src="/images/pictures/category/2.jpg"></img>
                <div className="text">  Skincare & Beauty</div>

              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/search?category=Handcrafts">
                <img className="cat-img" src="/images/pictures/category/3.jpeg"></img>
                <div className="text"> Handcrafts</div>

              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/search?category=Organic-Food-Products">
                <img className="cat-img" src="/images/pictures/category/4.jpeg"></img>
                <div className="text"> Organic Food Porducts</div>

              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/search?category=Health-Care">
                <img className="cat-img" src="/images/pictures/category/5.jpeg"></img>
                <div className="text"> Health Care</div>
              </a>
            </li>
          </ul>
        </div>




      </div >
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
      {/*
      <div className="bg-white">
        <div className=" h-[162px]">
          <div className=" bg-white z-30  w-screen  fixed top-0 ">
            <div className="flex p-2 items-center justify-center bg-green-400 px-4 text-sm font-medium text-white sm:px-6 lg:px-8 ">
              <p className=" animate-pulse">
                Goodness of Himalayas at your Doorstep!
              </p>
            </div>
            <div className="flex h-16 items-center border-b border-gray-200 px-4 sm:px-6 lg:px-8 "> */}
      {/* <!-- Mobile menu toggle, controls the 'mobileMenuOpen' state. --> */}
      {/* <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setCloseSidebar(false)}
              >
                <span className="sr-only">Open menu</span> */}
      {/* <!-- Heroicon name: outline/bars-3 --> */}
      {/* <svg
                  className="h-6 w-6"
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
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button> */}

      {/* <!-- Logo --> */}
      {/* <div className="ml-4 flex lg:ml-0 cursor-pointer">
                <Link href="/">
                  <div>
                    <Image
                      src="/images/logo/apneehatti_logo.svg"
                      width={60}
                      height={60}
                      priority
                      alt="logo"
                    />
                  </div>
                </Link>
              </div> */}

      {/* Sign In */}
      {/* <div className="ml-auto flex items-center"> */}
      {/* <!-- Search --> */}

      {/* <div className="flex lg:ml-6 relative">
                  <a
                    href="#"
                    className="p-2 text-gray-700 hover:text-black flex items-center"
                  >
                    <span className="sr-only">Search</span> */}
      {/* <!-- Heroicon name: outline/magnifying-glass --> */}
      {/* <input
                      type="search"
                      onChange={(e) => {
                        setSearchKey(e.target.value);
                      }}
                      value={searchKey}
                      placeholder="Search Products ....."
                      className="hidden md:block h-8 border-gray-700 border-[1.5px] mr-2 focus:ring-0 focus:border-green-400 active:border-green-400"
                    />

                    <div className="lg:hidden">
                      {!isSearchOpen ? (
                        <svg
                          onClick={() => setIsSearchOpen(!isSearchOpen)}
                          className="md:hidden h-6 w-6"
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
                      ) : (
                        <AiOutlineClose
                          onClick={() => setIsSearchOpen(!isSearchOpen)}
                          className="text-2xl mt-1"
                        />
                      )}
                    </div>
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
                  </a>
                  <div
                    className={`${
                      searchKey
                        ? "absolute top-0 mt-12  right-0 z-10 bg-white w-[600px]  border-l-4 border-green-400"
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
                </div>
                <div className="ml-3"> */}
      {/* <!-- Dropdown menu --> */}

      {/* {session && session.user ? (
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 group">
                      <div className="group">
                        <a
                          href="#"
                          className="text-sm text-gray-700 hover:text-gray-800"
                        >
                          <FiUser className="text-2xl text-gray-700 " />
                        </a>
                        {session && session.user && (
                          <div
                            id="dropdownHover"
                            className="z-10 hidden group-hover:block hover:block absolute right-3 min-w-[200px]"
                          >
                            <div className=" mt-3 bg-white divide-y divide-gray-100 rounded-sm shadow  dark:bg-gray-700">
                              <ul
                                className="py-2 text-sm text-gray-700 dark:text-gray-200 border-l-4 border-green-400 cursor-pointer"
                                aria-labelledby="dropdownHoverButton"
                              >
                                <li className="block px-4 py-2 capitalize  hover:bg-gray-100 hover:font-medium dark:hover:bg-gray-600 dark:hover:text-white">
                                  <Link href={"/myprofile"}>
                                    {session && session.user.name}
                                  </Link>
                                </li>
                                <li className="block px-4 py-2 hover:bg-gray-100 hover:font-medium dark:hover:bg-gray-600 dark:hover:text-white">
                                  <Link href={"/myorders"}>My Orders</Link>
                                </li>
                                <li className="block px-4 py-2 hover:bg-gray-100 hover:font-medium dark:hover:bg-gray-600 dark:hover:text-white">
                                  <Link href={"/wishlist"}>Wishlist</Link>
                                </li>
                                <SignOutConfirmation signOut={signOut} />
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <Link
                        href="/login"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Sign in
                      </Link>

                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      ></span>
                    </div>
                  )}
                </div> */}
      {/* <!-- Cart --> */}
      {/* <div
                  className="ml-4 flow-root lg:ml-6"
                  id="cart"
                  data-totalitems={cartItems.length > 0 ? cartItems.length : 0}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="group -m-2 flex items-center p-2"> */}
      {/* <!-- Heroicon name: outline/shopping-bag --> */}
      {/* <svg
                      className="h-6 w-6 flex-shrink-0 text-gray-700 group-hover:text-gray-800"
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
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                    {cartItems.length > 0 && (
                      <span className="ml-2 text-xs bg-green-400 py-1 px-2 animate-pulse rounded-full font-medium text-white ">
                        {cartItems.length}
                      </span>
                    )}
                    <span className="sr-only">items in cart, view bag</span>
                  </div>
                </div>
              </div>
            </div> */}
      {/* <!-- Flyout menus --> */}
      {/* <div className="hidden lg:block capitalize p-5  border-b-2 border-gray-200">
              <div className="flex h-full space-x-8 justify-center">
                <span className="hover:underline underline-offset-8 cursor-pointer flex items-center text-sm font-medium text-gray-700 hover:text-black">
                  <Link
                    href={{
                      pathname: "/search",
                      query: { category: "all" },
                    }}
                  >
                    <span>All</span>
                  </Link>
                </span>
                {categories.length > 0 &&
                  categories
                    .filter((cat) => cat.active == true)
                    .map((item) => (
                      <div key={item._id} className="group relative ">
                        <Link
                          className="hidden md:block"
                          href={{
                            pathname: "/search",
                            query: { category: item.slug },
                          }}
                        >
                          <a target="_blank" rel="noopener noreferrer">
                            <span className="hover:underline underline-offset-8 cursor-pointer flex items-center text-sm font-medium text-gray-700 hover:text-black">
                              {item.name}
                            </span>
                          </a>
                        </Link>

                        {item.children.length > 0 ? (
                          <div className="hidden absolute z-30 pt-5  lg:group-hover:block ">
                            <div
                              className=" bg-white shadow "
                              style={{ minWidth: "150px" }}
                            >
                              {item.children.length > 0 ? (
                                <div
                                  className="absolute border-green-400 border-l-4 bg-white shadow-lg lg:group-hover:block"
                                  style={{ minWidth: "150px" }}
                                >
                                  {renderChildrensCategories(item.children)}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div> */}




    </>
  );
};

export default Header;
