import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  
  const cards = [
    {
      id: 'metaphor-classifier',
      title: 'Metaphor Classifier',
      description: 'Analyze Tamil text to identify metaphorical expressions with AI',
      icon: '🎭',
      color: 'from-orange-400 to-amber-500',
      route: '/metaphor-classifier',
      features: ['Detect metaphors in text', 'Classification confidence scores', 'Visual analysis']
    },
    {
      id: 'lyric-generator',
      title: 'Lyric Generator',
      description: 'Generate beautiful Tamil lyrics based on themes and emotions',
      icon: '🎵',
      color: 'from-blue-400 to-indigo-500',
      route: '/lyric-generator',
      features: ['Theme-based generation', 'Continue existing lyrics', 'Multiple variations']
    },
    {
      id: 'metaphor-creator',
      title: 'Metaphor Creator',
      description: 'Create custom metaphors by combining source and target concepts',
      icon: '✨',
      color: 'from-purple-400 to-pink-500',
      route: '/metaphor-creator',
      features: ['Custom metaphor creation', 'Source & target mapping', 'Multiple style options']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <header className="pt-16 pb-10 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-600 mb-4">
          Tamil Language AI Tools
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore the richness of Tamil language through our AI-powered tools for metaphor analysis,
          lyric generation, and creative writing.
        </p>
      </header>

      {/* Cards Section */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => navigate(card.route)}
            >
              <div className={`bg-gradient-to-r ${card.color} h-2`}></div>
              <div className="p-8">
                <div className="text-5xl mb-5">{card.icon}</div>
                <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
                <p className="text-gray-600 mb-6">{card.description}</p>
                
                <div className="space-y-2">
                  {card.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.color} mr-2`}></div>
                      <span className="text-sm text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button 
                  className={`mt-8 px-6 py-2 rounded-lg bg-gradient-to-r ${card.color} text-white font-medium hover:opacity-90 transition-opacity`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm border-t border-gray-200">
        <p>Tamil AI Models &copy; 2025 | Created by Vinushaanth</p>
      </footer>
    </div>
  );
}
