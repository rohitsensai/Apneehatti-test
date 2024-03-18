import Link from "next/link";

const Menu = ({ categories }) => {
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

  return (
    <>
      <div className="hidden lg:ml-8 lg:block capitalize ">
        <div className="flex h-full space-x-8">
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
                    <span className="hover:underline underline-offset-8 cursor-pointer flex items-center text-sm font-medium text-gray-700 hover:text-black">
                      {item.name}
                    </span>
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
    </>
  );
};

export default Menu;
