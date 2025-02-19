import { useState } from 'react'
import Gemini from "./partials/Gemini";
import { MessageContext } from "./contexts/MessageContext.jsx";

export default function App() {
  /*const markdownContent = `
  **HTML Boilerplate**

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>
~~~
~~~bash
npm run dev
~~~

**Explanation:**

The HTML boilerplate is a basic HTML document structure that includes the bare minimum requirements for a valid HTML5 document. It consists of the following elements:

* **\`<!DOCTYPE html>\`**: This is the document type declaration, which tells the browser that this is an HTML5 document.
* **\`<html>\`**: This is the root element of the HTML document.
* **\`<head>\`**: This element contains information about the document, such as the document title and meta tags.
* **\`<meta charset="UTF-8">\`**: This meta tag specifies the character encoding used in the document, which is UTF-8.
* **\`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`**: This meta tag sets the viewport settings for mobile devices, ensuring that the page is responsive and scales to fit the screen size.
* **\`<title>\`**: This element contains the title of the document, which will be displayed in the browser's title bar.
* **\`<body>\`**: This element contains the main content of the document, including text, images, and other elements.

The HTML boilerplate provides a solid foundation for creating web pages. It ensures that your pages are valid HTML5 documents and includes essential meta tags for proper display and functionality.
`
*/

  
  const [ messages, setMessages ] = useState([])
  const [loading, setLoading] = useState(false);
  
  return (
    <MessageContext value={{ messages, setMessages, loading, setLoading }}>
      <Gemini />
    </MessageContext>
  )
}