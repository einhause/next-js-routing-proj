import Document, { Html, Head, Main, NextScript } from 'next/document';

// for the overall structure of your next app
// Allows HTML elements outside of next element if overridden

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <div id='overlay'></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
