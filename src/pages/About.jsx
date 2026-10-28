
import { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls } from "@react-three/drei";
import { Link } from "react-router-dom";
import * as THREE from "three";
import "./About.css";

const domains = [
  {
    id: "firmware",
    number: "01",
    name: "Embedded firmware",
    subtitle: "Hardware that responds",
    description:
      "Building firmware around peripherals, communication protocols, hardware abstraction and system-level behaviour.",
    tools: ["Embedded C", "GPIO", "CAN", "I²C", "SPI", "UART", "FreeRTOS"],
  },
  {
    id: "digital",
    number: "02",
    name: "Digital design",
    subtitle: "Logic that becomes hardware",
    description:
      "Exploring RTL design, finite-state machines, processor architecture, verification and FPGA implementation.",
    tools: ["Verilog", "SystemVerilog", "RISC-V", "FPGA", "FSM", "PMP"],
  },
  {
    id: "hardware",
    number: "03",
    name: "Hardware design",
    subtitle: "From schematic to board",
    description:
      "Connecting circuit-level thinking with PCB design, component selection, layout and electrical checks.",
    tools: ["KiCad", "LTspice", "PCB layout", "ERC / DRC", "Microwind"],
  },
];

const timeline = [
  {
    number: "01",
    label: "FOUNDATION",
    title: "Electronics & Communication",
    detail:
      "Building fundamentals in digital electronics, circuit design and computer architecture.",
    meta: "B.Tech · IIIT Nagpur",
  },
  {
    number: "02",
    label: "DIGITAL SYSTEMS",
    title: "From logic to architecture",
    detail:
      "Working with RTL, processor design, FPGA implementation and hardware verification.",
    meta: "Verilog · RISC-V · FPGA",
  },
  {
    number: "03",
    label: "EMBEDDED FIRMWARE",
    title: "Bringing peripherals together",
    detail:
      "Developing reusable firmware interfaces and working across communication protocols.",
    meta: "C · CAN · I²C · SPI · UART",
  },
  {
    number: "04",
    label: "SYSTEM INTEGRATION",
    title: "Thinking beyond one component",
    detail:
      "Exploring how firmware, controllers, communication and fault handling work together in a larger system.",
    meta: "Embedded systems · Vehicle electronics",
  },
];

function CircuitTrace({ points, color = "#b7f75b" }) {
  return (
    <Line
      points={points}
      color={color}
      lineWidth={1.2}
      transparent
      opacity={0.65}
    />
  );
}

function SiliconCore() {
  const core = useState(null)[0];

  useFrame(({ clock, pointer }, delta) => {
    if (!core) return;
    core.rotation.y += delta * 0.18;
    core.rotation.x += (pointer.y * 0.12 - core.rotation.x) * delta * 2;
    core.rotation.z += (pointer.x * 0.12 - core.rotation.z) * delta * 2;
    core.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.08;
  });

  return (
    <group ref={(value) => {
      if (value && !core) {
        // The ref is assigned below through the stable group component.
      }
    }}>
      <CoreAssembly />
    </group>
  );
}

