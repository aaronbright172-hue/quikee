import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQPage() {
  const faqs = [
    {
      question: 'What kind of products do you sell?',
      answer:
        'We sell test and evaluation units from major technology companies. These are real, fully functional products that are offered at a lower price because they are not part of the standard retail inventory.',
    },
    {
      question: 'Are the products new?',
      answer:
        'The products are in new or like-new condition. They are typically used for demonstrations, testing, or as evaluation units by our partners. They are thoroughly inspected to ensure they are fully functional.',
    },
    {
      question: 'Why are your prices so low?',
      answer:
        'Our prices are low because we source our products directly from technology partners as test or evaluation units. This allows us to avoid the traditional retail markup and pass the savings directly to our customers.',
    },
    {
      question: 'Do you offer a warranty?',
      answer:
        'Yes, all our products come with a 30-day warranty against defects. If you experience any issues with your product, please contact our customer support team.',
    },
    {
      question: 'What is your return policy?',
      answer:
        'We offer a 14-day return policy for all our products. If you are not satisfied with your purchase, you can return it for a full refund within 14 days of receiving it.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-neutral-600">
            Find answers to common questions below.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-neutral-800">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
