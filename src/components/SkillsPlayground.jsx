import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const capImages = [
  "Picsart_26-06-20_12-08-47-761.png",
  "Picsart_26-06-20_12-10-10-906.png",
  "Picsart_26-06-20_12-11-05-284.png",
  "Picsart_26-06-20_12-11-43-369.png",
  "Picsart_26-06-20_17-14-18-076.png",
  "file_0000000001ac720ba14a8ff1ed250aff.png",
  "file_00000000494472079a0a9a550e01176f.png",
  "file_000000005f70720b9d3213d1a3b2bf5a.png",
  "file_0000000073e8720bae0807f342442400.png",
  "file_000000007a0472068a2e4226e676526c.png",
  "file_000000007b00720b8878b1f776a1dc0f.png",
  "file_000000007bfc720b922b735f9263b5cc.png",
  "file_000000009a947206a6189e5a14b4d81d.png",
  "file_00000000a370720bab9e29a91ebe39eb.png",
  "file_00000000a538720bbdcb98a23a5781c4.png",
  "file_00000000bb90720b8f326d65e3f7a3f7.png",
  "file_00000000c67472068152fe231433cbca.png",
  "file_00000000d0dc720b965270789a2e5c91.png",
  "file_00000000d6c871f8aae3669a52f47f3e.png",
  "file_00000000da107207be4bd7af09bd9347.png",
  "file_00000000e738720ba73ec5e35d258ff7.png",
  "file_00000000f0a0720695d2c7d3b986d883.png",
  "file_00000000f3c4720b85c587639dc15862.png",
  "file_00000000f5a472098aa59e09ce7744d8.png",
  "file_00000000fd38720bbda3b1a7e5c4632a.png"
];

