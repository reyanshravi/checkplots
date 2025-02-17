const SidebarButton = ({ Icon, label, onClick, className = "" }) => (
    <button
        onClick={onClick}
        className={`flex items-center px-4 py-3 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300 w-full ${className}`}
      >
        <Icon className="mr-3 text-xl" />
        <span className="text-sm">{label}</span>
      </button>
    
  );
  
  export default SidebarButton; 