
import { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls } from "@react-three/drei";
import { Link } from "react-router-dom";
import "./Contact.css";

const EMAIL = "sandeshjat813@gmail.com";

const channels = [
  {
    id: "email",
    number: "01",
    name: "Email",
    detail: "For opportunities and direct conversations",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    color: "#b7f75b",
  },
  {
    id: "github",
    number: "02",
    name: "GitHub",
    detail: "Explore code and engineering projects",
    value: "github.com/SAGEcube",
    href: "https://github.com/SAGEcube",
    color: "#b7f75b",
  },
  {
    id: "linkedin",
    number: "03",
    name: "LinkedIn",
    detail: "Connect professionally",
    value: "LinkedIn profile",
    href: "www.linkedin.com/in/sandesh-jat-b0377728a",
    color: "#b7f75b",
  },
];

function NetworkNode({ position, active, onClick, label }) {
  const mesh = useState({ current: null })[0];

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 2.2 + position[0]) * 0.08;
    mesh.current.scale.setScalar(active ? 1.3 : pulse);
  });

  return (
    <group position={position}>
      <mesh
        ref={mesh}
        onClick={(event) => {
          event.stopPropagation();
          onClick();
        }}
      >
        <sphereGeometry args={[active ? 0.13 : 0.09, 24, 24]} />
        <meshStandardMaterial
          color={active ? "#d8ffad" : "#b7f75b"}
          emissive="#9edb51"
          emissiveIntensity={active ? 3 : 1.6}
          roughness={0.3}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[active ? 0.23 : 0.16, 20, 20]} />
        <meshBasicMaterial
          color="#b7f75b"
          transparent
          opacity={active ? 0.15 : 0.06}
        />
      </mesh>
    </group>
  );
}

function NetworkScene({ active, onSelect }) {
  const root = useState({ current: null })[0];

  const points = [
    [0, 0, 0],
    [-1.65, 0.85, 0],
    [1.65, 0.85, 0],
    [0, -1.15, 0.25],
    [-1.9, -0.35, -0.5],
    [1.9, -0.35, -0.5],
    [-0.8, 1.5, -0.7],
    [0.8, 1.5, -0.7],
    [-0.8, -1.55, -0.5],
    [0.8, -1.55, -0.5],
  ];

  useFrame(({ clock }, delta) => {
    if (!root.current) return;
    root.current.rotation.y = Math.sin(clock.elapsedTime * 0.22) * 0.16;
    root.current.rotation.x = Math.sin(clock.elapsedTime * 0.17) * 0.06;
    root.current.position.y = Math.sin(clock.elapsedTime * 0.55) * 0.05;
  });

  return (
    <>
      <color attach="background" args={["#10130e"]} />
      <ambientLight intensity={1.1} />
      <pointLight position={[0, 1, 3]} intensity={18} color="#b7f75b" />
      <pointLight position={[-3, -1, 2]} intensity={7} color="#6c9d42" />

      <group ref={root}>
        {points.slice(1).map((point, i) => (
          <Line
            key={`line-${i}`}
            points={[points[0], point]}
            color="#8dbb60"
            transparent
            opacity={i < 3 ? 0.8 : 0.26}
            lineWidth={i < 3 ? 1.5 : 0.8}
          />
        ))}

        <Line
          points={[points[1], points[4], points[8], points[3], points[9], points[5], points[2]]}
          color="#54723e"
          transparent
          opacity={0.35}
          lineWidth={1}
        />

        {points.map((point, i) => (
          <NetworkNode
            key={`node-${i}`}
            position={point}
            active={
              (active === "email" && i === 1) ||
              (active === "github" && i === 2) ||
              (active === "linkedin" && i === 3) ||
              (!active && i === 0)
            }
            onClick={() => {
              if (i === 1) onSelect("email");
              else if (i === 2) onSelect("github");
              else if (i === 3) onSelect("linkedin");
              else onSelect(null);
            }}
          />
        ))}

        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshBasicMaterial
            color="#b7f75b"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>

        <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.2}>
          <mesh>
            <icosahedronGeometry args={[0.18, 1]} />
            <meshStandardMaterial
              color="#d8ffad"
              emissive="#b7f75b"
              emissiveIntensity={2}
              metalness={0.3}
              roughness={0.2}
            />
          </mesh>
        </Float>
      </group>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(Math.PI * 2) / 3}
        autoRotate
        autoRotateSpeed={0.25}
      />
    </>
  );
}

