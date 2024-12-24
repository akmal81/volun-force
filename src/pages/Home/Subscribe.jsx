

const Subscribe = () => {
    return (
        <section className="h-[40rem] mx-auto space-y-10 bg-subscribe bg-no-repeat  bg-center bg-cover">
        <div className="w-full h-full flex items-center justify-center backdrop-brightness-50">

            <div className="w-fit space-y-6 px-10 bg-secondary rounded-lg py-10">
                <h2 className="text-5xl text-center text-white font-bold">Say Informed, stay <span className="text-primary">inspired</span> </h2>
                <div>
                    <p className="text-xl  text-center text-white">Subscribe to receive updates on our</p>
                    <p className="text-xl text-center text-white">impactful work, and success stories.</p>
                </div>
                <div
                    className="flex"
                >
                    <input type="text"
                        className="w-full rounded-l-lg px-4 border-none"
                        placeholder="Email"

                    />
                    <button
                        type="button" className="px-8 py-3 font-semibold rounded-r-lg bg-primary hover:bg-secondary dark:text-white"
                    >Subscribe</button>
                </div>

            </div>
        </div>
    </section>
    );
};

export default Subscribe;