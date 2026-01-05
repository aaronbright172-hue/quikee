import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">About Us</h1>
          <p className="text-lg text-neutral-600">Learn more about our mission and model.</p>
        </div>

        <div className="mt-12 prose prose-lg mx-auto text-neutral-800">
          <p>
            Welcome to 2FAST TECH. We are an agent company that partners with leading technology firms to bring you their test and evaluation products.
          </p>
          <p>
            Our unique model allows us to offer premium, fully functional tech products at prices significantly lower than traditional retail. We believe in transparency and providing our customers with the best possible value.
          </p>
          <h2>Our Mission</h2>
          <p>
            Our mission is to make high-end technology accessible to everyone. We are committed to providing a transparent and trustworthy platform where customers can purchase quality products with confidence.
          </p>
          <h2>How It Works</h2>
          <p>
            We receive test and evaluation units directly from our technology partners. These products are real, working, and have nothing wrong with them. Because we don't purchase them through traditional retail channels, we can pass the savings directly on to you.
          </p>
        </div>
      </div>
    </div>
  );
}
