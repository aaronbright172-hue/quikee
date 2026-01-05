import React from 'react';

export default function FAQPage() {
  const faqs = [
    {
      question: 'WHAT KIND OF PRODUCTS DO YOU SELL?',
      answer:
        'We specialize in a range of high-performance tech products, including electric bikes and various related accessories designed for optimal performance and user experience.',
    },
    {
      question: 'ARE YOUR PRODUCTS NEW OR REFURBISHED?',
      answer:
        'All our products are brand new unless explicitly stated otherwise. We source directly from manufacturers to ensure quality and authenticity for every item sold.',
    },
    {
      question: 'WHAT IS YOUR SHIPPING POLICY AND DELIVERY TIME?',
      answer:
        'Our shipping policy varies by product and destination. Generally, express shipping takes 2-4 weeks, standard 40-70 days, and production time is usually 5-10 business days.',
    },
    {
      question: 'DO YOU OFFER INTERNATIONAL SHIPPING?',
      answer:
        'Yes, we ship to a wide range of international countries. Shipping costs and delivery times will be calculated at checkout based on your location and chosen shipping method.',
    },
    {
      question: 'WHAT IS YOUR RETURN AND WARRANTY POLICY?',
      answer:
        'We offer a comprehensive return policy and manufacturer\'s warranty on all eligible products. Specific details can be found on our dedicated Return Policy and Warranty pages.',
    },
    {
      question: 'HOW CAN I TRACK MY ORDER?',
      answer:
        'Once your order is shipped, you will receive a tracking number via email. You can use this number to monitor the status and estimated delivery of your package online.',
    },
    {
      question: 'WHAT PAYMENT METHODS DO YOU ACCEPT?',
      answer:
        'We accept a variety of secure payment methods, including major credit cards, PayPal, and other digital payment options, ensuring a smooth and safe checkout process.',
    },
    {
      question: 'DO YOU PROVIDE CUSTOMER SUPPORT?',
      answer:
        'Absolutely! Our dedicated customer support team is available to assist you with any questions, concerns, or issues you may encounter with our products or services.',
    },
    {
      question: 'CAN I CHANGE OR CANCEL MY ORDER AFTER IT\'S PLACED?',
      answer:
        'Order modifications or cancellations are possible within a limited timeframe after placement. Please contact our support team immediately for assistance with such requests.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-left mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h1>
        </div>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="font-bold text-neutral-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-neutral-800 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}