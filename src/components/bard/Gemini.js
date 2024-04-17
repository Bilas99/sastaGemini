import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import Spinner from './Spinner';
import './Gemini.css';

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Define the handleCopy function (optional)
  const handleCopy = (e) => {
    const copyDiv = e.target.parentElement;
    const code = copyDiv.parentElement.firstElementChild;
    navigator.clipboard.writeText(code.innerText).then(() => {
       alert('Copied!');
    }, () => {
       alert('Failed to copy!');
    });
  }
 
export default function Gemini() {
  const msgsEndRef = useRef(null);
  const elements = useRef([]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Access your API key as an environment variable
  const apikey = process.env.REACT_APP_BARD_API_KEY;
  const genAI = new GoogleGenerativeAI(apikey);

  const prompt = (e) => {
    const btn = document.querySelector('#btn');
    const msg = e.target.value.trim();

    if (msg === '') {
      btn.classList.add('disabled');
    } else {
      setInput(msg);
      btn.classList.remove('disabled');
    }
  };

  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    hljs.initHighlighting();
  }, [messages]);

  useEffect(() => {
    if (elements.current.length !== 0) {
      const elem = elements.current;
      for (let i = 0; i < elements.current.length; i++) {
        const childElem = elem[i].children;
        for (let j = 0; j < childElem.length; j++) {
          if (childElem[j].tagName === 'PRE') { // Check for PRE tag instead of object type
            //alert(childElem[j].innerHTML)
            if (
              childElem[j].innerHTML.includes('hljs') &&
              childElem[j].children.length < 2
            ) {
              let isLanguage = childElem[j].innerHTML.split(' ')[1];
              let language= '';
              if(isLanguage.includes('language')) {
                 //alert('yes')
                 language = isLanguage.slice(16);
              }
              //alert(language)
              const copyDiv = document.createElement('div')
                 copyDiv.classList.add(
                    'px-2', 'py-1',
                    'text-light',
                    'bg-dark',
                    'd-flex',
                    'justify-content-between'
                    );
              const p = document.createElement('p');
                 p.classList.add('my-auto')
                 p.textContent = language;
              const copyButton = document.createElement('button');
                 copyButton.classList.add(
                    'btn',
                    'btn-sm',
                    'text-light',
                    'display-4',
                    );
                 copyButton.textContent = 'Copy';
                 copyButton.addEventListener('click', handleCopy);
                 copyDiv.append(p, copyButton)
              childElem[j].appendChild(copyDiv);
            }
          }
        }
      }
    }
  }, [elements.current.length]);

  const submit = async () => {
    const btn = document.querySelector('#btn');
    const inp = document.querySelector('#inp');

    setLoading(true);
    inp.value = '';
    btn.classList.add('disabled');
    setMessages([...messages, { text: input, isUser: true }]);

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({
      model: 'gemini-pro',
    });

    const result = await model.generateContent(input);
    const response = await result.response;
    const data = response.text();

    setMessages([
      ...messages,
      { text: input, isUser: true },
      { text: data, isUser: false },
    ]);

    setLoading(false);
    setInput('');
  };

  return (
    <>
      <div>
        <div>
          <h4 className="text-center">Sasta Google Gemini</h4>
        </div>

        {/* Messages Container Starts */}
        <div className="container"
          style={{ width: '100%', height: '74vh', overflowY: 'scroll' }}
        >
        
          {/* Greeting Message */}
          {messages.length === 0 && (
            <div className="h-100 d-flex justify-content-center align-items-center">
            <div className="text-center">
                <h2>
                  I'm Sasta Assistant
                </h2>
                <h2>
                  <small>
                     How can I help you today?
                  </small>
                </h2>
            </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i}>
              <h3 className="text-info">
                <small>{msg.isUser ? 'You' : 'Assistant'}</small>
              </h3>

              <div
                ref={(el) => (elements.current[i] = el)}
                className="my-2"
                style={{ paddingLeft: '1.5rem' }}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}

          {/* Loading */}
          {loading && <Spinner />}

          {/* For ScrollIntoView */}
          { input !== '' && 
          <div className="py-5 my-5" ref={msgsEndRef} />}
        </div>

        <div className="fixed-bottom">
          <div className="input-group my-1">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your prompt here..."
              aria-label="Enter your prompt here"
              aria-describedby="basic-addon2"
              id="inp"
              onChange={prompt}
            />
            <div className="input-group-append">
              <button
                id="btn"
                className="btn btn-primary disabled"
                type="button"
                onClick={submit}
              >
                Send
              </button>
            </div>
          </div>
          <div>
            <p className="text-dark-gray text-center text-xs">
              <small>Sasta Assistant can make mistakes.</small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
