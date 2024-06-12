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
  useEffect(() => {
    if (status === 'loading') {
      // Session data is still loading
      setIsSessionLoaded(false); // Set session loaded state to false
    } else if (status === 'success' && session !== null) {
      // Session data has been successfully loaded and is not null
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
  const router = useRouter();

  const isCategoryPage = router.pathname.startsWith("/search")
  const isCheckoutPage = router.pathname.startsWith("/placeorder")
  const isBlogPage = router.pathname.startsWith("/blog")
  const isAboutUsPage = router.pathname.startsWith("/about-us")
  const isContactUsPage = router.pathname.startsWith("/contact-us")


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

          <header className="container-fluid d-flex flex-row align-items-center justify-content-between  " class={header["container-fluid"]} id={header["header"]}>

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
                className="form-control custom-no-outline flex-grow-1"
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
                  ? "absolute top-10 mt-12  right-30 z-10 bg-white w-[600px]  border-l-4 border-green-400"
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
                <a href="/login" className={header["a"]}>
                  <button className="btn btn-primary mybtn text-white" class={header.mybtn}>
                    LOGIN <FaUser style={{ marginLeft: '5px', color: "white" }} />
                  </button>
                </a>
              )}
            </div>

            {session && session.user && (
              <>
                <div className="d-flex flex-row ">
                  <div className={`d-flex flex-column align-items-center mx-2 cursor-pointer ${header["greyonhover"]}`}>
                    <FaUser className="text-white  " />
                    <div className="" style={{ color: "white", fontSize: "16px", fontWeight: "bold" }}>Profile</div>
                  </div>
                  <div className="d-flex flex-column align-item-center mx-2 cursor-pointer ">
                    <FaHeart className="text-white" />
                    <div className="text-white " style={{ color: "white", fontSize: "16px", fontWeight: "bold" }}>Wishlist</div>
                  </div>
                  <div className="d-flex flex-column align-item-center mx-2 cursor-pointer ">
                    <FaShoppingCart className="text-white" />
                    <button onClick={() => setIsOpen(!isOpen)}>


                      <div className=" text-white " style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="d-flex flex-row align-items-center" style={{ color: "white", fontSize: "16px", fontWeight: "bold" }}>
                          <span>Cart</span>
                          <span>({cartItems.length})</span>
                        </div>

                      </div>

                    </button>
                  </div>
                  <div className="d-flex flex-column align-item-center mx-2">
                    <SignOutConfirmation signOut={signOut} />
                  </div>
                </div>
                {/* <ul className=" d-flex flex-row navbar-nav mx-2 text-white " id={header["pwc"]}>
                  <li className={header["nav-item"]}>
                    <a className={header["nav-link"]} href="/myprofile">
                      <FaUser className="text-white" />
                      <div className="name btnn rounded" style={{ color: "white" }}>Profile</div>
                    </a>
                  </li>
                  <li className={header["nav-item"]}>
                    <a className={header["nav-link"]} href="/wishlist">
                      <FaHeart className="text-white" />
                      <div className="name text-white btnn rounded" style={{}}>Wishlist</div>
                    </a>
                  </li>
                  <li className={header["nav-item"]}>
                    <button onClick={() => setIsOpen(!isOpen)} className={header["nav-link"]}>
                      <FaShoppingCart className="text-white" />

                      <div className="name text-white btnn rounded" style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="d-flex flex-row align-items-center">
                          <span>Cart</span>
                          <span>({cartItems.length})</span>
                        </div>

                      </div>

                    </button>
                  </li>
                  <SignOutConfirmation signOut={signOut} />
                </ul> */}

              </>
            )
            }


          </header >
        </div >
      </div>
      {!isCheckoutPage &&  !isBlogPage && !isAboutUsPage && !isContactUsPage && (
        <div className=" bg-white pt-2 rounded " id={header["navbarNav1"]}>
          <ul className="navbar-nav d-flex flex-row justify-content-around" >
            <li className={header["nav-item"]} >

              <a class="nav-link" href="/search?category=all" >
                <img className={header["cat-img"]} src="/images/logo/ApneeHatti_light.png"></img>
                <div className={header["text"]}> All Products</div>
              </a>
            </li>
            <li className={header["nav-item"]}>

              <a class="nav-link" href="/search?category=Handlooms" >
                <img className={header["cat-img"]} src="/images/pictures/category/1.jpg"></img>
                <div className={header["text"]}> Handlooms</div>
              </a>
            </li>
            <li className={header["nav-item"]}>
              <a class="nav-link" href="/search?category=Skincare-and-Beauty">
                <img className={header["cat-img"]} src="/images/pictures/category/2.jpg"></img>
                <div className={header["text"]}>  Skincare & Beauty</div>

              </a>
            </li>
            <li className={header["nav-item"]}>
              <a class="nav-link" href="/search?category=Handcrafts">
                <img className={header["cat-img"]} src="/images/pictures/category/3.jpeg"></img>
                <div className={header["text"]}> Handcrafts</div>

              </a>
            </li>
            <li className={header["nav-item"]}>
              <a class="nav-link" href="/search?category=Organic-Food-Products">
                <img className={header["cat-img"]} src="/images/pictures/category/4.jpeg"></img>
                <div className={header["text"]}> Organic Food Porducts</div>

              </a>
            </li>
            <li className={header["nav-item"]}>
              <a class="nav-link" href="/search?category=Health-Care">
                <img className={header["cat-img"]} src="/images/pictures/category/5.jpeg"></img>
                <div className={header["text"]}> Health Care</div>
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





    </>
  );
};

export default Header;
