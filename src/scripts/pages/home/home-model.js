// Model untuk Homepage (MVP Pattern)

export default class HomeModel {
  getHeroSection() {
    return {
      title: 'Learn Sign Language the Modern Way',
      description:
        'Master sign language through interactive lessons, practice sessions, and a comprehensive dictionary. Perfect for beginners and advanced learners.',
      cta: [
        { text: 'Start Learning', link: '#' },
        { text: 'Watch Demo', link: '#' },
      ],
    };
  }

  getFeatures() {
    return [
      {
        icon: '🎥',
        title: 'Interactive Learning',
        description:
          'Learn through HD video lessons with real-time feedback and practice sessions.',
      },
      {
        icon: '📊',
        title: 'Track Progress',
        description:
          'Monitor your learning journey with detailed progress tracking and analytics.',
      },
      {
        icon: '📚',
        title: 'Rich Dictionary',
        description:
          'Access thousands of sign language terms with detailed explanations and examples.',
      },
    ];
  }

  getStats() {
    return [
      { value: '50K+', label: 'Active Learners' },
      { value: '1000+', label: 'Video Lessons' },
      { value: '5000+', label: 'Dictionary Terms' },
      { value: '4.9/5', label: 'User Rating' },
    ];
  }

  getTestimonials() {
    return [
      {
        name: 'Sarah Johnson',
        role: 'Student',
        text: 'e-Syarat made learning sign language fun and accessible. The interactive lessons and practice sessions are incredibly helpful.',
      },
      {
        name: 'Michael Chen',
        role: 'Teacher',
        text: "As an educator, I find e-Syarat's comprehensive dictionary and lesson plans invaluable for my students.",
      },
      {
        name: 'Emma Rodriguez',
        role: 'Parent',
        text: "The progress tracking feature helps me monitor my child's learning journey. It's been a great investment.",
      },
    ];
  }
}