function CoreAssembly() {
  const group = useState({ current: null })[0];

  useFrame(({ clock, pointer }, delta) => {
    const object = group.current;
    if (!object) return;
    object.rotation.y += delta * 0.18;
    object.rotation.x += (pointer.y * 0.12 - object.rotation.x) * delta * 2;
    object.rotation.z += (pointer.x * 0.12 - object.rotation.z) * delta * 2;
    object.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.08;
  });

  const traces = [
    [[-1.65, 0.35, 0], [-1.1, 0.35, 0], [-0.82, 0.12, 0]],
    [[1.65, -0.35, 0], [1.1, -0.35, 0], [0.82, -0.12, 0]],
    [[0, 1.2, 0], [0, 0.88, 0], [0.35, 0.6, 0]],
    [[0, -1.2, 0], [0, -0.88, 0], [-0.35, -0.6, 0]],
    [[-1.5, -0.55, 0], [-1.05, -0.55, 0], [-0.8, -0.35, 0]],
    [[1.5, 0.55, 0], [1.05, 0.55, 0], [0.8, 0.35, 0]],
  ];

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[1.55, 1.25, 0.32]} />
        <meshStandardMaterial
          color="#20291b"
          metalness={0.72}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[0, 0, 0.17]}>
        <boxGeometry args={[1.28, 0.98, 0.035]} />
        <meshStandardMaterial
          color="#11150f"
          metalness={0.3}
          roughness={0.45}
          emissive="#24341a"
          emissiveIntensity={0.6}
        />
      </mesh>

      <mesh position={[0, 0, 0.2]}>
        <boxGeometry args={[0.63, 0.48, 0.025]} />
        <meshStandardMaterial
          color="#b7f75b"
          emissive="#8fc83e"
          emissiveIntensity={1.5}
          metalness={0.3}
          roughness={0.25}
        />
      </mesh>

      <mesh position={[0, 0, 0.22]}>
        <boxGeometry args={[0.46, 0.32, 0.025]} />
        <meshStandardMaterial color="#1a2415" metalness={0.4} roughness={0.3} />
      </mesh>

      {Array.from({ length: 8 }, (_, i) => {
        const x = -0.58 + i * 0.165;
        return (
          <group key={`pin-${i}`}>
            <mesh position={[x, 0.68, 0]}>
              <boxGeometry args={[0.065, 0.2, 0.13]} />
              <meshStandardMaterial color="#a4ac96" metalness={0.85} roughness={0.22} />
            </mesh>
            <mesh position={[x, -0.68, 0]}>
              <boxGeometry args={[0.065, 0.2, 0.13]} />
              <meshStandardMaterial color="#a4ac96" metalness={0.85} roughness={0.22} />
            </mesh>
          </group>
        );
      })}

      {Array.from({ length: 6 }, (_, i) => {
        const y = -0.42 + i * 0.168;
        return (
          <group key={`side-pin-${i}`}>
            <mesh position={[-0.83, y, 0]}>
              <boxGeometry args={[0.18, 0.06, 0.13]} />
              <meshStandardMaterial color="#a4ac96" metalness={0.85} roughness={0.22} />
            </mesh>
            <mesh position={[0.83, y, 0]}>
              <boxGeometry args={[0.18, 0.06, 0.13]} />
              <meshStandardMaterial color="#a4ac96" metalness={0.85} roughness={0.22} />
            </mesh>
          </group>
        );
      })}

      {traces.map((points, i) => (
        <CircuitTrace key={i} points={points} />
      ))}

      {[
        [-1.65, 0.35, 0],
        [1.65, -0.35, 0],
        [0, 1.2, 0],
        [0, -1.2, 0],
      ].map((position, i) => (
        <mesh key={`node-${i}`} position={position}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshStandardMaterial
            color="#b7f75b"
            emissive="#b7f75b"
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  );
}

function WorkbenchScene() {
  return (
    <>
      <color attach="background" args={["#10130e"]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color="#e7ffd0" />
      <pointLight position={[-3, 0, 2]} intensity={16} color="#8ccf4a" />
      <pointLight position={[2, -2, -2]} intensity={8} color="#3f6332" />

      <Float speed={1.4} rotationIntensity={0.14} floatIntensity={0.25}>
        <CoreAssembly />
      </Float>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(Math.PI * 2) / 3}
        autoRotate
        autoRotateSpeed={0.35}
      />

      <gridHelper
        args={[12, 28, "#36452a", "#20291b"]}
        position={[0, -1.5, 0]}
      />
    </>
  );
}

export default function About() {
  const [activeDomain, setActiveDomain] = useState("firmware");
  const selected = domains.find((domain) => domain.id === activeDomain);

  return (
    <div className="about-page">
      <section className="about-lab-hero">
        <div className="about-lab-grid" />

        <div className="about-lab-topline">
          <span>ENGINEERING LAB / PROFILE_002</span>
          <span>INTERACTIVE SYSTEM / ONLINE</span>
        </div>

        <div className="about-lab-copy">
          <p className="about-eyebrow">INSIDE THE ENGINEER</p>
          <h1>
            Curiosity
            <br />
            <span>is the core.</span>
          </h1>
          <p>
            Electronics engineer exploring the boundary between hardware,
            firmware and digital logic.
          </p>
          <div className="about-lab-meta">
            <span><i /> SYSTEMS THINKING</span>
            <span><i /> HARDWARE + SOFTWARE</span>
          </div>
        </div>

        <div className="about-chip-stage">
          <Canvas
            camera={{ position: [3.3, 2.6, 4.7], fov: 40 }}
            dpr={[1, 1.6]}
            gl={{ antialias: true, alpha: true }}
          >
            <WorkbenchScene />
          </Canvas>
          <div className="about-chip-label">
            <span>FIG 01</span>
            <span>SILICON CORE / SJ-01</span>
          </div>
          <div className="about-chip-hint">DRAG TO ROTATE</div>
        </div>

        <div className="about-lab-footer">
          <span>DESIGN / IMPLEMENT / VERIFY</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      <section className="about-manifesto">
        <p className="about-eyebrow">01 / ENGINEERING PHILOSOPHY</p>
        <h2>
          Don't just make it work.
          <br />
          <span>Understand why it works.</span>
        </h2>
        <p>
          I enjoy understanding a system from the signal level up: what the
          hardware is doing, how the firmware responds, and why the complete
          system behaves the way it does. My favourite problems sit where
          these layers meet.
        </p>
      </section>

      <section className="about-domain-section">
        <div className="about-section-heading">
          <div>
            <p className="about-eyebrow">02 / SELECT A DOMAIN</p>
            <h2>Explore my toolkit<span>.</span></h2>
          </div>
          <p>Choose a domain to inspect its tools and focus.</p>
        </div>

        <div className="about-domain-layout">
          <div className="about-domain-list">
            {domains.map((domain) => (
              <button
                key={domain.id}
                className={`about-domain-tab ${activeDomain === domain.id ? "active" : ""}`}
                onClick={() => setActiveDomain(domain.id)}
                type="button"
              >
                <span>{domain.number}</span>
                <strong>{domain.name}</strong>
                <span className="about-domain-arrow">↗</span>
              </button>
            ))}
          </div>

          <article className="about-domain-detail" key={selected.id}>
            <div className="about-domain-detail-top">
              <span>DOMAIN / {selected.number}</span>
              <span className="about-domain-live"><i /> ACTIVE</span>
            </div>
            <h3>{selected.name}</h3>
            <p className="about-domain-subtitle">{selected.subtitle}</p>
            <p className="about-domain-description">{selected.description}</p>
            <div className="about-domain-tools">
              {selected.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
            <Link to="/work">EXPLORE RELATED PROJECTS ↗</Link>
          </article>
        </div>
      </section>

      <section className="about-timeline-section">
        <div className="about-section-heading">
          <div>
            <p className="about-eyebrow">03 / DEVELOPMENT LOG</p>
            <h2>A journey in progress<span>.</span></h2>
          </div>
          <p>Every project adds another layer of understanding.</p>
        </div>

        <div className="about-timeline">
          {timeline.map((item) => (
            <article className="about-timeline-item" key={item.number}>
              <div className="about-timeline-number">{item.number}</div>
              <div className="about-timeline-node"><i /></div>
              <div className="about-timeline-content">
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <small>{item.meta}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-outro">
        <div className="about-outro-core">
          <div className="about-outro-ring" />
          <div className="about-outro-ring ring-two" />
          <div className="about-outro-dot" />
          <span>SJ</span>
        </div>
        <div>
          <p className="about-eyebrow">04 / NEXT ITERATION</p>
          <h2>
            Still learning.
            <br />
            <span>Still building.</span>
          </h2>
          <p>
            I'm interested in engineering challenges that demand curiosity,
            careful debugging and a system-level view.
          </p>
          <div className="about-outro-links">
            <Link to="/work">VIEW PROJECTS ↗</Link>
            <Link to="/contact">ESTABLISH CONNECTION ↗</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
