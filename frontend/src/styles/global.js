import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  body {
    background-color: #f9fafb;
    color: #111827;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  input, select, button {
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    padding: 0.5rem 1rem;
    margin: 0.25rem 0;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  input:focus, select:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.3);
    outline: none;
  }

  table {
    transition: all 0.2s ease-in-out;
  }

  table tr:hover {
    background-color: #eef2ff;
    transform: scale(1.005);
  }

  svg {
    transition: transform 0.2s ease, color 0.2s ease;
  }

  svg:hover {
    transform: scale(1.1);
  }
`;

export default GlobalStyle;