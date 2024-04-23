import React from 'react'
import Image from 'next/image'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


function Testimonials() {

    const openNewWindow = () => {
        // Calculate window size and position
        const width = 600; // Width of the new window
        const height = 500; // Height of the new window
        const left = (window.innerWidth - width) / 2; // Center horizontally
        const top = (window.innerHeight - height) / 2; // Center vertically
    
        // Options for the new window
        const options = `width=${width},height=${height},left=${left},top=${top}`;
    
        // Open new window with specified size and position
        window.open('https://g.page/r/CWqeVis8_uz7EB0/review', 'New Window', options);
      };
    
    
    return (
        <div className="sm:px-2 md:px-2 lg:px-40 py-10 " >
            {/* <div id='t-container' >
            <h3 className="text-center text-2xl font-semibold mb-2">
                Customer Testimonials
            </h3>

            <Carousel autoPlay={true} interval={3000} infiniteLoop={true}>
                <div>

                    <div id='t-component'>
                        <div id='testimonial-img'>
                            <Image src="/images/pictures/profile/1.png"
                                alt="Description of the image"
                                width={100}
                                height={100}
                            />
                            <div>Simran Sahni</div>


                        </div>
                        <div id='opinion'>
                            <div>
                                Apnee Hatti is a gem in Himachal! I'm hooked on their red rice, sea buckthorn juice, honey, muesli, and hair oils. What makes it special is that they source everything locally from across Himachal, supporting the community. Being a regular customer, I've witnessed their commitment to quality and freshness. Their top-notch customer service ensures a delightful shopping experience every time. Cheers to Apnee Hatti!
                            </div>
                            <div class="star-rating">
                                <span class="star" data-value="1">&#9733;</span>
                                <span class="star" data-value="2">&#9733;</span>
                                <span class="star" data-value="3">&#9733;</span>
                                <span class="star" data-value="4">&#9733;</span>
                                <span class="star" data-value="5">&#9733;</span>
                            </div>


                        </div>
                    </div>
                </div>

                <div>

                    <div id='t-component'>
                        <div id='testimonial-img'>
                            <Image src="/images/pictures/profile/2.png"
                                alt="Description of the image"
                                width={100}
                                height={100}
                            />
                            <div>Jatin Sharma</div>


                        </div>
                        <div id='opinion' >

                            Great 💯👍 Online marketplace for products manufactured in Himachal Pradesh. We really love Apneehatti. Thank you apneehatti to deliver the happiness of Himachal. …
                            <div class="star-rating" style={{ norder: "2px solid red" }}>
                                <span class="star" data-value="1">&#9733;</span>
                                <span class="star" data-value="2">&#9733;</span>
                                <span class="star" data-value="3">&#9733;</span>
                                <span class="star" data-value="4">&#9733;</span>
                                <span class="star" data-value="5">&#9733;</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div>
                    <div id='t-component'>
                        <div id='testimonial-img'>
                            <Image src="/images/pictures/profile/3.png"
                                alt="Description of the image"
                                width={100}
                                height={100}
                            />
                            <div>Dhirendra Singh Sengar</div>


                        </div>
                        <div id='opinion'>
                            hey are best in customer experience, delivered things as per the sprint decided. Clients' friendly & optimistic approach, will always be our priority list for developments.
                            <div class="star-rating">
                                <span class="star" data-value="1">&#9733;</span>
                                <span class="star" data-value="2">&#9733;</span>
                                <span class="star" data-value="3">&#9733;</span>
                                <span class="star" data-value="4">&#9733;</span>
                                <span class="star" data-value="5">&#9733;</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <div id='t-component'>
                        <div id='testimonial-img'>
                            <Image src="/images/pictures/profile/4.png"
                                alt="Description of the image"
                                width={100}
                                height={100}
                            />
                            <div>Neetu Singh</div>


                        </div>
                        <div id='opinion'>
                            Very good n appreciating activities by your team and true quality product
                            <div class="star-rating">
                                <span class="star" data-value="1">&#9733;</span>
                                <span class="star" data-value="2">&#9733;</span>
                                <span class="star" data-value="3">&#9733;</span>
                                <span class="star" data-value="4">&#9733;</span>
                                <span class="star" data-value="5">&#9733;</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <div id='t-component'>
                        <div id='testimonial-img'>
                            <Image src="/images/pictures/profile/3.png"
                                alt="Description of the image"
                                width={100}
                                height={100}
                            />
                            <div>Admya Sharma</div>


                        </div>
                        <div id='opinion'>
                            Do reach out to Apnee Hatti for professional establishment of your local business.
                            <div class="star-rating">
                                <span class="star" data-value="1">&#9733;</span>
                                <span class="star" data-value="2">&#9733;</span>
                                <span class="star" data-value="3">&#9733;</span>
                                <span class="star" data-value="4">&#9733;</span>
                                <span class="star" data-value="5">&#9733;</span>
                            </div>
                        </div>

                    </div>
                </div>




            </Carousel>
            
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className='mt-2 mb-10'>
                <button type="button" class="btn btn-outline-success" >
                    <div onClick={openNewWindow}>
                        Give Your Review
                    </div>
                </button>
            </div> */}


            <section class="bg-light rounded">
                <div class="container overflow-hidden">
                    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div class="col">
                            <div class="card border-0 border-bottom border-primary shadow-sm">
                                <div class="card-body p-4 p-md-5">
                                    <figure>
                                        <img class="img-fluid rounded rounded-circle mb-4 border border-5" loading="lazy" src="/images/pictures/profile/1.png" alt="" />
                                        <figcaption>
                                            <div class="bsb-ratings text-warning mb-3" data-bsb-star="5" data-bsb-star-off="0"></div>
                                            <blockquote class="bsb-blockquote-icon mb-4">Nam ultricies, ex lacinia dapibus faucibus, sapien ipsum euismod massa, at aliquet erat turpis quis diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</blockquote>
                                            <h4 class="mb-2">Luna John</h4>
                                            <h5 class="fs-6 text-secondary mb-0">UX Designer</h5>
                                        </figcaption>
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card border-0 border-bottom border-primary shadow-sm">
                                <div class="card-body p-4 p-md-5">
                                    <figure>
                                        <img class="img-fluid rounded rounded-circle mb-4 border border-5" loading="lazy" src="/images/pictures/profile/2.png" alt="" />
                                        <figcaption>
                                            <div class="bsb-ratings text-warning mb-3" data-bsb-star="4" data-bsb-star-off="1"></div>
                                            <blockquote class="bsb-blockquote-icon mb-4">Nam ultricies, ex lacinia dapibus faucibus, sapien ipsum euismod massa, at aliquet erat turpis quis diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</blockquote>
                                            <h4 class="mb-2">Mark Smith</h4>
                                            <h5 class="fs-6 text-secondary mb-0">Marketing Specialist</h5>
                                        </figcaption>
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card border-0 border-bottom border-primary shadow-sm">
                                <div class="card-body p-4 p-md-5">
                                    <figure>
                                        <img class="img-fluid rounded rounded-circle mb-4 border border-5" loading="lazy" src="/images/pictures/profile/3.png" alt="" />
                                        <figcaption>
                                            <div class="bsb-ratings text-warning mb-3" data-bsb-star="5" data-bsb-star-off="0"></div>
                                            <blockquote class="bsb-blockquote-icon mb-4">Nam ultricies, ex lacinia dapibus faucibus, sapien ipsum euismod massa, at aliquet erat turpis quis diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</blockquote>
                                            <h4 class="mb-2">Luke Reeves</h4>
                                            <h5 class="fs-6 text-secondary mb-0">Sales Manager</h5>
                                        </figcaption>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className='my-2'>
                <button type="button" class="btn btn-outline-success mybtn text-white" >
                    <div onClick={openNewWindow}>
                        Give Your Review
                    </div>
                </button>
            </div> 

            </section>

          
        </div>
    )
}

export default Testimonials
