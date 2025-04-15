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
    'Section 1 – Some long scrollable text content here.',
    'Section 2 – Maybe more info or narrative below.',
    'Section 3 – Even more info to test scrolling...',
    'Section 4 – More text.',
    'Section 5 – More text.',
    'Section 6 – More text.',
    'Section 7 – More text.',
    'Section 8 – More text.',
    'Section 9 – More text.',
    'Section 10 – More text.',
    'Section 11 – More text.',
    'Section 12 – More text.',
    'Section 13 – More text.',
    'Section 14 – More text.',
    'Section 15 – More text.',
    'Section 16 – More text.',
    'Section 17 – More text.',
    'Section 18 – More text.',
    'Section 19 – More text.',
    'Section 20 – More text.',
    'Section 21 – More text.',
    'Section 22 – More text.',
    'Section 23 – More text.',
    'Section 24 – More text.',
    'Section 25 – More text.',
    'Section 26 – More text.',
    'Section 27 – More text.',
    'Section 28 – More text.',
    'Section 29 – More text.',
    'Section 30 – End section of text.',
  ];

  return (
    <div className="App">
      <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        <div className="flex flex-row items-start justify-center  relative">
          {/* Scrollable text column */}
          <div className="w-1/2 pr-8 z-10">
            <div className="space-y-20">
              {sectionText.map((text, idx) => (
                <p
                  key={idx}
                  ref={el => (sectionsRef.current[idx] = el!)}
                  data-index={idx}
                  className="min-h-[40vh]"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>

          {/* Sticky/fixed animation on the right */}
          <div className="w-1/2 sticky top-1/2 transform -translate-y-1/2">
            <Animation
            activeIndex={activeIndex}
          />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
