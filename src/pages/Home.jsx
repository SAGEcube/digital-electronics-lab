
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { Link } from "react-router-dom";
import "./Home.css";

function Chip() {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.25) * 0.12;

    group.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.2) * 0.035;
  });

  const pins = Array.from({ length: 10 }, (_, i) => i);

  return (
    <group ref={group}>
      {/* PCB substrate */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[3.9, 0.12, 3.1]} />
        <meshStandardMaterial
          color="#152720"
          metalness={0.45}
          roughness={0.5}
        />
      </mesh>

      {/* Main IC package */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.65, 0.45, 1.65]} />
        <meshStandardMaterial
          color="#111615"
          metalness={0.35}
          roughness={0.32}
        />
      </mesh>

      {/* IC top face */}
      <mesh position={[0, 0.285, 0]}>
        <boxGeometry args={[1.4, 0.025, 1.4]} />
        <meshStandardMaterial
          color="#19251f"
          metalness={0.3}
          roughness={0.4}
          emissive="#a8ff35"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* Custom S-shaped circuit emblem */}
      <group position={[0, 0.31, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.58, 0.018, 0.09]} />
          <meshStandardMaterial
            color="#b9c2b4"
            metalness={0.85}
            roughness={0.22}
            emissive="#a8ff35"
            emissiveIntensity={0.35}
          />
        </mesh>

        <mesh position={[-0.245, 0, 0.15]}>
          <boxGeometry args={[0.09, 0.018, 0.3]} />
          <meshStandardMaterial
            color="#a8ff35"
            emissive="#a8ff35"
            emissiveIntensity={0.8}
          />
        </mesh>

        <mesh position={[0.245, 0, -0.15]}>
          <boxGeometry args={[0.09, 0.018, 0.3]} />
          <meshStandardMaterial
            color="#a8ff35"
            emissive="#a8ff35"
            emissiveIntensity={0.8}
          />
        </mesh>

        <mesh position={[0, 0, 0.3]}>
          <boxGeometry args={[0.58, 0.018, 0.09]} />
          <meshStandardMaterial
            color="#b9c2b4"
            metalness={0.85}
            roughness={0.22}
            emissive="#a8ff35"
            emissiveIntensity={0.35}
          />
        </mesh>

        <mesh position={[0, 0, -0.3]}>
          <boxGeometry args={[0.58, 0.018, 0.09]} />
          <meshStandardMaterial
            color="#b9c2b4"
            metalness={0.85}
            roughness={0.22}
            emissive="#a8ff35"
            emissiveIntensity={0.35}
          />
        </mesh>

        {/* Emissive circuit nodes */}
        {[
          [-0.245, 0.15],
          [0.245, -0.15],
          [-0.245, -0.3],
          [0.245, 0.3],
        ].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.012, z]}>
            <cylinderGeometry args={[0.045, 0.045, 0.025, 16]} />
            <meshStandardMaterial
              color="#a8ff35"
              emissive="#a8ff35"
              emissiveIntensity={1.2}
              metalness={0.3}
              roughness={0.25}
            />
          </mesh>
        ))}
      </group>

      {/* Fine PCB traces */}
      {Array.from({ length: 8 }, (_, i) => (
        <group key={i}>
          <mesh position={[-1.2, -0.13, -1.1 + i * 0.3]}>
            <boxGeometry args={[1.2, 0.012, 0.018]} />
            <meshBasicMaterial
              color={i % 2 ? "#648b4a" : "#a8ff35"}
            />
          </mesh>

          <mesh position={[1.1, -0.13, -1.1 + i * 0.3]}>
            <boxGeometry args={[1.1, 0.012, 0.018]} />
            <meshBasicMaterial color="#648b4a" />
          </mesh>
        </group>
      ))}

      {/* Metallic IC leads */}
      {pins.map((i) => (
        <group key={i}>
          {[-1, 1].map((side) => (
            <mesh
              key={`front-${side}`}
              position={[
                -0.68 + i * 0.151,
                -0.015,
                side * 0.95,
              ]}
            >
              <boxGeometry args={[0.065, 0.055, 0.48]} />
              <meshStandardMaterial
                color="#b9c2b4"
                metalness={0.9}
                roughness={0.24}
              />
            </mesh>
          ))}

          {[-1, 1].map((side) => (
            <mesh
              key={`side-${side}`}
              position={[
                side * 0.95,
                -0.015,
                -0.68 + i * 0.151,
              ]}
            >
              <boxGeometry args={[0.48, 0.055, 0.065]} />
              <meshStandardMaterial
                color="#b9c2b4"
                metalness={0.9}
                roughness={0.24}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* PCB mounting points */}
      {[-1, 1].map((x) =>
        [-1, 1].map((z) => (
          <mesh
            key={`${x}-${z}`}
            position={[x * 1.65, -0.125, z * 1.25]}
          >
            <cylinderGeometry args={[0.09, 0.09, 0.025, 24]} />
            <meshStandardMaterial
              color="#b9c2b4"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
        ))
      )}
    </group>
  );
}

function SignalField() {
  const ref = useRef();

  const points = Array.from({ length: 65 }, (_, i) => ({
    x: Math.sin(i * 12.989) * 3.1,
    y: Math.cos(i * 4.231) * 2.4,
    z: Math.sin(i * 2.83) * 1.6,
  }));

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
    }
  });

  return (
    <group ref={ref}>
      {points.map((point, i) => (
        <mesh
          key={i}
          position={[point.x, point.y, point.z]}
        >
          <sphereGeometry
            args={[i % 7 === 0 ? 0.025 : 0.012, 8, 8]}
          />
          <meshBasicMaterial
            color={i % 5 === 0 ? "#a8ff35" : "#708b71"}
            transparent
            opacity={0.65}
          />
        </mesh>
      ))}
    </group>
  );
}

function LabScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [4.4, 3.6, 5.4], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} />
      <pointLight
        position={[-3, 2, -2]}
        intensity={2}
        color="#a8ff35"
      />

      <Float
        speed={0.65}
        rotationIntensity={0.05}
        floatIntensity={0.12}
      >
        <Chip />
      </Float>

      <SignalField />

      <gridHelper
        args={[18, 36, "#28362d", "#18231c"]}
        position={[0, -1.3, 0]}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0.7}
        maxPolarAngle={1.8}
        minAzimuthAngle={-0.65}
        maxAzimuthAngle={0.65}
      />
    </Canvas>
  );
}

function SignalTicker() {
  const disciplines = [
    "EMBEDDED C",
    "RTL DESIGN",
    "MICROCONTROLLERS",
    "PCB ENGINEERING",
    "COMMUNICATION PROTOCOLS",
    "HARDWARE DEBUGGING",
  ];

  return (
    <div className="home-ticker" aria-label="Engineering disciplines">
      <div className="home-ticker-track">
        {[0, 1].map((copy) => (
          <div className="home-ticker-group" key={copy}>
            {disciplines.map((discipline) => (
              <span key={discipline}>
                {discipline}
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-grid-overlay" />

        <div className="home-copy">
          <p className="home-eyebrow">
            ELECTRONICS / FIRMWARE / DIGITAL SYSTEMS
          </p>

          <h1>
            Sandesh
            <br />
            Jat<span className="home-period">.</span>
          </h1>

          <div className="home-intro">
            <span className="home-index">ENGINEER / 001</span>

            <p>
              I work where hardware meets software.
              <br />
              From register-level firmware to digital logic,
              <br className="desktop-break" />
              I build systems that do more than compile.
            </p>
          </div>

          <Link to="/work" className="home-primary-link">
            EXPLORE MY WORK <span>↗</span>
          </Link>

          <div className="home-specs">
            <span><i /> EMBEDDED FIRMWARE</span>
            <span><i /> DIGITAL DESIGN</span>
            <span><i /> ELECTRONICS</span>
          </div>
        </div>

        <div className="home-visual">
          <div className="home-visual-topline">
            <span>FIG. 001 / SILICON STUDY</span>
            <span className="home-live">
              <i /> LIVE RENDER
            </span>
          </div>

          <div className="home-scene-frame">
            <div className="home-orbit home-orbit-one" />
            <div className="home-orbit home-orbit-two" />

            <LabScene />

            <span className="home-crosshair home-crosshair-one">+</span>
            <span className="home-crosshair home-crosshair-two">+</span>
            <span className="home-coordinate home-coordinate-one">
              X 04.28
            </span>
            <span className="home-coordinate home-coordinate-two">
              SYS / 3D
            </span>
            <span className="home-scene-label">SJ / IC-001</span>
          </div>

          <div className="home-visual-caption">
            <span>SEMICONDUCTOR STUDY / 01</span>
            <span>DRAG TO INSPECT ↗</span>
          </div>

          <div className="home-vertical-label">
            INDEPENDENT ENGINEERING PORTFOLIO · 2026
          </div>
        </div>

        <div className="home-bottom-mark">
          <span>01 / 04</span>
          <span>BUILT WITH CURIOSITY. ENGINEERED WITH INTENT.</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      <SignalTicker />

      <section className="home-manifesto">
        <div className="home-section-label">
          <span>01</span>
          <span>THE WORKING PRINCIPLE</span>
          <i />
        </div>

        <div className="home-manifesto-grid">
          <h2>
            Understand
            <br />
            the system.
            <br />
            <span>Then build it.</span>
          </h2>

          <div className="home-manifesto-copy">
            <p className="home-manifesto-lead">
              Code is only one part of the machine.
            </p>

            <p>
              I enjoy working across the layers: understanding the
              hardware, writing firmware, integrating communication
              interfaces, and investigating what happens when a system
              behaves unexpectedly.
            </p>

            <p>
              My focus is embedded firmware and digital systems, with
              a hands-on interest in the electronics underneath them.
            </p>

            <Link to="/about" className="home-text-link">
              MORE ABOUT MY APPROACH <span>↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-featured">
        <div className="home-section-label">
          <span>02</span>
          <span>SELECTED ENGINEERING DIRECTIONS</span>
          <i />
        </div>

        <div className="home-feature-grid">
          <Link to="/work" className="home-feature-card firmware-card">
            <div className="home-feature-top">
              <span>FW / 001</span>
              <span>↗</span>
            </div>

            <div className="home-feature-graphic firmware-graphic">
              <div className="firmware-core">C</div>
              <span className="firmware-node node-a">GPIO</span>
              <span className="firmware-node node-b">CAN</span>
              <span className="firmware-node node-c">I²C</span>
              <span className="firmware-node node-d">SPI</span>
              <span className="firmware-node node-e">UART</span>
              <div className="firmware-ring ring-a" />
              <div className="firmware-ring ring-b" />
            </div>

            <div className="home-feature-content">
              <p>01 / EMBEDDED SYSTEMS</p>
              <h3>Firmware that talks to hardware.</h3>
              <span>DRIVERS · PERIPHERALS · INTEGRATION</span>
            </div>
          </Link>

          <Link to="/work" className="home-feature-card rtl-card">
            <div className="home-feature-top">
              <span>RTL / 002</span>
              <span>↗</span>
            </div>

            <div className="home-feature-graphic rtl-graphic">
              <div className="rtl-block block-one">FSM</div>
              <div className="rtl-block block-two">ALU</div>
              <div className="rtl-block block-three">REG</div>
              <div className="rtl-block block-four">PMP</div>
              <svg
                className="rtl-wires"
                viewBox="0 0 320 180"
                role="img"
                aria-label="Digital logic connections"
              >
                <path d="M30 45 H100 V85 H135" />
                <path d="M135 85 H190 V45 H280" />
                <path d="M135 85 V140 H220" />
                <path d="M220 140 H280" />
                <circle cx="135" cy="85" r="4" />
                <circle cx="220" cy="140" r="4" />
              </svg>
            </div>

            <div className="home-feature-content">
              <p>02 / DIGITAL ARCHITECTURE</p>
              <h3>Logic, one signal at a time.</h3>
              <span>VERILOG · FPGA · VERIFICATION</span>
            </div>
          </Link>

          <Link to="/work" className="home-feature-card pcb-card">
            <div className="home-feature-top">
              <span>PCB / 003</span>
              <span>↗</span>
            </div>

            <div className="home-feature-graphic pcb-graphic">
              <div className="pcb-chip">IC</div>
              <div className="pcb-trace trace-a" />
              <div className="pcb-trace trace-b" />
              <div className="pcb-trace trace-c" />
              <div className="pcb-trace trace-d" />
              <div className="pcb-pad pad-a" />
              <div className="pcb-pad pad-b" />
              <div className="pcb-pad pad-c" />
              <div className="pcb-pad pad-d" />
              <span className="pcb-coordinate">PCB / LAYOUT</span>
            </div>

            <div className="home-feature-content">
              <p>03 / HARDWARE DESIGN</p>
              <h3>From schematic to board.</h3>
              <span>KICAD · PCB LAYOUT · DEBUGGING</span>
            </div>
          </Link>
        </div>

        <div className="home-work-footer">
          <p>
            A FEW DIRECTIONS. MANY DETAILS UNDER THE HOOD.
          </p>

          <Link to="/work" className="home-primary-link">
            OPEN PROJECT ARCHIVE <span>↗</span>
          </Link>
        </div>
      </section>

      <section className="home-closing">
        <div className="home-section-label">
          <span>03</span>
          <span>NEXT ITERATION</span>
          <i />
        </div>

        <div className="home-closing-main">
          <p>HAVE A SYSTEM TO BUILD?</p>

          <h2>
            Let's make
            <br />
            it <span>work.</span>
          </h2>

          <Link to="/contact" className="home-primary-link">
            ESTABLISH CONNECTION <span>↗</span>
          </Link>
        </div>

        <div className="home-closing-footer">
          <span>SJ / ENGINEERING PORTFOLIO</span>
          <span>DESIGNED AROUND THE DETAILS.</span>
          <Link to="/contact">GET IN TOUCH ↗</Link>
        </div>
      </section>
    </div>
  );
}
