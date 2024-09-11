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
    - Phone: +91 7416559466
    - LinkedIn: https://linkedin.com/in/abdulkhadarjilani
    - GitHub: https://github.com/Abdul-Khadar-Jilani
    
    Experience:
    1. Bluestock Fintech | SDE Intern (Aug 2024 - Present)
       - Led the development of an IPO web application and REST API using Python, Django, and PostgreSQL.
       - Built and optimized backend processes, focused on database design, API development, and authentication.
       - Engineered the front-end using HTML, CSS, JavaScript, and Bootstrap 5.
    
    2. SmartInternz | Machine Learning and Deep Learning Intern (Jan 2023 - May 2023)
       - Applied machine learning and deep learning algorithms to improve predictive accuracy by 20%.
       - Achieved 92% accuracy in face and object recognition tasks by developing and fine-tuning CNNs and RNNs.
    
    Education:
    - Bachelor of Technology in Artificial Intelligence and Data Science (2020 - 2024)
      Seshadri Rao Gudlavalleru Engineering College | CGPA: 8.98/10
    - Intermediate in Mathematics (2018 - 2020)
      Sri Chaitanya Junior College | CGPA: 9.65/10
    
    Skills:
    - Programming Languages: C, Python, Java
    - Web Technologies: HTML, CSS, JavaScript, PHP, Bootstrap 5, MySQL, MongoDB
    - Tools and APIs: Git, GitHub, VS Code, Postman, Docker, Huggingface, LLMs, GenAI APIs
    - Frameworks and Libraries: Django, Flask, RESTful API, TensorFlow, PyTorch, Transformers, Langchain
    
    Projects:
    1. Advanced Chatbot and PDF Interaction Application:
       - Developed using Python, Langchain, Huggingface, and LLMs with Retrieval-Augmented Generation (RAG).
    
    2. GenAI-DBManager powered by Gemini API:
       - Built a text-to-query functionality using Python, SQLite, Streamlit, and the Gemini API for efficient data retrieval.
    
    3. AI-Based Drug Recommendation System:
       - Developed a drug recommendation system using Python, NLTK, Scikit-Learn, achieving 96% accuracy.
    
    4. Integrating Deep Learning for Eye-Blinking Based Strain Analysis:
       - Achieved 98% accuracy in eye strain analysis using OpenCV and Deep Learning techniques.
    
    Hobbies:
    1.AI surfing
    2.Reading and summarizing books
    3. Problem solving and DSA

       `;
       
    const prompt = `
    I am providing you with the resume of Abdul Khadar Jilani. Based on the resume, please answer the following question in point wise.
  
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
        body: JSON.stringify({ question, resumeText })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Received data:', data); // Log the entire response data
  
      // Check if the message exists
      if (data && data.message) {
        const aiMessage = data.message.trim();
  
        // Display AI's response
        const aiMessageElement = document.createElement('div');
        aiMessageElement.classList.add('chat-message', 'ai');
        aiMessageElement.textContent = aiMessage;
        chatHistoryElement.appendChild(aiMessageElement);
  
        // Scroll to the bottom of the chat history
        chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight;
      } else {
        throw new Error('Invalid response format');
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