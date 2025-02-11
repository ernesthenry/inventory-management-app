import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pantry Tracker",
  description: "Keep track of your pantry items",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <header className="header" style={{ backgroundColor: '#4CAF50', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h1 style={{ 
              fontSize: '3.5rem', // Increased font size
              color: 'white', 
              textAlign: 'center', 
              fontWeight: 'bold', 
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Pantry Tracker
            </h1>
          </header>
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

