'use client';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: 29,
      description: 'Perfect for individuals and small projects',
      features: [
        '3 Services included',
        'Basic support',
        '10 GB storage',
        'Email integration',
        'Monthly billing',
      ],
      highlighted: false,
    },
    {
      name: 'Professional',
      price: 79,
      description: 'Ideal for growing businesses',
      features: [
        'All Starter features',
        'Unlimited services',
        'Priority support',
        '100 GB storage',
        'API access',
        'Custom domain',
        'Monthly or annual billing',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 199,
      description: 'For large-scale operations',
      features: [
        'All Professional features',
        'Dedicated support',
        '1 TB storage',
        'Advanced analytics',
        'Custom integrations',
        'SLA guarantee',
        'Monthly or annual billing',
      ],
      highlighted: false,
    },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">
            Choose the perfect plan for your needs. Always flexible to scale.
          </p>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center gap-4">
            <span className="text-gray-700">Monthly Billing</span>
            <button className="relative inline-flex w-12 h-6 bg-gray-300 rounded-full cursor-pointer">
              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></span>
            </button>
            <span className="text-gray-700">
              Annual Billing <span className="text-green-600 font-semibold">(Save 20%)</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white md:scale-105 md:shadow-xl'
                    : 'bg-white'
                }`}
              >
                {/* Card Header */}
                <div className={`p-8 ${plan.highlighted ? 'bg-blue-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : ''}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className={`p-8 ${plan.highlighted ? 'bg-blue-600' : 'bg-white'}`}>
                  <div className="mb-4">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span className={`text-sm ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                      /month
                    </span>
                  </div>
                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      plan.highlighted
                        ? 'bg-white text-blue-600 hover:bg-blue-50'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Get Started
                  </button>
                </div>

                {/* Features */}
                <div className={`p-8 ${plan.highlighted ? 'bg-blue-600' : 'bg-white'}`}>
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className={`flex items-center gap-3 ${
                          plan.highlighted ? 'text-blue-100' : 'text-gray-700'
                        }`}
                      >
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Can I upgrade my plan anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes will take effect in your next billing cycle.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 30-day money-back guarantee if you are not satisfied with our services.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes, all new customers get a 14-day free trial with full access to all features.',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
