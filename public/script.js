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
  const inputElement = document.getElementById('ask-input');
  const askButton = document.getElementById('ask-button');
  const chatHistoryElement = document.getElementById('chat-history');

  // Function to handle chat submission
  async function handleChatSubmission() {
      const question = inputElement.value.trim();
      if (question === '') {
          return;
      }

      // Display user's question
      const userMessageElement = document.createElement('div');
      userMessageElement.classList.add('chat-message', 'user');
      userMessageElement.innerHTML = `👤 ${question}`;
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
    Summary:
      A passionate AI and Data Science graduate with a strong foundation in Python, web development, and machine learning. Proficient in building interactive dashboards, predictive models, and generative AI applications.

    Experience:
    1. Eruvaka Technologies | Data Analyst Intern (Sep 2024 - Present)
      -  • Developed ETL pipelines by collecting and transforming large-scale IoT data from APIs, ensuring efficient data
        integration into BigQuery for advanced analytics.
      -  • Optimized query performance by writing complex SQL scripts in BigQuery, reducing data processing time by 30%
        and improving system efficiency.
      -  • Designed interactive dashboards in Power BI and Looker Studio, visualizing key aquaculture metrics such as pond
        conditions and survival rates, improving real-time decision making and early detection of issues by 15%.

    2. Bluestock Fintech | SDE Intern (Aug 2024 - Sep 2024)
       - Led the development of an IPO web application and REST API using Python, Django, and PostgreSQL.
       - Built and optimized backend processes, focused on database design, API development, and authentication.
       - Engineered the front-end using HTML, CSS, JavaScript, and Bootstrap 5.
    
    3. SmartInternz | Machine Learning and Deep Learning Intern (Jan 2023 - May 2023)
        • Applied machine learning and deep learning algorithms, including classification and regression models, to solve
        real-world challenges, contributing to an improvement 20% in predictive accuracy for critical business processes.
        • Specialized in applying advanced supervised and unsupervised learning techniques, achieving a 92% accuracy rate in
        face and object recognition tasks.
        • Improved and fine-tuned deep learning architectures (CNNs, RNNs), improving model performance and robustness
        by 15% in various recognition tasks.   

    Education:
    - Bachelor of Technology in Artificial Intelligence and Data Science (2020 - 2024)
      Seshadri Rao Gudlavalleru Engineering College | CGPA: 8.98/10
    - Intermediate in Mathematics (2018 - 2020)
      Sri Chaitanya Junior College | CGPA: 9.65/10
    
    Skills:
    - Programming Languages: Python, JavaScript, C
    - Web Technologies: HTML5, CSS3, PHP, Bootstrap 5, MySQL, MongoDB
    - Data Analytics and Visualization: Microsoft PowerBI, Google Looker Studio, Google BigQuery, SQL
    - Tools and APIs: Git, GitHub, VS Code, Postman, Docker, Huggingface, LLMs, GenAI APIs
    - Frameworks and Libraries: Django, Flask, Pandas, TensorFlow, PyTorch, Langchain, llamaindex, OpenCV, NLTK, Scikit-learn
    - Cloud Platforms: Google Cloud Platform (GCP)
    - DevOps: Docker, CI/CD, GitHub Actions
    - Soft Skills: Strong communication, teamwork, and problem-solving abilities
    - Languages: English, Hindi, Telugu
    - Coursework: Data Structures, Algorithms, OOPs, Artificial Intelligence, Machine Learning, Big Data
   
    Projects:
1. Advanced Chatbot and PDF Interaction Application
 • Implemented Retrieval-Augmented Generation (RAG) with LLMs to enable accurate, context-aware responses to
 queries on PDF documents, improving information retrieval efficiency.
 • Enhanced user experience by integrating conversational AI with efficient document processing, ensuring seamless
 interaction and structured knowledge extraction.
 • Deployed AI-powered chatbot on Hugging Face Spaces and Streamlit Cloud, allowing scalable and real-time access
 to document-based insights.

2. GenAI-DBManager powered by Gemini API
 • Implemented Text-to-SQL Query Functionality: Introduced a conversational AI-driven SQL querying interface on
 Streamlit platform, enabling seamless retrieval of database results; improved user satisfaction by cutting average query
 execution time by 25% through real-time generation.
 • Integrated Full CRUD Operations: Created a interface enabling users to add, modify, and delete records directly in
 the database, ensuring efficient and real time data management.
 • Boosted SQL accessibility by 20% for non-technical users, simplifying data exploration and query generation.

3. AI-Driven Predictive Drug Recommendation System
   - Developed an NLP-powered system achieving a 96% accuracy rate.
   - Improved predictive model precision by 30% through data mining and statistical analysis.

4. Integrating Deep Learning for Eye-Blinking Based Strain Analysis
   - Achieved 98% accuracy in eye strain analysis using OpenCV and DL techniques.
   - Reduced eye strain cases by 30% through a sophisticated alert mechanism.

5. IPO Web Application & REST API Development
   - Built an IPO web application using Django and PostgreSQL for IPO-related information.
   - Designed RESTful APIs and authentication workflows for scalable backend systems.

    
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
        aiMessageElement.innerHTML = `&#x1F916; ${aiMessage.replace(/\n/g, '<br>')}`;
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
      errorMessageElement.innerHTML = `&#x1F916; An error occurred: ${error.message}`;
      chatHistoryElement.appendChild(errorMessageElement);
    }
  }
  
    // Add event listener for Enter key
    inputElement.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          event.preventDefault();
          handleChatSubmission();
      }
  });

  // Click event listener
  askButton.addEventListener('click', handleChatSubmission);
});