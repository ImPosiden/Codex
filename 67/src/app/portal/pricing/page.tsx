'use client';

export default function Pricing() {
  const plans = [
    {
      name: 'Minor repair',
      price: '6 - 6.7',
      description: 'Quick fix for small issues like leaks, cracks, or loose wiring without major replacement.',
      features: [
        'Fast service turnaround',
        'No major dismantling',
        'Low cost solution',
        'Performed by certified staff',
        'Suitable for small, non-structural issues',
      ],
      highlighted: false,
    },
    {
      name: 'Major repair',
      price: '60 - 67',
      description: 'Comprehensive repair involving replacement or structural work to fix serious or recurring issues.',
      features: [
        'In-depth inspection',
        'Material replacement involved',
        'Skilled technician required',
        'Longer repair duration',
        'Suitable for structural or high-risk issues',
      ],
      highlighted: true,
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="group relative rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl bg-blue-600 text-white cursor-pointer"
              >
                {/* Hover Popup Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                  Click to select {plan.name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                </div>

                {/* Card Header */}
                <div className="p-8 bg-blue-700">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-blue-100">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="px-8 pt-6 pb-2 bg-blue-600">
                  <div>
                    <span className="text-4xl font-bold">${plan.price}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="px-8 pt-2 pb-8 bg-blue-600">
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-blue-100"
                      >
                        <svg
                          className="w-5 h-5 text-green-400"
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
