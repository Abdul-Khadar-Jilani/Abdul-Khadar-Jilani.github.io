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
document.addEventListener('DOMContentLoaded', function() {
document.getElementById('ask-button').addEventListener('click', async function() {
    const inputElement = document.getElementById('ask-input');
    const chatHistoryElement = document.getElementById('chat-history');
    const question = inputElement.value.trim();
  
    if (question === '') {
      return;
    }
  
    // Display user's question
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('chat-message', 'user');
    userMessageElement.textContent = question;
    chatHistoryElement.appendChild(userMessageElement);
  
    // Clear the input field
    inputElement.value = '';
  
    const resumeText = `
  Name: Abdul Khadar Jilani
  
  Contact Information:
  - Email: jilaniabdulgec@gmail.com
  - Phone: 7416559466
  
  Summary:
  A passionate AI and Data Science graduate with a strong foundation in Python, web development, and machine learning.
  
  Education:
  - B.Tech in Artificial Intelligence and Data Science
    SRGEC, 2024 - 85%
  - Intermediate in Mathematics and cience
  Experience:
  - Web Development Intern at Bluestocks Fintech (3 months)
    - Developed IPO Web Application using Django.
    - Built REST APIs using Django REST Framework.
  
  Skills:
  - Python
  - Django
  - Machine Learning
  - AI
  
  Projects:
  - IPO Web Application & REST API Development: A project involving the development of an IPO web application to provide IPO-related information.
  `;
  
  
  
    // const userQuestion = "What projects has Abdul worked on?";
      const prompt = `
      I am providing you with the resume of Abdul Khadar Jilani. Based on the resume, please answer the following question.
  
      Resume:
      ${resumeText}
  
      Question: ${question}
      `;
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: question,
            resumeText: resumeText
          })
        });
  
      console.log('Received response:', response);
  
      if (!response.ok) {
        if (response.status === 429) {
          // Handle 429 Too Many Requests
          console.error('Too many requests - please try again later.');
          const errorMessageElement = document.createElement('div');
          errorMessageElement.classList.add('chat-message', 'ai');
          errorMessageElement.textContent = "Too many requests - please try again later.";
          chatHistoryElement.appendChild(errorMessageElement);
  
          // Optionally, disable the button for a short period
          document.getElementById('ask-button').disabled = true;
          setTimeout(() => {
            document.getElementById('ask-button').disabled = false;
          }, 30000); // 30-second delay
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        const data = await response.json();
        const aiMessage = data.choices[0].message.content.trim();
  
        // Display AI's response
        const aiMessageElement = document.createElement('div');
        aiMessageElement.classList.add('chat-message', 'ai');
        aiMessageElement.textContent = aiMessage;
        chatHistoryElement.appendChild(aiMessageElement);
  
        // Scroll to the bottom of the chat history
        chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight;
      }
  
    } catch (error) {
      console.error('Error:', error);
      const errorMessageElement = document.createElement('div');
      errorMessageElement.classList.add('chat-message', 'ai');
      errorMessageElement.textContent = `An error occurred: ${error.message}`;
      chatHistoryElement.appendChild(errorMessageElement);
    }
  });
});