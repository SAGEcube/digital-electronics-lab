
import './App.css'
import { useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'

const projects = [
  {
    number: '01',
    type: 'EMBEDDED / SYSTEMS',
    title: 'Integrated Peripheral Firmware',
    description:
      'A unified firmware architecture bringing GPIO, CAN, I²C, SPI and UART together through reusable hardware abstraction wrappers.',
    tags: ['Embedded C', 'HAL', 'CAN', 'Segger'],
    code: 'FW_01',
  },
  {
    number: '02',
    type: 'DIGITAL / ARCHITECTURE',
    title: 'RV32I Processor',
    description:
      'A 32-bit RISC-V processor with a five-stage pipeline and a Physical Memory Protection checker, implemented on FPGA.',
    tags: ['Verilog', 'RISC-V', 'PMP', 'FPGA'],
    code: 'RTL_02',
  },
  {
    number: '03',
    type: 'HARDWARE / INTERFACES',
    title: 'USB to I²C Interface',
    description:
      'A custom PCB interface using the FT201XQ USB-I²C bridge, power regulation, schematic capture and PCB layout.',
    tags: ['KiCad', 'FT201XQ', 'PCB', 'ERC/DRC'],
    code: 'PCB_03',
  },
  {
    number: '04',
    type: 'RTL / VERIFICATION',
    title: 'PCA9555 GPIO Expander',
    description:
      'An RTL implementation of an I²C-controlled 16-bit GPIO expander with an FSM and ModelSim testbench.',
    tags: ['Verilog', 'I²C', 'FSM', 'ModelSim'],
    code: 'RTL_04',
  },
  {
    number: '05',
    type: 'VLSI / CIRCUIT DESIGN',
    title: 'Wallace Tree Multiplier',
    description:
      'A multiplier design exploring partial-product reduction, transmission-gate XOR logic and transistor-level layout.',
    tags: ['LTspice', 'Microwind', 'CMOS'],
    code: 'VLSI_05',
  },
  {
    number: '06',
    type: 'EMBEDDED / IOT',
    title: 'Air Guard',
    description:
      'An ESP32 master-slave sensor network exploring device communication and MQTT-based data exchange.',
    tags: ['ESP32', 'MQTT', 'Embedded'],
    code: 'IOT_06',
  },
]

function Chip() {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.25) * 0.12
    group.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.2) * 0.035
  })

  const pins = Array.from({ length: 10 }, (_, i) => i)

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

      {/* Main package */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.65, 0.45, 1.65]} />
        <meshStandardMaterial
          color="#111615"
          metalness={0.35}
          roughness={0.32}
        />
      </mesh>

      {/* Top face */}
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

 
      {/* Custom S circuit emblem */}
      <group position={[0, 0.31, 0]}>
        {/* Geometric S-shaped circuit path */}
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
          <meshStandardMaterial color="#a8ff35" emissive="#a8ff35" emissiveIntensity={0.8} />
        </mesh>

        <mesh position={[0.245, 0, -0.15]}>
          <boxGeometry args={[0.09, 0.018, 0.3]} />
          <meshStandardMaterial color="#a8ff35" emissive="#a8ff35" emissiveIntensity={0.8} />
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

        {/* Circuit connection nodes */}
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


      {/* Fine board traces */}
      {Array.from({ length: 8 }, (_, i) => (
        <group key={i}>
          <mesh position={[-1.2, -0.13, -1.1 + i * 0.3]}>
            <boxGeometry args={[1.2, 0.012, 0.018]} />
            <meshBasicMaterial color={i % 2 ? '#648b4a' : '#a8ff35'} />
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
              key={side}
              position={[(-0.68 + i * 0.151), -0.015, side * 0.95]}
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
              key={side}
              position={[side * 0.95, -0.015, (-0.68 + i * 0.151)]}
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

      {/* Board mounting points */}
      {[-1, 1].map((x) =>
        [-1, 1].map((z) => (
          <mesh key={`${x}-${z}`} position={[x * 1.65, -0.125, z * 1.25]}>
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
  )
}

function SignalField() {
  const ref = useRef()

  const points = Array.from({ length: 65 }, (_, i) => ({
    x: Math.sin(i * 12.989) * 3.1,
    y: Math.cos(i * 4.231) * 2.4,
    z: Math.sin(i * 2.83) * 1.6,
  }))

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.08
    }
  })

  return (
    <group ref={ref}>
      {points.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[i % 7 === 0 ? 0.025 : 0.012, 8, 8]} />
          <meshBasicMaterial
            color={i % 5 === 0 ? '#a8ff35' : '#708b71'}
            transparent
            opacity={0.65}
          />
        </mesh>
      ))}
    </group>
  )
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
      <pointLight position={[-3, 2, -2]} intensity={2} color="#a8ff35" />

      <Float speed={0.65} rotationIntensity={0.05} floatIntensity={0.12}>
        <Chip />
      </Float>

      <SignalField />

      <gridHelper
        args={[18, 36, '#28362d', '#18231c']}
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
  )
}

