import React from 'react';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-left mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            REFUND & WARRANTY POLICY
          </h1>
          <p className="text-neutral-800 leading-relaxed">
            We strive to deliver high-quality e-bike products designed for performance, safety, and reliability. Please review this policy carefully before placing an order.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              REFUNDS & RETURNS
            </h2>
            <p className="text-neutral-800 leading-relaxed">
              We do not offer refunds or returns for change of mind, change of circumstances, incorrect selection, or buyer error. It is important to carefully read product descriptions and specifications before you make a purchase to ensure you have the correct item.
            </p>
            <p className="text-neutral-800 leading-relaxed mt-4">
              Once an order has entered production or been shipped, it cannot be cancelled or refunded.
              If an order has not entered production or been shipped, it can be cancelled.
            </p>
            <p className="text-neutral-800 leading-relaxed mt-4">
              If a pre-ordered product is over-purchased or shipped, we will do our best to assist with adjustments where possible.
              Order cancellation fees may apply.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              WARRANTY COVERAGE
            </h2>
            <p className="text-neutral-800 leading-relaxed">
              While we do not offer refunds for change of mind, we stand by the quality of our products and provide warranty coverage for manufacturing faults only.
            </p>
            <ul className="list-disc list-inside text-neutral-800 leading-relaxed space-y-1 ml-4 mt-4">
              <li>Battery: 12 months</li>
              <li>Motor: 12 months</li>
              <li>Other e-bike parts: 6 months</li>
            </ul>
            <p className="text-neutral-800 leading-relaxed mt-4">
              Warranty coverage applies only if the product has been professionally installed by a qualified e-bike technician or licensed auto electrician.
              Proof of professional installation, such as a technician's invoice or service receipt, will be required to make a warranty claim.
              Damage caused by incorrect installation, wiring, or modification voids the warranty.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              DIY INSTALLATION NOTICE
            </h2>
            <p className="text-neutral-800 leading-relaxed">
              DIY conversion kits and batteries are DIY products, allowing riders to build and customize their own electric bikes. We understand that both experienced and novice users may undertake these projects for fun or learning. However, these are complex electrical systems, and incorrect installation can easily lead to damage or faults.
            </p>
            <p className="text-neutral-800 leading-relaxed mt-4">
              By purchasing and installing our products yourself, you acknowledge the inherent risks. Any damage caused by incorrect installation, incorrectly connected, modified, or damaged during setup, the issue will not be considered a manufacturing fault and will not be covered under warranty.
            </p>
            <p className="text-neutral-800 leading-relaxed mt-4">
              We recommend all installations be carried out by a qualified e-bike technician, electrician, or experienced mechanic to ensure safe operation and to maintain warranty eligibility.
            </p>
            <p className="text-neutral-800 leading-relaxed mt-4">
              *Please read our Terms and Conditions regarding battery fitment before purchasing*
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              WHAT'S NOT COVERED
            </h2>
            <p className="text-neutral-800 leading-relaxed">
              Warranty claims will not be accepted if the fault is caused by:
            </p>
            <ul className="list-disc list-inside text-neutral-800 leading-relaxed space-y-1 ml-4 mt-4">
              <li>Improper or unprofessional installation</li>
              <li>Incorrect use or negligence by the user</li>
              <li>Modified connectors or cut cables</li>
              <li>Damage due to impacts, accidents, or heavy rain</li>
              <li>Burnt components, melted wires, or short circuits</li>
              <li>Opening or attempting to repair/modify the product</li>
              <li>Misuse, overloading, or negligence</li>
              <li>Incorrect voltage being applied to controllers</li>
              <li>Physical damage, impacts, crashes, failure to remove bottle cage holder bolts</li>
              <li>Natural wear and tear or normal aging of components</li>
            </ul>
            <p className="text-neutral-800 leading-relaxed mt-4">
              Important: It is the buyer's responsibility to confirm compatibility and specifications before installation. Refunds or warranty claims will not be issued for issues caused by user error or improper setup.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              FAULTY PRODUCT RETURNS
            </h2>
            <p className="text-neutral-800 leading-relaxed">
              If you believe your product is faulty under warranty:
            </p>
            <ul className="list-disc list-inside text-neutral-800 leading-relaxed space-y-1 ml-4 mt-4">
              <li>1. Report the fault within 72 hours of discovering the issue.</li>
              <li>2. Provide your order number, a description of the problem, and clear photos/videos showing the fault.</li>
              <li>3. If determined to be a manufacturing defect, we will provide a return authorization and cover related shipping costs.</li>
              <li>4. Once approved, we will provide return instructions or arrange replacement parts.</li>
            </ul>
            <p className="text-neutral-800 leading-relaxed mt-4">
              Customers are responsible for return shipping costs unless a confirmed manufacturing fault is found.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-neutral-900 mb-2">
              PROCESSING TIME
            </h2>
            <p className="text-neutral-800 leading-relaxed">
              If a replacement or repair is approved, please allow up to 10 business days for processing.
              Bank or courier delays may extend this time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
