import { useRef, useEffect, useState } from 'react';
import Animation from './Animation';

const visibilityByIndex = {
  1: { showIcons: true, showLines: false, showEndeavor: false },
  2: { showIcons: true, showLines: true, showEndeavor: true },
  3: { showIcons: false, showLines: false, showEndeavor: true },
  4: { showIcons: false, showLines: false, showEndeavor: true },
  5: { showIcons: false, showLines: false, showEndeavor: true },
  6: { showIcons: false, showLines: false, showEndeavor: true },
  7: { showIcons: false, showLines: false, showEndeavor: true },
};


function App() {
  const sectionsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(1); 

  // const sectionsRef = useRef<HTMLDivElement[]>([]);
  // const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activatedElements = useRef<Set<string>>(new Set());


  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            console.log("Setting active index to:", index); // Add logging
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    sectionsRef.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sectionText = [
    ["", ""],
    ["Order Intake", "Receive and process purchase orders efficiently", "Eliminate manual data entry with Endeavor's AI assistant that handles purchase orders from all channels - Excel, PDFs, emails, and more. Configurable for any file format, our solution reduces errors and saves your team valuable time.", "Start with Order Intake"],
    ["Format Recognition & Extraction", "Automate data capture from any document format", "Our AI Agent identifies and learns each client's unique purchase order (PO) format, automatically extracting the relevant data.", "Start with Format Recognition"],
    ["Validation", "Ensure accuracy with intelligent data verification", "The AI Agent validates the extracted items against a comprehensive knowledge base of part numbers and product descriptions, also cross-referencing the customer's historical sales data for accuracy.", "Start with Validation"],
    ["Custom Business Logic", "Apply tailored business rules to every order", "Tailored to your operations, the AI Agent applies custom business rules such as volume-based discounts, order splitting, and other specialized workflows.", "Start with Custom Business Logic"],
    ["ERP Integration", "Connect seamlessly with your existing systems", "The AI Agent seamlessly enters the processed order into your ERP system or flags discrepancies for human review when needed.", "Start with ERP Integration"],
    ["", ""]
  ];

  const highlightColor = "[#0682CC]";

  return (
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-row w-7/10 items-start justify-between relative">
          {/* Scrollable text column */}
          <div className="w-1/2 pr-8 z-10">
            <div className="space-y-20">
              {sectionText.map((text, idx) => (
                <div 
                  key={idx}
                  ref={el => (sectionsRef.current[idx] = el!)}
                  data-index={idx}
                  className="min-h-[80vh] flex flex-col gap-8 justify-center">
                  <p className="text-2xl font-semibold text-[#0682CC]">
                    {text[0]}
                  </p>
                  <p className="text-5xl font-bold leading-[5rem]">
                    {text[1]}
                  </p>
                  <p className="text-2xl text-gray-400 leading-[2.5rem]">
                    {text[2]}
                  </p>
                  <button type="button" className="w-fit bg-[var(--color-primary)] text-white text-xl font-semibold px-4 py-2 rounded-2xl">{text[3]}</button>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky/fixed animation on the right */}
          <div className="w-1/2 sticky top-1/2 transform -translate-y-1/2 ">
            <Animation
              activeIndex={activeIndex}
            />
          </div>
        </div>
      </div>
  );
}

export default App;
