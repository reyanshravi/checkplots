import React, { useState } from "react";
import { FiMail, FiChevronDown, FiChevronUp } from "react-icons/fi";

const HelpAndSupportTab = () => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question: "How can I reset my password?",
      answer:
        "To reset your password, go to the login page and click on the 'Forgot Password' link. You will receive a password reset email.",
    },
    {
      question: "How do I cancel my booking?",
      answer:
        "You can cancel your booking from the 'My Orders' section. Cancellation policies may vary depending on the property.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact our support team by sending a message through the form below or by emailing support@company.com.",
    },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setIsSubmitting(true);
      setChatHistory([
        ...chatHistory,
        { sender: "user", text: message },
        {
          sender: "support",
          text: "Thank you! We'll get back to you shortly.",
        },
      ]);
      setMessage("");
      setIsSubmitting(false);
    }
  };

  const toggleFAQ = (index) => {
    setActiveFAQ((prev) => (prev === index ? null : index));
  };

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="help-support-tab bg-gray-50 p-4 rounded-lg shadow-md  mx-auto w-full h-[600px] overflow-y-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Help & Support
      </h2>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 bg-white p-2 rounded-md">
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full bg-transparent text-xs focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section mb-4">
        <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center space-x-2">
          <FiMail className="text-lg text-gray-600" />
          <span>Frequently Asked Questions</span>
        </h3>

        <div className="space-y-2">
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleFAQ(index)}
              >
                <p className="text-sm text-gray-800">{faq.question}</p>
                {activeFAQ === index ? (
                  <FiChevronUp className="text-gray-600" />
                ) : (
                  <FiChevronDown className="text-gray-600" />
                )}
              </div>
              {activeFAQ === index && (
                <p className="text-xs text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Us Form */}
      <div className="contact-form-section mb-4">
        <h3 className="text-md font-semibold text-gray-700 mb-3">
          Send us a message
        </h3>

        <form onSubmit={handleSendMessage} className="space-y-3">
          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="3"
              className="w-full p-2 text-xs border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600"
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-indigo-700 transition duration-200 text-xs"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Sending...</span>
            ) : (
              <>
                <FiMail className="text-sm" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Chat History Simulation */}
      <div className="chat-history mt-4">
        <div className="bg-gray-100 p-2 rounded-md mb-4">
          <p className="text-sm font-semibold text-gray-800 mb-2">
            Chat History
          </p>
          <div className="space-y-2">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender === "user" ? "text-right" : ""
                }`}
              >
                <p
                  className={`text-xs ${
                    message.sender === "user"
                      ? "bg-blue-100 text-blue-600 p-2 rounded-md"
                      : "bg-gray-200 text-gray-700 p-2 rounded-md"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupportTab;