function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span>{children}</span>
      <span className="section-line" />
    </div>
  )
}

function App() {
  return (
    <main>
      <header className="topbar">
        <a className="wordmark" href="#home">
          SJ<span>®</span>
        </a>

        <div className="availability">
          <span className="live-dot" />
          OPEN TO ENGINEERING OPPORTUNITIES
        </div>

        <nav className="nav-links">
          <a href="#work">WORK</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT ↗</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">
            ELECTRONICS / FIRMWARE / DIGITAL SYSTEMS
          </p>

          <h1>
            Sandesh
            <br />
            Jat<span className="period">.</span>
          </h1>

          <div className="hero-bottom">
            <div className="hero-index">ENGINEER / 001</div>
            <p>
              I work where hardware meets software.
              <br />
              From register-level firmware to digital logic,
              <br />
              I build systems that do more than compile.
            </p>
          </div>

          <a href="#work" className="primary-link">
            EXPLORE SELECTED WORK <span>↘</span>
          </a>
        </div>

        <div className="hero-visual">
          <div className="visual-topline">
            <span>FIG. 001 / SILICON STUDY</span>
            <span>LIVE RENDER</span>
          </div>

          <div className="scene-frame">
            <LabScene />
            <div className="scene-crosshair crosshair-one">+</div>
            <div className="scene-crosshair crosshair-two">+</div>
            <div className="scene-coordinate coordinate-one">X 04.28</div>
            <div className="scene-coordinate coordinate-two">SYS / 3D</div>
          </div>

          <div className="visual-caption">
            <span>SEMICONDUCTOR STUDY / 01</span>
            <span>DRAG TO INSPECT ↗</span>
          </div>
        </div>

        <div className="hero-vertical">INDEPENDENT ENGINEERING PORTFOLIO · 2026</div>
      </section>

      <section className="ticker" aria-label="Technical disciplines">
        <div className="ticker-track">
          {Array.from({ length: 2 }, (_, i) => (
            <div className="ticker-group" key={i}>
              <span>EMBEDDED C</span><i />
              <span>RTL DESIGN</span><i />
              <span>MICROCONTROLLERS</span><i />
              <span>PCB ENGINEERING</span><i />
              <span>COMMUNICATION PROTOCOLS</span><i />
            </div>
          ))}
        </div>
      </section>

      <section className="work-section section-wrap" id="work">
        <SectionLabel number="01">SELECTED WORK / 2024—26</SectionLabel>

        <div className="section-heading">
          <h2>
            Built to work.
            <br />
            <span>Designed to understand.</span>
          </h2>
          <p>
            A selection of engineering projects spanning embedded firmware,
            digital architecture, hardware interfaces and circuit design.
          </p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className="project-row" key={project.code}>
              <div className="project-number">{project.number}</div>

              <div className="project-main">
                <p className="project-type">{project.type}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="project-meta">
                <span>{project.code}</span>
                <span className="project-arrow">↗</span>
              </div>
            </article>
          ))}
        </div>

        <p className="project-note">
          SELECTED ENGINEERING WORK <span>·</span> DETAILS AVAILABLE ON REQUEST
        </p>
      </section>

      <section className="about-section" id="about">
        <div className="section-wrap about-inner">
          <SectionLabel number="02">THE ENGINEER / BEHIND THE SYSTEM</SectionLabel>

          <div className="about-grid">
            <h2>
              Curious about
              <br />
              what happens
              <br />
              <span>under the hood.</span>
            </h2>

            <div className="about-copy">
              <p className="about-lead">
                I'm Sandesh, an Electronics and Communication Engineering
                graduate focused on embedded firmware and digital systems.
              </p>
              <p>
                My work moves between writing low-level C, integrating
                communication peripherals, designing RTL, and understanding
                the electronics that make a system behave the way it does.
              </p>
              <p>
                I care about the complete chain: the signal, the hardware,
                the driver, the application, and the fault that appears
                when they don't agree.
              </p>
              <div className="about-signature">
                <span>APPROACH / 001</span>
                <span>Understand first. Build deliberately.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="capabilities-section section-wrap">
        <SectionLabel number="03">CAPABILITIES / TOOLKIT</SectionLabel>

        <div className="capabilities-grid">
          <article className="capability">
            <span className="capability-index">A / 01</span>
            <h3>Firmware</h3>
            <p>Low-level software that connects code to physical behaviour.</p>
            <ul>
              <li>Embedded C / C++</li>
              <li>GPIO, timers, interrupts</li>
              <li>HAL and peripheral drivers</li>
              <li>ARM Cortex-M fundamentals</li>
              <li>FreeRTOS fundamentals</li>
            </ul>
          </article>

          <article className="capability">
            <span className="capability-index">B / 02</span>
            <h3>Communication</h3>
            <p>Moving data reliably between devices and subsystems.</p>
            <ul>
              <li>CAN / UART</li>
              <li>I²C / SPI</li>
              <li>MQTT / ESP32</li>
              <li>Protocol debugging</li>
              <li>Peripheral integration</li>
            </ul>
          </article>

          <article className="capability">
            <span className="capability-index">C / 03</span>
            <h3>Digital design</h3>
            <p>Building and verifying digital logic from the ground up.</p>
            <ul>
              <li>Verilog / SystemVerilog</li>
              <li>RTL and FSM design</li>
              <li>FPGA implementation</li>
              <li>RISC-V architecture</li>
              <li>Simulation and testbenches</li>
            </ul>
          </article>

          <article className="capability">
            <span className="capability-index">D / 04</span>
            <h3>Electronics</h3>
            <p>Understanding the physical systems behind the code.</p>
            <ul>
              <li>KiCad PCB design</li>
              <li>LTspice / Microwind</li>
              <li>Schematic and layout</li>
              <li>ERC / DRC checks</li>
              <li>Hardware debugging</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="method-section">
        <div className="section-wrap">
          <SectionLabel number="04">ENGINEERING NOTES</SectionLabel>

          <div className="method-grid">
            <h2>
              From signal
              <br />
              to <span>system.</span>
            </h2>

            <div className="method-steps">
              <div><span>01</span><p>Understand the hardware and its constraints.</p></div>
              <div><span>02</span><p>Define interfaces, states and failure cases.</p></div>
              <div><span>03</span><p>Implement, integrate and test incrementally.</p></div>
              <div><span>04</span><p>Debug with evidence, not assumptions.</p></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="contact-section" id="contact">
        <div className="section-wrap">
          <SectionLabel number="05">CONTACT / NEXT ITERATION</SectionLabel>

          <div className="contact-main">
            <p>HAVE A SYSTEM TO BUILD?</p>
            <h2>
              Let's make
              <br />
              it <span>work.</span>
            </h2>
            <a
              className="contact-link"
              href="mailto:sandeshjat813@gmail.com"
            >
              GET IN TOUCH <span>↗</span>
            </a>
          </div>

          <div className="footer-bottom">
            <a className="wordmark" href="#home">SJ<span>®</span></a>
            <p>BUILT WITH CURIOSITY. ENGINEERED WITH INTENT.</p>
            <div>
              <a href="#work">WORK</a>
              <a href="#about">ABOUT</a>
              <a href="https://github.com/SAGEcube" target="_blank" rel="noreferrer">GITHUB ↗</a>
              <a href="www.linkedin.com/in/sandesh-jat-b0377728a" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App
