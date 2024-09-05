function toggleMobileMenu(){
	document.getElementById("menu").classList.toggle("active");
}

window.onscroll = function() {
    var header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = "rgba(255, 255, 255, 0.8)"; // Slightly transparent white
        header.style.backdropFilter = "blur(10px)"; // Blur effect for dynamic island look
        header.style.padding = "0px 0px"; // Adjust padding to make it more compact on scroll
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"; // Subtle shadow
    } else {
        header.style.backgroundColor = "transparent"; // Reset background
        header.style.padding = "0px 0"; // Reset padding
        header.style.boxShadow = "none"; // Remove shadow
    }
};


