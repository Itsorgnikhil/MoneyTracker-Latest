

const FloatingLink = () => {
  // ===== 🎨 CUSTOMIZE YOUR LINK HERE =====
  
  const config = {
    // Your custom text
    text: "Made  by  NIKHIL",
    
    // Link destination - CHANGE THIS TO YOUR DESIRED LINK:
    link: "https://www.linkedin.com/in/nikhil-kumawat-6859a0296/",           // Your portfolio website
    // link: "https://github.com/nikhil",        // Your GitHub
    // link: "https://linkedin.com/in/nikhil",   // Your LinkedIn
    // link: "mailto:nikhil@example.com",        // Your email
    // link: "/about",                           // About page
    
    // Icon (optional - set to null to remove)
   
    // icon: null,  // Uncomment to remove icon
    
    // Position
    position: "bottom-6 right-6",
    
    // Styling - Choose your preferred style below:
    
    // Style 1: Elegant Black (Professional)
    // backgroundColor: "bg-black",
    // hoverColor: "hover:bg-gray-800",
    // textColor: "text-white",
    
    // Style 2: Purple Theme (matches your app)
    // backgroundColor: "bg-purple-600",
    // hoverColor: "hover:bg-purple-700",
    // textColor: "text-white",
    
    // Style 3: Gradient (Modern & Eye-catching)
    backgroundColor: "bg-gradient-to-r from-purple-600 to-blue-600",
    hoverColor: "hover:from-purple-700 hover:to-blue-700",
    textColor: "text-white",
    
    // Style 4: White with Border (Minimalist)
    // backgroundColor: "bg-white border-2 border-gray-300",
    // hoverColor: "hover:bg-gray-50 hover:border-purple-600",
    // textColor: "text-gray-900",
    
    // Style 5: Glass Effect (Ultra Modern)
    // backgroundColor: "bg-white/20 backdrop-blur-lg border border-white/30",
    // hoverColor: "hover:bg-white/30",
    // textColor: "text-gray-900",
    
    // Animation
    animated: false,  // Set to true for pulse effect
  };
  
  // ===== CLICK HANDLER =====
  const handleClick = () => {
    if (config.link.startsWith("http") || 
        config.link.startsWith("mailto:") || 
        config.link.startsWith("tel:")) {
      // External link - open in new tab
      window.open(config.link, "_blank", "noopener,noreferrer");
    } else {
      // Internal route
      window.location.href = config.link;
    }
  };

  return (
    <button
      onClick={handleClick}
className={`
  fixed ${config.position} z-50
  ${config.backgroundColor} ${config.hoverColor} ${config.textColor}
  px-5 py-2.5 rounded-full shadow-lg
  font-bold text-xs uppercase tracking-widest
  flex items-center gap-2
  hover:scale-110 hover:rotate-2 hover:shadow-purple-500/50
  transition-all duration-300
   hover:animate-none
`}
      aria-label={config.text}
      title={config.text}
    >
      <span>{config.text}</span>
      {config.icon && config.icon}
    </button>
  );
};

export default FloatingLink;


// ===== 🎨 ALTERNATIVE STYLES - Just copy the config section you like =====

// ===== Style A: Elegant Professional =====
/*
text: "Made by NIKHIL",
link: "https://yourportfolio.com",
icon: <ExternalLink size={16} />,
backgroundColor: "bg-black",
hoverColor: "hover:bg-gray-800",
textColor: "text-white",
position: "bottom-6 right-6",
animated: false,
*/

// ===== Style B: Purple Brand Color =====
/*
text: "Made by NIKHIL",
link: "https://yourportfolio.com",
icon: <ExternalLink size={16} />,
backgroundColor: "bg-purple-600",
hoverColor: "hover:bg-purple-700",
textColor: "text-white",
position: "bottom-6 right-6",
animated: false,
*/

// ===== Style C: Gradient Modern =====
/*
text: "Made by NIKHIL",
link: "https://yourportfolio.com",
icon: <ExternalLink size={16} />,
backgroundColor: "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600",
hoverColor: "hover:from-purple-700 hover:via-pink-700 hover:to-blue-700",
textColor: "text-white",
position: "bottom-6 right-6",
animated: false,
*/

// ===== Style D: Minimal White =====
/*
text: "Made by NIKHIL",
link: "https://yourportfolio.com",
icon: <ExternalLink size={16} />,
backgroundColor: "bg-white border-2 border-gray-200",
hoverColor: "hover:bg-gray-50 hover:border-purple-500",
textColor: "text-gray-900",
position: "bottom-6 right-6",
animated: false,
*/

// ===== Style E: Glass Morphism =====
/*
text: "Made by NIKHIL",
link: "https://yourportfolio.com",
icon: <ExternalLink size={16} />,
backgroundColor: "bg-white/10 backdrop-blur-md border border-white/20",
hoverColor: "hover:bg-white/20",
textColor: "text-gray-900",
position: "bottom-6 right-6",
animated: false,
*/

// ===== Style F: Bottom Left Alternative =====
/*
text: "Made by NIKHIL",
link: "https://yourportfolio.com",
icon: null,
backgroundColor: "bg-black",
hoverColor: "hover:bg-gray-800",
textColor: "text-white",
position: "bottom-6 left-6",
animated: false,
*/