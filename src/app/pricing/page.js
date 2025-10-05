'use client'
import React, { useState } from 'react';
import { CheckCircle, Zap, Users, Star } from 'lucide-react';

// PricingCard component for each tier
const PricingCard = ({ plan, billingCycle, isPopular }) => {
  const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;

  return (
    <div className={`relative flex flex-col p-8 rounded-2xl border transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl ${isPopular ? 'bg-white border-2 border-amber-400 shadow-lg' : 'bg-white border-zinc-200 shadow-md'}`}>
      {isPopular && (
        <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
          <span className="bg-amber-400 text-black text-xs font-semibold px-4 py-1 rounded-full uppercase flex items-center gap-1">
            <Star size={14} className="fill-current" />
            Most Popular
          </span>
        </div>
      )}
      
      <div className="flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <plan.icon className={`w-8 h-8 ${isPopular ? plan.popularColor : plan.color}`} />
          <h3 className={`text-2xl font-bold text-zinc-900`}>{plan.name}</h3>
        </div>
        <p className={`text-zinc-600 mb-6 h-12`}>{plan.description}</p>
        
        <div className="mb-8">
          <span className={`text-5xl font-extrabold text-zinc-900`}>${price}</span>
          <span className={`text-zinc-500`}>/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
        </div>

        <ul className="space-y-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <span className={'text-zinc-700'}>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className={`w-full mt-10 py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${isPopular ? 'bg-amber-400 text-black hover:bg-amber-500' : 'bg-zinc-900 text-white hover:bg-zinc-800'}`}>
        Choose Plan
      </button>
    </div>
  );
};


// Main Pricing Page Component
export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const pricingPlans = [
    {
      name: 'Starter',
      icon: Zap,
      color: 'text-zinc-900',
      popularColor: 'text-amber-300',
      price: { monthly: 29, yearly: 290 },
      description: 'Perfect for individuals starting their mentorship journey.',
      features: [
        'Match with up to 3 mentors',
        'Basic profile customization',
        'Community forum access',
        'Email support',
      ],
    },
    {
      name: 'Pro',
      icon: Star,
      color: 'text-zinc-900',
      popularColor: 'text-amber-300',
      price: { monthly: 49, yearly: 490 },
      description: 'For professionals seeking to accelerate their career growth.',
      features: [
        'Unlimited mentor matches',
        'Advanced profile analytics',
        'Priority matching algorithm',
        'Direct messaging with mentors',
        'Priority support',
      ],
      isPopular: true,
    },
    {
      name: 'Teams',
      icon: Users,
      color: 'text-zinc-900',
      popularColor: 'text-amber-300',
      price: { monthly: 99, yearly: 990 },
      description: 'Empower your entire team with dedicated mentorship programs.',
      features: [
        'Up to 10 team members',
        'Team progress tracking',
        'Dedicated account manager',
        'Custom onboarding & workshops',
        'Enterprise-grade security',
      ],
    },
  ];

  return (
    <main className="bg-amber-100 min-h-screen text-zinc-900 font-sans p-8">
      <div className="container mx-auto max-w-6xl pt-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Find Your Budget Fit
          </h1>
          <p className="text-lg md:text-xl text-zinc-700 max-w-2xl mx-auto">
            Unlock your potential with our flexible plans. Choose the one that fits your growth ambitions.
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <span className={`font-medium ${billingCycle === 'monthly' ? 'text-zinc-900' : 'text-zinc-500'}`}>
            Monthly
          </span>
          <label htmlFor="billing-toggle" className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              id="billing-toggle" 
              className="sr-only peer"
              checked={billingCycle === 'yearly'}
              onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            />
            <div className="w-14 h-8 bg-zinc-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-zinc-900"></div>
          </label>
          <span className={`font-medium ${billingCycle === 'yearly' ? 'text-zinc-900' : 'text-zinc-500'}`}>
            Yearly
          </span>
          <span className="bg-zinc-900/10 text-zinc-900 text-xs font-semibold ml-2 px-3 py-1 rounded-full">
            Save 20%
          </span>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} billingCycle={billingCycle} isPopular={!!plan.isPopular} />
          ))}
        </div>
      </div>
    </main>
  );
}