const ProductRating = () => {
    return (
      <div className="p-5 max-w-6xl mx-auto  min-h-[200px]">
        {/* Review section */}
        <div>
          <h1 className="text-xl font-medium">
            <span className="border-b-4 inline-block w-48 pb-1 border-green-400">
              See Reviews{" "}
            </span>
            <span className="float-right text-sm font-normal text-gray-400">
              Total Review : {reviews.length}
            </span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 mb-4 mt-10">
            <div className="p-2 md:border-r-2 text-center ">
              <h1 className="font-medium">Total Reviews</h1>
              <h1 className="text-2xl font-extrabold ">{reviews.length}</h1>
            </div>
            <div className="p-2 md:border-r-2 flex items-center flex-col">
              <h1 className="font-medium">Average Rating</h1>
              <h1 className=" font-extrabold mt-1">
                <Rating className="" size={"md"}>
                  <p className="text-2xl mr-1">
                    {parseInt(
                      reviews.length > 0 ? calculateAverageRating(reviews) : 0
                    )}
                  </p>
                  {Array.from({ length: 5 }, (elem, index) => {
                    return (
                      <Rating.Star
                        key={index}
                        filled={
                          calculateAverageRating(reviews) > index ? true : false
                        }
                      />
                    );
                  })}
                </Rating>
              </h1>
            </div>
            <div className="p-2 md:border-r-2 flex items-center flex-col">
              <div className="leading-5">
                {reviews &&
                reviews.length > 0 &&
                reviews.filter(
                  (rev) => rev.author.user_id == (session && session.user.id)
                ).length > 0 ? (
                  <button
                    onClick={() => setReviewEditModalOpen(!reviewEditModalOpen)}
                    className="px-10 py-2  uppercase transition-all duration-300 hover:bg-black hover:text-white text-sm font-bold w-full mt-2 border-2 border-black"
                  >
                    Edit Review
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      session && session.user
                        ? setReviewModalOpen(!reviewModalOpen)
                        : router.push("/login");
                    }}
                    className=" px-10 py-2  uppercase transition-all duration-300 hover:bg-black hover:text-white text-sm font-bold w-full mt-2 border-2 border-black"
                  >
                    Write Review
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="md:p-5">
            {reviews?.length > 0 &&
              reviews.map((rev, index) => (
                <div className="border-b py-4" key={rev._id}>
                  <div className="flex text-md justify-between items-center gap-x-4">
                    <div className="flex items-center gap-x-2">
                      <div className="bg-green-400 text-white w-8 h-8 font-medium capitalize flex justify-center items-center rounded-full">
                        {rev.author.name.slice(0, 1)}
                      </div>
                      <h5 className="font-medium capitalize">
                        {rev.author.name}
                      </h5>
                    </div>
                    <div className="flex gap-x-3">
                      <Rating size={"sm"}>
                        {Array.from({ length: 5 }, (elem, index) => {
                          return (
                            <div key={index}>
                              <Rating.Star
                                filled={rev.rating > index ? true : false}
                              />
                            </div>
                          );
                        })}
                      </Rating>
                      <div className="flex gap-x-3 text-gray-600 items-center">
                        <div
                          className={`flex items-center cursor-pointer gap-x-1 ${
                            rev.like_by_users.filter(
                              (user) => user == (session && session.user.id)
                            ).length > 0
                              ? "text-green-400"
                              : ""
                          }`}
                          onClick={() => {
                            setThumbsDown(false);
                            setThumbsUp(true);
                            reviewLike(rev._id, true, rev.product_id);
                          }}
                        >
                          <FaRegThumbsUp />
                          <h1 className="text-sm">{rev.number_of_likes}</h1>
                        </div>
                        <div
                          className={`flex items-center cursor-pointer gap-x-1 ${
                            rev.dislike_by_users.filter(
                              (user) => user == session.user.id
                            ).length > 0
                              ? "text-red-400"
                              : ""
                          }`}
                          onClick={() => {
                            setThumbsDown(true);
                            setThumbsUp(false);
                            reviewLike(rev._id, false, rev.product_id);
                          }}
                        >
                          <FaRegThumbsDown />
                          <h1 className="text-sm">{rev.number_of_dislikes}</h1>
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 md:py-1 pl-10 md:pl-8 text-justify">
                    {rev.review}
                  </p>
                  <div className="" align="right">
                    <h5 className="text-sm text-gray-400 p-2">
                      {new Date().toLocaleString()}
                    </h5>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductRating;
  