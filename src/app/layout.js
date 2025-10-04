
import Chatbot from "./component/Chatbot";
import Footer from "./footer/footer";
import "./globals.css";
import Navbar from "./navbar/navbar";




export const metadata = {
  title: "Mentora",
  description: "The mentor connection app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className=""
      >
        <Navbar></Navbar>
        
        {children}
        
        
        <Footer></Footer>
      </body>
    </html>
  );
}
