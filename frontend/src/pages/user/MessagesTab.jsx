import React, { useState } from "react";
import { FiMail, FiTrash2, FiCheckSquare, FiSquare, FiX } from "react-icons/fi";

const MessageTab = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      subject: "Account Update",
      from: "support@company.com",
      content:
        "Your account details have been successfully updated. If you did not make these changes, please contact us immediately.",
      date: "2025-02-10",
      read: false,
    },
    {
      id: 2,
      subject: "Booking Confirmation",
      from: "noreply@company.com",
      content:
        "Your booking for 'Hotel ABC' has been confirmed. Please find the details attached.",
      date: "2025-02-08",
      read: true,
    },
    {
      id: 3,
      subject: "Your Inquiry Response",
      from: "support@company.com",
      content:
        "We have received your inquiry about booking policies. Please check the attached document for further details.",
      date: "2025-02-05",
      read: true,
    },
  ]);

  const [activeMessage, setActiveMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'read', 'unread'
  const [sortBy, setSortBy] = useState("date"); // 'date', 'subject'

  const handleMessageClick = (message) => {
    setActiveMessage((prevMessage) =>
      prevMessage?.id === message.id ? null : message
    );
    // Mark message as read
    if (!message.read) {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === message.id ? { ...msg, read: true } : msg
        )
      );
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage) {
      setIsSending(true);
      setTimeout(() => {
        alert("Your message has been sent!");
        setNewMessage("");
        setIsSending(false);
      }, 2000);
    } else {
      alert("Please write a message before submitting.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleDeleteMessage = (id) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  };

  const handleMarkAsRead = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
  };

  const handleMarkAsUnread = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => (msg.id === id ? { ...msg, read: false } : msg))
    );
  };

  const filteredMessages = messages
    .filter((message) => {
      if (filter === "unread" && message.read) return false;
      if (filter === "read" && !message.read) return false;
      return message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date) - new Date(a.date); // Sort by date
      }
      if (sortBy === "subject") {
        return a.subject.localeCompare(b.subject); // Sort by subject
      }
      return 0;
    });

  return (
    <div className="message-tab bg-gray-50 p-6 rounded-lg shadow-md w-full mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Messages</h2>

      {/* Floating Button to Compose Message */}
      <button
        onClick={() => setIsComposeOpen(true)}
        className="fixed bottom-10 right-10 bg-gray-600 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition duration-200"
      >
        <FiMail className="h-6 w-6" />
      </button>

      {/* Floating Compose Message Window */}
      {isComposeOpen && (
        <div className="fixed bottom-16 right-10 w-96 bg-white p-6 rounded-lg shadow-lg z-50">
          <button
            onClick={() => setIsComposeOpen(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          >
            <FiX className="h-5 w-5" />
          </button>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Compose Message
          </h3>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-2 focus:ring-gray-600"
              placeholder="Write your message here..."
            />
            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-2 rounded-md flex items-center justify-center hover:bg-gray-700 transition duration-200"
              disabled={isSending}
            >
              {isSending ? (
                <span>Sending...</span>
              ) : (
                <>
                  <FiMail className="mr-2" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Search, Filter, and Sort */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className=" p-2 border border-gray-300 rounded-md shadow-sm text-sm"
          placeholder="Search messages..."
        />
        <div className="flex space-x-3">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm text-sm"
          >
            <option value="all">All Messages</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
          </select>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm text-sm"
          >
            <option value="date">Sort by Date</option>
            <option value="subject">Sort by Subject</option>
          </select>
        </div>
      </div>

      {/* Message List */}
      <div className="message-list mb-4">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Inbox</h3>
        <div className="space-y-3">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              onClick={() => handleMessageClick(message)}
              className={`message-item p-3 cursor-pointer rounded-md border ${
                message.read ? "bg-gray-100" : "bg-gray-50"
              } hover:bg-gray-200 transition-all`}
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-gray-800">
                  {message.subject}
                </p>
                {!message.read && (
                  <span className="text-xs text-red-500 bg-red-100 px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600">From: {message.from}</p>
              <p className="text-xs text-gray-500">{message.date}</p>
              {activeMessage?.id === message.id && (
                <div className="mt-4 text-sm text-gray-700">
                  {message.content}
                </div>
              )}
              <div className="flex items-center space-x-2 mt-2">
                {message.read ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsUnread(message.id);
                    }}
                    className="text-xs text-gray-600 hover:text-gray-800"
                  >
                    <FiSquare className="inline mr-1" /> Mark as Unread
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsRead(message.id);
                    }}
                    className="text-xs text-gray-600 hover:text-gray-800"
                  >
                    <FiCheckSquare className="inline mr-1" /> Mark as Read
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteMessage(message.id);
                  }}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  <FiTrash2 className="inline mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageTab;
