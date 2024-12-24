import React from 'react';

const ConnectWithUs = () => {
    return (
        <section className="w-11/12 xl:w-8/12 mx-auto space-y-10 mt-32 flex md:gap-20 my-40 flex-col justify-between items-center lg:flex-row">


        <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-5xl font-bold">
                <span className="text-primary">Connect</span>  with us, drive change  together</h2>
            <p className="w-2/3">Reach out to learn more about our programs, or to share your ideas and support for our mission.</p>

            <div className="flex flex-col md:flex-row gap-10 md:gap-20">
                <div className="space-y-4">
                    <div>

                        <h3 className="text-xl font-medium">Main phone number</h3>
                        <p>1-800-CHARITY (1-800-242-7489)</p>
                    </div>
                    <div>

                        <h3 className="text-xl font-medium">For volunteer posts </h3>
                        <p>Please visit the volunteer posts</p>
                    </div>
                    <div>

                        <h3 className="text-xl font-medium">Find our locations</h3>
                        <p>Search on the map</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>

                        <h3 className="text-xl font-medium">Training & certification</h3>
                        <p>Please visit the training section</p>
                    </div>
                    <div>

                        <h3 className="text-xl font-medium">For volunteer related</h3>
                        <p>Please visit the volunteer section</p>
                    </div>
                    <div>

                        <h3 className="text-xl font-medium">Email address</h3>
                        <p>support@volunforce.org</p>
                    </div>
                </div>
            </div>
        </div>




        <div className=" bg-base-100 md:w-1/2 py-10  shadow-xl">

            <form className="p-10 space-y-6">
                <div className="py-4">
                    <h2 className="text-2xl font-semibold">Let's keep in touch</h2>
                    <p>Let us know who you are and what you're looking for below, and we'll get back to you within 24 hours.</p>
                </div>
                <div className="form-control">

                    <input type="text" placeholder="Name" className="input input-bordered" required />
                </div>
                <div className="form-control">

                    <input type="email" placeholder="Email address" className="input input-bordered" required />
                </div>
                <div className="form-control">

                <textarea className="textarea textarea-bordered resize-4 " rows={4} placeholder="Message"></textarea>

                </div>
                <div className="form-control mt-6">
                    <button className="btn bg-primary hover:bg-secondary text-white">Submit</button>
                </div>
            </form>


        </div>

    </section>
    );
};

export default ConnectWithUs;