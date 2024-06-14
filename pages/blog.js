import React from 'react';
import Image from 'next/image'; // If you're using Next.js for optimized images

const BlogLayout = () => {
    return (
        <div className='text-4xl text-center'>
           
        <div className='border  mx-4 d-flex flex-wrap justify-content-between p-2'>
            <div className='min-h-[500px]  border flex-grow-1 min-w-[350px]'>
            <div className="bg-image text-white" style={{ backgroundImage: `url('/images/blogs/4.png')`, height: '500px', backgroundSize: 'cover', backgroundPosition: 'center' }}>Blog</div>


            </div>
            <div className='min-h-[500px]  border flex-grow-1 '>
                <div className='min-h-[250px] border min-w-[350px]'>
                <div className="bg-image" style={{ backgroundImage: `url('/images/blogs/1.png')`, height: '250px', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                </div >
                <div className='min-h-[250px] border  d-flex flex-wrap p-2 justify-content-between'>
                    <div className='border h-[250px] flex-grow-1 min-w-[350px]'>
                    <div className="bg-image" style={{ backgroundImage: `url('/images/blogs/2.png')`, height: '250px', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                
                    </div>
                    <div className='border h-[250px] flex-grow-1 min-w-[350px]'> 
                    <div className="bg-image text-white" style={{ backgroundImage: `url('/images/blogs/3.jpg')`, height: '250px', backgroundSize: 'cover' }}>Blog </div>

                    </div>
                </div>
            </div>
            <div className="min-h-[500px] border flex-grow-1 min-w-[350px]">
            <div className="bg-image" style={{ backgroundImage: `url('/images/blogs/5.png')`, height: '500px', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

            </div>

        </div>
        </div>
    );
};

export default BlogLayout;