export default function SkillsPlayground() {
  const [positions, setPositions] = useState([]);
  const [isGathered, setIsGathered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const pillX = useSpring(mouseX, { stiffness: 600, damping: 30, mass: 0.2 });
  const pillY = useSpring(mouseY, { stiffness: 600, damping: 30, mass: 0.2 });

  const offsetX = useTransform(pillX, (val) => val + 15);
  const offsetY = useTransform(pillY, (val) => val + 15);
  
  const [hoveredCapIndex, setHoveredCapIndex] = useState(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    if (hoveredCapIndex !== null) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoveredCapIndex, mouseX, mouseY]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        setDimensions({
          width: canvasRef.current.clientWidth,
          height: canvasRef.current.clientHeight
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isAnyDragging = positions.some(p => p.isDragActive);
  const showPill = hoveredCapIndex !== null && !isAnyDragging;

  const generateRandomPositions = (gathered = false, customWidth = null) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const canvasWidth = customWidth || dimensions.width || (isMobile ? 320 : 900);
    return capImages.map((imgName, i) => {
      const isPicsart = imgName.startsWith('Picsart');
      const capWidth = isPicsart ? (isMobile ? 105 : 160) : (isMobile ? 140 : 210);
      const paddingVal = isMobile ? 20 : 40;
      const maxOffset = Math.max(0, canvasWidth / 2 - capWidth / 2 - paddingVal);

      if (gathered) {
        // Gather them into a neat grid
        const cols = isMobile ? 2 : 4;
        const colWidth = isMobile ? 140 : 195;
        const rowHeight = isMobile ? 115 : 150;
        const col = i % cols;
        const row = Math.floor(i / cols);
        
        const gridWidth = cols * colWidth;
        const startX = -gridWidth / 2 + colWidth / 2;
        const startY = isMobile ? 20 : 50; // Margin from top of the playground canvas to shift grid down
        
        return {
          x: startX + col * colWidth,
          y: startY + row * rowHeight,
          rotate: 0,
          zIndex: 5,
          isDragActive: false
        };
      } else {
        // Scatter randomly under the skills heading inside the card
        const yRange = isMobile ? 550 : 780;
        const rx = (Math.random() - 0.5) * maxOffset * 2;
        const ry = Math.random() * yRange + 50;
        const rRotate = (Math.random() - 0.5) * 60; // -30 to 30 deg
        return {
          x: rx,
          y: ry,
          rotate: rRotate,
          zIndex: Math.floor(Math.random() * 20) + 1,
          isDragActive: false
        };
      }
    });
  };

  useEffect(() => {
    if (canvasRef.current) {
      const w = canvasRef.current.clientWidth;
      const h = canvasRef.current.clientHeight;
      setDimensions({ width: w, height: h });
      setPositions(generateRandomPositions(false, w));
    }
  }, []);

  const handleScatter = () => {
    setPositions(generateRandomPositions(false));
    setIsGathered(false);
  };

  const handleGather = () => {
    setPositions(generateRandomPositions(true));
    setIsGathered(true);
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const canvasWidth = dimensions.width || (isMobile ? 320 : 900);
  const canvasHeight = dimensions.height || (isMobile ? 1350 : 1100);

  return (
    <div className="skills-playground" ref={containerRef}>

      
      <div className="skills-controls">
        <button 
          className={`control-btn ${!isGathered ? 'active' : ''}`}
          onClick={handleScatter}
        >
          SCATTER CAPS
        </button>
        <button 
          className={`control-btn ${isGathered ? 'active' : ''}`}
          onClick={handleGather}
        >
          GATHER GRID
        </button>
      </div>

      <div className="playground-canvas" ref={canvasRef}>
        {positions.length > 0 && capImages.map((imgName, i) => {
          const pos = positions[i];
          if (!pos) return null;
          const isPicsart = imgName.startsWith('Picsart');
          const capWidth = isPicsart ? (isMobile ? 105 : 160) : (isMobile ? 140 : 210);
          const capHeight = isPicsart ? (isMobile ? 105 : 160) : (isMobile ? 140 : 210);
          const paddingVal = isMobile ? 20 : 40;

          const dragLeft = -canvasWidth / 2 + capWidth / 2 + paddingVal;
          const dragRight = canvasWidth / 2 - capWidth / 2 - paddingVal;
          const dragTop = paddingVal;
          const dragBottom = canvasHeight - capHeight - paddingVal;

          return (
            <motion.div
              key={imgName}
              className={`draggable-cap${isPicsart ? ' picsart-cap' : ''}`}
              drag
              dragMomentum={false}
              dragConstraints={{
                left: dragLeft,
                right: dragRight,
                top: dragTop,
                bottom: dragBottom
              }}
              dragElastic={0.1}
              animate={{
                x: pos.x,
                y: pos.y,
                rotate: pos.rotate,
                scale: pos.isDragActive ? 1.15 : 1,
                zIndex: pos.zIndex,
              }}
              transition={pos.isDragActive ? { type: "just" } : { type: "spring", stiffness: 120, damping: 18 }}
              onMouseEnter={(e) => {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
                setHoveredCapIndex(i);
              }}
              onMouseLeave={() => {
                setHoveredCapIndex(null);
              }}
              onDragStart={() => {
                setPositions(prev => {
                  const next = [...prev];
                  const maxZ = Math.max(...next.map(p => p.zIndex), 1);
                  next[i] = {
                    ...next[i],
                    zIndex: maxZ + 1,
                    isDragActive: true
                  };
                  return next;
                });
              }}
              onDragEnd={(event, info) => {
                setPositions(prev => {
                  const next = [...prev];
                  const canvasElement = canvasRef.current;
                  if (!canvasElement) return prev;

                  const canvasWidthVal = canvasElement.clientWidth;
                  const canvasHeightVal = canvasElement.clientHeight;

                  // Calculate target release coordinates
                  let targetX = next[i].x + info.offset.x;
                  let targetY = next[i].y + info.offset.y;

                  // Clamp to canvas borders (taking padding and cap dimensions into account)
                  const minX = -canvasWidthVal / 2 + (capWidth / 2) + paddingVal;
                  const maxX = canvasWidthVal / 2 - (capWidth / 2) - paddingVal;
                  targetX = Math.max(minX, Math.min(maxX, targetX));

                  const minY = paddingVal;
                  const maxY = canvasHeightVal - capHeight - paddingVal;
                  targetY = Math.max(minY, Math.min(maxY, targetY));

                  next[i] = {
                    ...next[i],
                    x: targetX,
                    y: targetY,
                    isDragActive: false
                  };
                  return next;
                });
              }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '0px',
                cursor: pos.isDragActive ? 'grabbing' : 'grab',
                touchAction: 'none'
              }}
            >
              <img 
                src={`/caps/${imgName}`} 
                alt={`Cap ${i}`} 
                className="cap-sticker-img" 
                draggable={false}
              />
            </motion.div>
          );
        })}
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showPill && (
            <motion.div
              className="cap-hover-pill"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              style={{
                x: offsetX,
                y: offsetY,
              }}
            >
              DRAG & PLACE
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