export default function Contact() {
  const [active, setActive] = useState(null);
  const [copied, setCopied] = useState(false);

  const selected = channels.find((channel) => channel.id === active);

  async function copyEmail() {
    if (EMAIL === "YOUR_EMAIL@example.com") {
      setCopied(false);
      return;
    }

    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-network-hero">
        <div className="contact-network-grid" />

        <div className="contact-network-topline">
          <span>COMMUNICATION NETWORK / 003</span>
          <span>STATUS: LISTENING</span>
        </div>

        <div className="contact-network-copy">
          <p className="contact-eyebrow">
            <i /> CHANNEL OPEN
          </p>
          <h1>
            Make the
            <br />
            <span>connection.</span>
          </h1>
          <p>
            Engineering ideas become better when they're shared. Choose a
            channel, send a signal, and let's start a conversation.
          </p>
          <div className="contact-network-stats">
            <span>03 CHANNELS</span>
            <span>01 CONNECTION AT A TIME</span>
          </div>
        </div>

        <div className="contact-network-stage">
          <Canvas
            camera={{ position: [0, 0, 5.7], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
          >
            <NetworkScene active={active} onSelect={setActive} />
          </Canvas>
          <div className="contact-network-caption">
            <span>NETWORK / NODE MAP</span>
            <span>DRAG TO ROTATE · SELECT A NODE</span>
          </div>
        </div>

        <div className="contact-network-footer">
          <span>TRANSMISSION READY</span>
          <span>SCROLL TO CONNECT ↓</span>
        </div>
      </section>

      <section className="contact-channel-section">
        <div className="contact-section-heading">
          <div>
            <p className="contact-eyebrow">01 / SELECT A CHANNEL</p>
            <h2>Where should we connect<span>?</span></h2>
          </div>
          <p>Choose a channel to highlight it in the network above.</p>
        </div>

        <div className="contact-channel-grid">
          {channels.map((channel) => (
            <button
              type="button"
              key={channel.id}
              className={`contact-channel-card ${active === channel.id ? "active" : ""}`}
              onClick={() =>
                setActive(active === channel.id ? null : channel.id)
              }
            >
              <div className="contact-channel-top">
                <span>{channel.number} / NODE</span>
                <span>↗</span>
              </div>
              <div className="contact-channel-indicator"><i /></div>
              <h3>{channel.name}</h3>
              <p>{channel.detail}</p>
              <span className="contact-channel-value">{channel.value}</span>
              <span className="contact-channel-action">
                {active === channel.id ? "NODE SELECTED ✓" : "SELECT NODE ↗"}
              </span>
            </button>
          ))}
        </div>

        {selected && (
          <div className="contact-selected-panel" key={selected.id}>
            <div>
              <p className="contact-eyebrow">ACTIVE CONNECTION / {selected.number}</p>
              <h3>{selected.name} channel selected.</h3>
              <p>{selected.detail}</p>
            </div>
            {selected.id === "email" ? (
              <a href={selected.href}>OPEN EMAIL ↗</a>
            ) : (
              <a href={selected.href} target="_blank" rel="noreferrer">
                OPEN {selected.name.toUpperCase()} ↗
              </a>
            )}
          </div>
        )}

        <button
          type="button"
          className="contact-copy-button"
          onClick={copyEmail}
          disabled={EMAIL === "YOUR_EMAIL@example.com"}
          title={
            EMAIL === "YOUR_EMAIL@example.com"
              ? "Add your email address in Contact.jsx first"
              : "Copy your email address"
          }
        >
          {copied
            ? "EMAIL COPIED ✓"
            : EMAIL === "YOUR_EMAIL@example.com"
              ? "ADD YOUR EMAIL TO ENABLE COPY"
              : "COPY EMAIL ADDRESS +"}
        </button>
      </section>

      <section className="contact-terminal-section">
        <div className="contact-terminal">
          <div className="contact-terminal-bar">
            <div><i /><i /><i /></div>
            <span>connection_protocol.log</span>
            <span>LIVE</span>
          </div>
          <div className="contact-terminal-body">
            <p><span>guest@portfolio:~$</span> ping sandesh-jat</p>
            <p className="contact-terminal-ok">[OK] Host discovered.</p>
            <p className="contact-terminal-ok">[OK] Contact channels available.</p>
            <p><span>guest@portfolio:~$</span> initiate_handshake</p>
            <p className="contact-terminal-message">
              A good conversation can be the beginning of a great build.
            </p>
            <p><span>guest@portfolio:~$</span> <i className="contact-terminal-cursor" /></p>
          </div>
        </div>
      </section>

      <section className="contact-last-call">
        <p className="contact-eyebrow">02 / ENDPOINT</p>
        <h2>
          Have a good
          <br />
          <span>problem to solve?</span>
        </h2>
        <p>
          I'd love to hear about embedded systems, digital hardware, firmware
          opportunities or a technical idea worth exploring.
        </p>
        <a href={`mailto:${EMAIL}`}>INITIATE CONTACT ↗</a>
        <div className="contact-last-links">
          <Link to="/work">EXPLORE PROJECTS</Link>
          <Link to="/about">BACK TO THE LAB</Link>
        </div>
      </section>

      <footer className="contact-network-bottom">
        <span>S.JAT / ENGINEERING PORTFOLIO</span>
        <span>CONNECTION STATE: READY <i /></span>
      </footer>
    </div>
  );
}
