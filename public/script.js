function toggleMobileMenu() {
  const menu = document.getElementById("menu");
  if (menu) {
    menu.classList.toggle("active");
  } else {
    console.error("Menu element not found!");
  }
}

window.onscroll = function () {
  const header = document.querySelector("header");
  if (!header) return;

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const askButton = document.getElementById("ask-button");
  const inputElement = document.getElementById("ask-input");
  const chatHistoryElement = document.getElementById("chat-history");

  if (!askButton || !inputElement || !chatHistoryElement) {
    console.error("Required DOM elements are missing!");
    return;
  }
  // Add event listener for Enter key
  inputElement.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      askButton.click(); // Trigger the click event on the button
    }
  });

  askButton.addEventListener("click", async function () {
    const question = inputElement.value.trim();
    if (question === "") return;

    displayMessage(`👤 ${sanitizeHTML(question)}`, "user");
    inputElement.value = "";

    const loadingMessage = displayMessage("&#x1F916; Thinking...", "ai");

    const resumeText = `Name: Abdul Khadar Jilani
    Contact Information:
    - Email: jilaniabdulgec@gmail.com
    - Phone: +91 7416559466
    - LinkedIn: https://linkedin.com/in/abdulkhadarjilani
    - GitHub: https://github.com/Abdul-Khadar-Jilani
    Summary:
      A passionate AI and Data Science graduate with a strong foundation in Python, web development, and machine learning. Proficient in building interactive dashboards, predictive models, and generative AI applications.

    Experience:
    1. Eruvaka Technologies | Data Analyst (Sep 2024 - Present)
      -  • Developed ETL pipelines by collecting and transforming large-scale IoT data from APIs, ensuring efficient data integration into BigQuery for advanced analytics.
      -  • Optimized query performance by writing complex SQL scripts in BigQuery, reducing data processing time by 30% and improving system efficiency.
      -  • Designed interactive dashboards in Power BI and Looker Studio, visualizing key aquaculture metrics such as pond conditions and survival rates, improving real-time decision making and early detection of issues by 15%.

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
    - Web Technologies: HTML5, CSS3, PHP, Bootstrap 5, MySQL
    - Data Analytics and Visualization: Microsoft PowerBI, Google Looker Studio, Google BigQuery, SQL, Excel, Tableau, Google Looker Studio
    - Tools and APIs: Git, GitHub, VS Code, Postman, Docker, Huggingface, LLMs, GenAI APIs
    - Frameworks and Libraries: Django, Flask, Pandas, TensorFlow, PyTorch, Langchain, llamaindex, OpenCV, NLTK, Scikit-learn, HuggingFace
    - Cloud Platforms: Google Cloud Platform (GCP)
    - Soft Skills: Strong communication, teamwork, and problem-solving abilities
    - Languages: English, Hindi, Telugu
    - Coursework: Data Structures, Algorithms, OOPs, Artificial Intelligence, Machine Learning, Big Data
   
    Projects:
1. Advanced Chatbot and PDF Interaction Application
  • Implemented Retrieval-Augmented Generation (RAG) with LLMs to enable accurate, context-aware responses to queries on PDF documents, improving information retrieval efficiency.
  • Enhanced user experience by integrating conversational AI with efficient document processing, ensuring seamless interaction and structured knowledge extraction.
  • Deployed AI-powered chatbot on Hugging Face Spaces and Streamlit Cloud, allowing scalable and real-time access to document-based insights.

2. GenAI-DBManager powered by Gemini API
  • Implemented Text-to-SQL Query Functionality: Introduced a conversational AI-driven SQL querying interface on
  Streamlit platform, enabling seamless retrieval of database results; improved user satisfaction by cutting average query
  execution time by 25% through real-time generation.
  • Integrated all CRUD Operations: Created a interface enabling users to add, modify, and delete records directly in
  the database, ensuring efficient and real time data management.
  • Boosted SQL accessibility by 20% for non-technical users, simplifying data exploration and query generation.

3. AI-Driven Predictive Drug Recommendation System
  • Utilized Natural Language Processing (NLP) and Machine Learning techniques to develop a highly accurate drug recommendation system, achieving an exceptional 96% accuracy rate.
  • Applied advanced NLP techniques including stemming, lemmatization, and vectorization (TF-IDF, BoW) to preprocess and analyze patient data, improve text representation, and increase predictive model precision by 30%.
  • Implemented an intuitive user interface for symptom input and customer/patient reviews, leading to a 25% increase in user engagement.

4. Integrating Deep Learning for Eye-Blinking Based Strain Analysis
  • Led the development of an advanced Strain Analysis system, achieving a 98% accuracy rate by leveraging Google Mediapipe and shape predictor datasets for precise eye movement tracking.
  • Implemented a sophisticated alert mechanism that issues real-time notifications based on comprehensive blinking pattern analysis, resulting in a 30% reduction in eye strain cases

5. IPO Web Application & REST API Development
  • Led the development of an IPO web application and REST API using Python, Django, Django REST Framework, and PostgreSQL, optimizing backend processes. Applied skills in database design, API development, and authentication for robust and scalable solutions.
  • Engineered the front-end using HTML, CSS, JavaScript, and Bootstrap 5, ensuring responsive and user-friendly interfaces with a focus on real-time API implementation and seamless frontend interaction.

    
    Hobbies:
    1.Web surfing about AIML and tech news
    2.Reading blogs and articles
    3.Problem solving and DSA

    `; // Replace with the resume or fetch dynamically
    const prompt = `Resume: ${resumeText}\n\nQuestion: ${question}`;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, resumeText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      loadingMessage.remove();

      if (data?.message) {
        displayMessage(`&#x1F916; ${data.message.trim()}`, "ai");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error:", error);
      loadingMessage.remove();
      displayMessage(`&#x1F916; An error occurred: ${error.message}`, "ai");
    }
  });

  function displayMessage(message, type) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", type);
    messageElement.innerHTML = message.replace(/\n/g, "<br>");
    chatHistoryElement.appendChild(messageElement);
    chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight;
    return messageElement;
  }

  function sanitizeHTML(str) {
    const tempDiv = document.createElement("div");
    tempDiv.textContent = str;
    return tempDiv.innerHTML;
  }
});
