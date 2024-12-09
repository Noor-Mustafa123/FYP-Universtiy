# FYP-University

# E-commerce Web Application with Integrated Chatbot

## Project Overview

This project is an advanced e-commerce web application developed as a Final Year Project. The application aims to provide a seamless shopping experience with a unique feature: an integrated chatbot that enhances user interaction by providing instant answers to queries based on the application's dataset.

## Project Architecture
![kkk](https://github.com/user-attachments/assets/2e57eea4-0081-4a2d-8294-7f80a22e144e)

## Frontend
Technologies Used: Bootstrap, HTML, CSS, JavaScript

## Screenshots

`Cart Items`
![Screenshot 2024-08-23 000525](https://github.com/user-attachments/assets/348ea203-668c-42d5-8bd7-6a23cefcb00c)
`Cart Section`
![Screenshot 2024-08-22 235947](https://github.com/user-attachments/assets/b07176b5-17c0-4042-addf-b5476d536b9a)
`Single Product Page`
![Screenshot 2024-08-22 235310](https://github.com/user-attachments/assets/6996ea08-3e23-4ce3-8fe7-279e416963d6)
`Single Product Pop Up`
![Screenshot 2024-08-22 234855](https://github.com/user-attachments/assets/c170d1e1-0d6a-4d0a-b146-b034281e1eaf)
`Account Reset Page`
![Screenshot 2024-08-22 234438](https://github.com/user-attachments/assets/286e43cb-7a6c-4e39-a576-1df90bb38014)
`Multiple Products Page`
![Screenshot 2024-08-22 233819](https://github.com/user-attachments/assets/d5715406-1400-4aa4-9ae2-6c9598f546a4)
`Sign Up Page`
![Screenshot 2024-08-22 232850](https://github.com/user-attachments/assets/06ad274a-febe-4761-8ec2-4c695a4d1639)
`Login Page`
![Screenshot 2024-08-22 232835](https://github.com/user-attachments/assets/7093d71e-cf49-4ce5-b42f-4058b05e9bc5)
`Highlight Products Section`
![Screenshot 2024-08-22 231007](https://github.com/user-attachments/assets/ec6d0e8a-522e-4e23-b885-abd5e7601d94)
`Products Page`
![Screenshot 2024-08-22 230927](https://github.com/user-attachments/assets/71a6d5ba-0ce1-410d-82e1-9c682047d138)
`Home Page`
![Screenshot 2024-08-22 230325](https://github.com/user-attachments/assets/c3280d9b-130d-46f7-b932-16ce16344bec)




**Features:**
Responsive design using Bootstrap for a seamless experience across devices.
Dynamic UI components created with HTML, CSS, and JavaScript.

## Backend
**Technologies Used:** Java Spring Boot
**Database:** MySQL

### Features:
-Robust backend developed with Java Spring Boot for efficient data handling and business logic implementation.

-MySQL database for reliable data storage and retrieval.

-Docker for containerization, ensuring consistency across different environments.

### Security Architecture: 

![Screenshot 2024-05-28 133937](https://github.com/user-attachments/assets/2a70e50c-8369-47ea-8b6e-964616fb232f)



  `Spring Security integrated with JWT tokens to provide a secure authentication system`
  
#### Authentication Mechanism:
Utilizes JWT (JSON Web Tokens) to authenticate incoming HTTP requests by verifying the token's validity.
#### JwtAuthFilter:
A custom filter checks for the presence and validity of JWTs. Invalid or missing tokens result in an HTTP 403 (Forbidden) response.
#### Validation Service:
Includes a JwtService to validate tokens and a UserDetailsService to fetch user details for authenticated tokens.
#### Security Context Update:
Upon successful JWT validation, the user's context is updated in the SecurityContextHolder for secure session handling.
#### Request Flow: 
Valid requests are routed through the DispatcherServlet to the relevant controllers.
#### Error Handling:
Invalid or missing tokens are blocked early in the pipeline, preventing unauthorized access to application resources.

## Innovative Chatbot Integration
-The standout feature of this project is the chatbot integration. The chatbot is designed to interact with users, providing instant responses based on the e-commerce application's dataset. This innovation aims to improve user experience by making information easily accessible and enhancing customer service.

## Additional Details
**Repository:** https://github.com/Noor-Mustafa123/FYP-Universtiy

**Security:** Implemented robust authentication using Spring Security and JWT tokens to ensure secure user sessions.

**Deployment:** Utilized Docker for consistent and streamlined deployment across different environments.

This project showcases a comprehensive skill set, combining frontend and backend technologies, secure authentication, and innovative user interaction through chatbot integration.
