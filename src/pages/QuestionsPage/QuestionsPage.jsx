import React from "react";

import { useNavigate } from "react-router-dom";

import styles from "./QuestionsPage.module.css";

const QuestionsPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleBack} className={styles.backButton}>
        Back
      </button>
      <h1 className={styles.title}>Questions</h1>

      <div className={styles.questionsContainer}>
        <div className={styles.question}>
          <h3>
            1.How would you handle browser compatibility issues? Can you give an
            example of a specific issue and how you solved it?
          </h3>
          <p>
            As a beginner, I'm still learning how to manage cross-browser
            compatibility issues. I've started to familiarize myself with tools
            like importing Normalize and using Autoprefixer in CSS, which help
            automatically add the necessary prefixes for different browsers. I'm
            also trying to use modern development techniques that are better
            supported across all browsers. I prefer to be more efficient and, if
            possible, focus on optimization rather than dealing with
            compatibility problems.
          </p>
        </div>

        <div className={styles.question}>
          <h3>
            2.What strategies do you use to manage state in a front-end
            application, especially when dealing with data from APIs?
          </h3>
          <p>
            In my React applications, I use Redux to manage global state,
            especially when working with data from APIs. Redux provides a
            predictable data flow and makes it easier to handle complex state.
            To deal with API requests, I'm still learning about redux-thunk and
            redux-saga, but I understand that they are middleware tools used in
            Redux to manage asynchronous actions, like API requests. I'm
            starting to explore how they can help in controlling the flow of
            data and managing different states such as loading, error, and
            success.
          </p>
        </div>
        <div className={styles.question}>
          <h3>
            3.How do you ensure that your components are reusable and modular in
            a front-end application?
          </h3>
          <p>
            To ensure that components are reusable and modular, I follow the DRY
            (Don't Repeat Yourself) principle and try to create small,
            well-defined components that can be configured through props. For
            example, instead of creating multiple button components for
            different parts of the application, I create a single Button
            component that accepts props like type, onClick, and style, so it
            can be reused in various scenarios. I also use Styled Components or
            other CSS-in-JS techniques to isolate styles and make it easier to
            reuse components. I used the global button component a lot in this
            application.
          </p>
        </div>
        <div className={styles.question}>
          <h3>
            4.Explain how CORS works and why it is important in web development.
            How would you handle a CORS issue when calling an API?
          </h3>
          <p>
            CORS (Cross-Origin Resource Sharing) is a security mechanism that
            allows or restricts HTTP requests made from a different domain than
            the one where the resource originates. It is essential for
            protecting users against Cross-Site Scripting (XSS) attacks and
            other vulnerabilities. If I encounter a CORS issue when calling an
            API, my first step would be to check the server settings to ensure
            that Access-Control-Allow-Origin is configured correctly. If I don't
            have control over the server, I might use a proxy or set up
            middleware on the server side to allow cross-origin requests during
            development. I even encountered issues with loading YouTube videos
            in this application due to CORS.
          </p>
        </div>
        <div className={styles.question}>
          <h3>
            5.How do you handle real-time data updates in a front-end
            application? Can you explain the differences between WebSockets and
            server-sent events?
          </h3>
          <p>
            For real-time data updates in a front-end application, I would use
            WebSockets when I need bidirectional communication, such as in a
            chat application or a monitoring dashboard. WebSockets provide a
            continuous communication channel between the client and server,
            allowing data to be exchanged in both directions without reloading
            the page. On the other hand, for unidirectional scenarios like news
            updates or notifications, I might use Server-Sent Events (SSE),
            which are simpler to implement for continuous data streams from the
            server to the client. I plan to explore and experiment more with
            these technologies as I continue to develop my skills. Currently, I
            am working on an education application that involves real-time data
            updates, for which I've set up a local server using db.json.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
