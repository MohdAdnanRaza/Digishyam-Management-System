import React from "react";
import { Book, Code, Palette, Search, Share2, Trophy } from "lucide-react";

const TrainingPage = () => {
  const courses = [
    {
      title: "Digital Marketing",
      icon: <Share2 className="h-8 w-8 mb-4" />,
      description:
        "Master modern digital marketing strategies including social media, email campaigns, and content marketing.",
      features: [
        "Social Media Marketing",
        "Email Marketing",
        "Content Strategy",
        "Analytics",
      ],
    },
    {
      title: "MERN Stack Development",
      icon: <Code className="h-8 w-8 mb-4" />,
      description:
        "Become a full-stack developer with MongoDB, Express.js, React, and Node.js.",
      features: [
        "Frontend Development",
        "Backend APIs",
        "Database Design",
        "Real Projects",
      ],
    },
    {
      title: "Graphics Designing",
      icon: <Palette className="h-8 w-8 mb-4" />,
      description:
        "Learn professional graphic design using industry-standard tools and techniques.",
      features: [
        "UI/UX Design",
        "Logo Design",
        "Brand Identity",
        "Print Design",
      ],
    },
    {
      title: "SEO Optimization",
      icon: <Search className="h-8 w-8 mb-4" />,
      description:
        "Master the art of Search Engine Optimization to improve website visibility and rankings.",
      features: [
        "Keyword Research",
        "On-page SEO",
        "Technical SEO",
        "Link Building",
      ],
    },
  ];

  return (
    <div className="min-h-screen  bg-gray-50 mt-[247vh] ">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-20 ">
        <div className="container mx-auto px-6 text-center ">
          <h1 className="text-4xl font-bold mb-4">
            Unlock Your Potential with Professional Training
          </h1>
          <p className="text-xl mb-8">
            Master the skills that drive today's digital world
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            <a href="mailto:info@digishyam.com">Get Started</a>
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Our Training Programs?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive training programs are designed to provide
              practical skills and real-world experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <Trophy className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from industry professionals with years of practical
                experience.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <Book className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Hands-on Projects</h3>
              <p className="text-gray-600">
                Build your portfolio with real-world projects and case studies.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <Share2 className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Career Support</h3>
              <p className="text-gray-600">
                Get guidance on job placement and career advancement
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            Our Training Programs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="text-blue-600">{course.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <ul className="space-y-2">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <span className="h-2 w-2 bg-blue-600 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of successful graduates who transformed their careers
            with us.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Enroll Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default TrainingPage;
