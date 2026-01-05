import React from 'react';

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-left mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            SHIPPING POLICY
          </h1>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              EXPRESS SHIPPING
            </h2>
            <ul className="list-disc list-inside text-neutral-800 leading-relaxed space-y-1 ml-4">
              <li>Batteries: 2-4 weeks</li>
              <li>Kits: 2-4 weeks</li>
              <li>Ideal for faster delivery.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              STANDARD SHIPPING
            </h2>
            <ul className="list-disc list-inside text-neutral-800 leading-relaxed space-y-1 ml-4">
              <li>Batteries: 40-70 days</li>
              <li>Kits: 40-70 days</li>
              <li>Accessories: 5-10 business days (Australia only)</li>
              <li>Ideal for cost-effective shipping if you don't mind waiting.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              PRODUCTION TIME
            </h2>
            <ul className="list-disc list-inside text-neutral-800 leading-relaxed space-y-1 ml-4">
              <li>Batteries & Kits: 5-10 business days</li>
              <li>Accessories: 1-3 business days</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              SPLIT SHIPMENTS
            </h2>
            <p className="text-neutral-800 leading-relaxed">
              Motor kits and batteries are shipped separately due to packaging and carrier restrictions.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              DELAYS
            </h2>
            <p className="text-neutral-800 leading-relaxed">
              * 2Fast E-Bikes is not responsible for shipping delays once orders have been dispatched.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              MISSED DELIVERIES
            </h2>
            <p className="text-neutral-800 leading-relaxed">
              Once an order has been dispatched, customers receive full tracking details and the shipping company is provided with the customer's phone number for delivery contact. If the shipping company states or notification was not received, a redelivery is necessary.
            </p>
            <p className="text-neutral-800 leading-relaxed mt-4">
              Customers are responsible for any charges for redelivery or rerouting. 2Fast E-Bikes is not responsible for deliveries that fail or that follow no delivery arrangements and must be handled directly with the shipping company by the customer. 2Fast E-Bikes is not responsible for any incorrect shipping information provided at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
