import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [errorMessage, setErrorMessage] = useState('');


  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() || '';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() || '';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() || '';

  // Initialize EmailJS on component mount
//   useEffect(() => {
//     if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY.length > 0) {
//       emailjs.init(EMAILJS_PUBLIC_KEY);
//       // Debug: Log configuration status (only in development)
//       if (import.meta.env.DEV) {
//         console.log('✅ EmailJS initialized');
//       }
//     } else if (import.meta.env.DEV) {
//       console.warn('⚠️ EmailJS Public Key not found. Check your .env file.');
//     }
//   }, [EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if EmailJS is configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setSubmitStatus('error');
      const missing = [];
      if (!EMAILJS_SERVICE_ID) missing.push('VITE_EMAILJS_SERVICE_ID');
      if (!EMAILJS_TEMPLATE_ID) missing.push('VITE_EMAILJS_TEMPLATE_ID');
      if (!EMAILJS_PUBLIC_KEY) missing.push('VITE_EMAILJS_PUBLIC_KEY');
      
      setErrorMessage(`EmailJS not configured. Missing in .env: ${missing.join(', ')}. Please check your .env file and restart the dev server.`);
      console.error('EmailJS Configuration Error:', {
        SERVICE_ID: EMAILJS_SERVICE_ID ? 'Set' : 'Missing',
        TEMPLATE_ID: EMAILJS_TEMPLATE_ID ? 'Set' : 'Missing',
        PUBLIC_KEY: EMAILJS_PUBLIC_KEY ? 'Set' : 'Missing'
      });
      return;
    }
    
    // Form validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Pulkit Khowal', // Your name
        },
        EMAILJS_PUBLIC_KEY
      );

      // Success
      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setErrorMessage('');
      }
    } catch (error) {
      // Detailed error handling
      setSubmitStatus('error');
      console.error('EmailJS Error Details:', {
        error,
        status: error.status,
        text: error.text,
        message: error.message
      });
      
      // Provide helpful error messages based on error type
      if (error.status === 0) {
        setErrorMessage('Network error. Please check your internet connection and try again.');
      } else if (error.text) {
        // EmailJS specific error messages
        if (error.text.includes('Invalid service ID') || error.text.includes('Service not found')) {
          setErrorMessage('Invalid Service ID. Please check VITE_EMAILJS_SERVICE_ID in your .env file.');
        } else if (error.text.includes('Invalid template ID') || error.text.includes('Template not found')) {
          setErrorMessage('Invalid Template ID. Please check VITE_EMAILJS_TEMPLATE_ID in your .env file.');
        } else if (error.text.includes('Invalid public key') || error.text.includes('Unauthorized')) {
          setErrorMessage('Invalid Public Key. Please check VITE_EMAILJS_PUBLIC_KEY in your .env file.');
        } else {
          setErrorMessage(`Error: ${error.text}`);
        }
      } else if (error.message) {
        setErrorMessage(`Error: ${error.message}`);
      } else {
        setErrorMessage('Failed to send message. Please check your EmailJS configuration in .env file and restart the dev server.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: '💻',
      url: 'https://github.com/Vishi2006'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://linkedin.com/in/pulkit-khowal'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: 'https://twitter.com/the_pulkit_2006'
    },
    {
      name: 'Email',
      icon: '✉️',
      url: 'mailto:pulkitkhowal2006@gmail.com'
    }
  ];

  return (
    <div className="font-[Doto] min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        
        {/* Left Side - Contact Form */}
        <div className="w-full lg:w-[60%]">
          <div className="mb-6 sm:mb-8">
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer'>
              Get in touch
            </h1>
            {/* Consistent green underline bar */}
            <div className="h-1 w-96 bg-green-500/70 mt-2"></div>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl font-extrabold uppercase mt-4">
              <span className="text-[#00ff00] font-mono">{'> '}</span>
              Have a project in mind? Any suggestion? Let's connect together!
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-lg sm:text-xl font-extrabold text-[#00ff00] mb-2">
                NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-zinc-900 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#00ff00] focus:outline-none transition-colors duration-200"
                placeholder="Your name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-lg sm:text-xl font-extrabold text-[#00ff00] mb-2">
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-zinc-900 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#00ff00] focus:outline-none transition-colors duration-200"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-lg sm:text-xl font-extrabold text-[#00ff00] mb-2">
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                required
                className="w-full bg-zinc-900 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#00ff00] focus:outline-none transition-colors duration-200 resize-none"
                placeholder="Tell me about your project/idea or any suggestions...."
              />
            </div>

            {/* Error/Success Message */}
            {submitStatus === 'error' && errorMessage && (
              <div className="bg-red-900/50 border-2 border-red-500 rounded-lg p-4 text-red-200 text-sm sm:text-base">
                <p className="font-bold mb-1">Error:</p>
                <p>{errorMessage}</p>
              </div>
            )}
            
            {submitStatus === 'success' && (
              <div className="bg-green-900/50 border-2 border-green-500 rounded-lg p-4 text-green-200 text-sm sm:text-base">
                <p className="font-bold">✓ Message sent successfully! I'll get back to you soon.</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-green-500/70 text-black py-3 sm:py-4 rounded-lg hover:bg-green-600/70 transition-colors duration-200 text-xl sm:text-2xl font-extrabold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                submitStatus === 'success' ? 'bg-green-600' : submitStatus === 'error' ? 'bg-red-600/70' : ''
              }`}
            >
              {isLoading ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>

        {/* Right Side - Social Links */}
        <div className="w-full lg:w-[40%]">
          <div className="mb-6 sm:mb-8">
            <h1 className='mb-3 sm:mb-5 text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer'>
              Connect with me
            </h1>
            {/* Consistent green underline bar */}
            <div className="h-1 w-96 bg-green-500/70 mt-2"></div>
            <p className="text-gray-400 uppercase text-base sm:text-lg md:text-xl font-extrabold mt-4">
              <span className="text-[#00ff00] font-mono">{'> '}</span>
              Find me on these platforms
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-3 sm:space-y-4 font-[Doto]">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 sm:gap-4 bg-zinc-900 border-2 border-gray-700 rounded-lg px-4 sm:px-6 py-3 sm:py-4 hover:border-[#00ff00] hover:bg-gray-800 transition-all duration-200 group"
              >
                <span className="text-2xl sm:text-3xl">{social.icon}</span>
                <span className="text-base sm:text-lg uppercase font-extrabold text-white group-hover:text-[#00ff00] transition-colors duration-200">
                  {social.name}
                </span>
                <span className="ml-auto text-[#00ff00] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  →
                </span>
              </a>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-6 sm:mt-8 font-[Doto] bg-gray-900/50 border-2 border-green-500/30 rounded-lg p-4 sm:p-6 uppercase">
            <p className="text-gray-400 text-lg sm:text-xl font-extrabold">
              <span className="text-[#00ff00]">$ </span>
              response time: <span className="text-white">24 hours</span>
            </p>
            <p className="text-gray-400 text-lg sm:text-xl font-extrabold mt-2">
              <span className="text-[#00ff00]">$ </span>
              availability: <span className="text-white">Open to freelance</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;