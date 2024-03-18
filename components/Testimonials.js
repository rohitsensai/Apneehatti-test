import React from 'react'
import Image from 'next/image'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function Testimonials() {
    return (
        <div id='t-container'>
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
    )
}

export default Testimonials
