import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-left mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            ABOUT Quikee: THE FUTURE OF MOTION
          </h1>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="font-bold text-neutral-900 mb-2">
              ABOUT QUIKEE: YOUR ACCESS TO PREMIUM TECH
            </h3>
            <p className="text-neutral-800 leading-relaxed">
              Quikee operates as a unique agent company, connecting you with
              high-quality technology products from leading manufacturers.
              Unlike traditional retailers, we don't manufacture or directly
              purchase products. Instead, we partner with technology-based
              companies across various sectors, including phone, laptop, and
              electric bike companies, among others.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-neutral-900 mb-2">
              WHY OUR PRICES ARE UNBEATABLE
            </h3>
            <p className="text-neutral-800 leading-relaxed">
              Our exceptionally low prices are a direct result of our innovative
              operational model. We receive products directly from our partner
              companies as test, evaluation, or trial units. These items are
              authentic, fully functional, and free from defects. Since these
              products are not acquired through traditional purchasing channels,
              we can offer them to you at significantly reduced costs, passing
              on the savings directly.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-neutral-900 mb-2">
              OUR COMMITMENT: TRANSPARENCY & VALUE
            </h3>
            <p className="text-neutral-800 leading-relaxed">
              At Quikee, our philosophy is built on transparency and providing
              exceptional value. Our website is designed to be your primary
              source of information, clearly explaining our unique process, what
              we do, and why our products are so affordably priced. We empower
              you to make informed decisions confidently, ensuring a
              straightforward and honest shopping experience. We focus on
              delivering real products with real value, without the sales
              pressure.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-neutral-900 mb-2">QUALITY ASSURED</h3>
            <p className="text-neutral-800 leading-relaxed">
              Every product available through Quikee is a genuine test or
              evaluation unit from reputable tech companies. They are thoroughly
              checked to ensure full functionality and quality, giving you
              access to premium technology at a fraction of the original cost.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-neutral-900 mb-2">
              WAREHOUSE ADDRESS
            </h3>
            <div className="flex flex-col  ">
              <div className="mb-4 ">
                <p className="text-neutral-800">875 Alfalfa Plant Rd</p>
                <p className="text-neutral-800">Courtland, CA 95615</p>
              </div>
              <div className="mb-4 ">
                <p className="text-neutral-800">320, Zengcha Road</p>
                <p className="text-neutral-800">
                  Songzhou Street, Baiyun District
                </p>
                <p className="text-neutral-800">Guangzhou, Guangdong, China</p>
              </div>
              <div>
                <p className="text-neutral-800">1 Changi S Ln</p>
                <p className="text-neutral-800">Singapore 486070</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
