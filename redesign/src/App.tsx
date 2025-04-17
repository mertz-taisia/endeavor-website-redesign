import { useRef, useEffect, useState } from 'react';
import Animation from './Animation';

const visibilityByIndex = {
  2: { showIcons: true, showLines: false, showEndeavor: false },
  3: { showIcons: true, showLines: false, showEndeavor: false },
  4: { showIcons: true, showLines: true, showEndeavor: true },
  5: { showIcons: false, showLines: false, showEndeavor: true },
  6: { showIcons: false, showLines: false, showEndeavor: true },
  7: { showIcons: false, showLines: false, showEndeavor: true },
  8: { showIcons: false, showLines: false, showEndeavor: true },
  9: { showIcons: false, showLines: false, showEndeavor: true },
};



function App() {
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activatedElements = useRef<Set<string>>(new Set());


  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sectionsRef.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sectionText = [
    ["Order Intake", "Purchase orders are received through various channels and must be processed for entry."],
    ["Format Recognition & Extraction", "Our AI Agent identifies and learns each client’s unique purchase order (PO) format, automatically extracting the relevant data."],
    ["Validation", "The AI Agent validates the extracted items against a comprehensive knowledge base of part numbers and product descriptions, also cross-referencing the customer’s historical sales data for accuracy."],
    ["Custom Business Logic", "Tailored to your operations, the AI Agent applies custom business rules such as volume-based discounts, order splitting, and other specialized workflows."],
    ["ERP Integration", "The AI Agent seamlessly enters the processed order into your ERP system or flags discrepancies for human review when needed."],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
  ];


  return (
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-row w-3/4 items-start justify-center relative">
          {/* Scrollable text column */}
          <div className="w-1/2 pr-8 z-10">
            <div className="space-y-20">
              {sectionText.map((text, idx) => (
                <div 
                  key={idx}
                  ref={el => (sectionsRef.current[idx] = el!)}
                  data-index={idx}
                  className="min-h-[40vh] flex flex-col gap-12">
                  <p className="text-2xl font-bold text-blue-500">
                    {text[0]}
                  </p>
                  <p className="text-5xl font-bold">
                    {text[1]}
                  </p>
                  <p className="text-2xl text-gray-400">
                    {text[1]}
                  </p>
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

// import { useRef, useEffect, useState } from 'react';
// import Animation from './Animation';


// function App() {
//   const sectionsRef = useRef<HTMLDivElement[]>([]);
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);


//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       entries => {
//         entries.forEach(entry => {
//           const index = Number(entry.target.getAttribute('data-index'));
//           if (entry.isIntersecting) {
//             setActiveIndex(index);
//           }
//         });
//       },
//       {
//         threshold: 0.6,
//       }
//     );

//     sectionsRef.current.forEach(el => el && observer.observe(el));
//     return () => observer.disconnect();
//   }, []);

//   const sectionText = [
//     ["Order Intake", "Purchase orders are received through various channels and must be processed for entry."],
//     ["Format Recognition & Extraction", "Our AI Agent identifies and learns each client’s unique purchase order (PO) format, automatically extracting the relevant data."],
//     ["Validation", "The AI Agent validates the extracted items against a comprehensive knowledge base of part numbers and product descriptions, also cross-referencing the customer’s historical sales data for accuracy."],
//     ["Custom Business Logic", "Tailored to your operations, the AI Agent applies custom business rules such as volume-based discounts, order splitting, and other specialized workflows."],
//     ["ERP Integration", "The AI Agent seamlessly enters the processed order into your ERP system or flags discrepancies for human review when needed."],
//     ["", ""],
//     ["", ""],
//     ["", ""],
//     ["", ""],
//     ["", ""],
//     ["", ""],
//     ["", ""],
//     ["", ""],
//     ["", ""],
//     ["", ""],
//     ["", ""],
//     ["", ""],
//     ["", ""],
//     ["", ""],
//     ["", ""],
//     ["", ""],
//   ];

//   return (
//       <div className="flex flex-row justify-center w-full">
//         <div className="flex flex-row w-5/6 items-start justify-center relative bg-blue-500">
//           {/* Scrollable text column */}
//           <div className="w-1/2 pr-8 z-10">
//             <div className="space-y-20">
//               {sectionText.map((text, idx) => (
//                 <div 
//                   key={idx}
//                   ref={el => (sectionsRef.current[idx] = el!)}
//                   data-index={idx}
//                   className="min-h-[40vh]">
//                   <p>
//                     {text[0]}
//                   </p>
//                   <p>
//                     {text[1]}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Sticky/fixed animation on the right */}
//           <div className="w-1/2 sticky top-1/2 transform -translate-y-1/2 bg-red-100">
//             <Animation
//             activeIndex={activeIndex}
//           />
//           </div>
//         </div>
//       </div>
//   );
// }

// export default App;
