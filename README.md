# AI-Powered Student Survey Chatbot

## Overview

This project is an AI-powered student survey system designed to collect and analyze student interests in Artificial Intelligence and Machine Learning.

Instead of using a traditional form interface, the application presents questions through a chatbot-style conversational UI to improve engagement and usability.

The system also performs automatic NLP analysis on student responses using multiple AI techniques.

---

## Key Features

### Conversational Survey Interface

* Chatbot-style survey interaction
* Dynamic question flow
* Real-time response capture

### AI-Powered Text Analysis

* Keyword extraction using RAKE algorithm
* Named entity and noun phrase extraction using winkNLP
* AI text summarization using Hugging Face transformer models

### Data Validation

* Duplicate email detection
* Duplicate mobile number detection
* Input validation for survey responses

### Admin Dashboard

* View submitted student responses
* View extracted keywords
* View AI-generated summaries

---

## Tech Stack

Frontend

* React.js
* React Router
* Axios
* Tailwind CSS

Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

AI / NLP

* Hugging Face Transformers
* winkNLP
* RAKE keyword extraction

---

## System Architecture

User Interface (React Chatbot)
↓
REST API Layer (Express.js)
↓
AI Processing Layer (RAKE + winkNLP + Hugging Face)
↓
Database (MongoDB)

---

## Installation

Clone the repository

git clone https://github.com/Abhinavkulkarni997/SurveyForm.git

Install dependencies

npm install

Start frontend

npm run dev

Start backend

npm run dev

---

## Future Improvements

* Deploy the system on cloud infrastructure
* Add authentication for admin dashboard
* Extend AI analysis with topic modeling
* Integrate vector search for semantic insights
