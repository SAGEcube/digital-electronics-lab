
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Line, OrbitControls } from "@react-three/drei";

const GREEN = "#b7f75b";
const METAL = "#9eaa91";

function Chip({ position = [0, 0, 0], size = [1, 0.22, 1], color = GREEN }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#252b23" metalness={0.72} roughness={0.3} />
      </mesh>
      <mesh position={[0, size[1] / 2 + 0.015, 0]}>
        <boxGeometry args={[size[0] * 0.68, 0.025, size[2] * 0.68]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.28} />
      </mesh>
      {Array.from({ length: 6 }, (_, i) => (
        <group key={i}>
          <mesh position={[-size[0] * 0.3 + i * size[0] * 0.12, 0, size[2] / 2 + 0.065]}>
            <boxGeometry args={[0.045, 0.055, 0.14]} />
            <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.28} />
          </mesh>
          <mesh position={[-size[0] * 0.3 + i * size[0] * 0.12, 0, -size[2] / 2 - 0.065]}>
            <boxGeometry args={[0.045, 0.055, 0.14]} />
            <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.28} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function FirmwareModel() {
  const modules = [
    { label: "GPIO", p: [-1.05, 0.18, 0.05] },
    { label: "CAN", p: [1.05, 0.18, 0.05] },
    { label: "I2C", p: [0, 0.18, -0.95] },
    { label: "SPI", p: [0, 0.18, 0.95] },
  ];

  return (
    <group>
      <Chip size={[1, 0.2, 0.82]} />
      {modules.map(({ label, p }) => (
        <group key={label} position={p}>
          <mesh>
            <boxGeometry args={[0.48, 0.13, 0.4]} />
            <meshStandardMaterial color="#34442d" metalness={0.5} roughness={0.34} />
          </mesh>
          <mesh position={[0, 0.085, 0]}>
            <boxGeometry args={[0.22, 0.035, 0.18]} />
            <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={0.5} />
          </mesh>
          <Line
            points={[[0, -0.04, 0], [-p[0] * 0.72, -0.04, -p[2] * 0.72]]}
            color={GREEN}
            lineWidth={1.4}
          />
        </group>
      ))}
      <Chip position={[0, 0.025, 0]} size={[0.62, 0.2, 0.55]} color="#d6f6b5" />
    </group>
  );
}

function ProcessorModel() {
  return (
    <group>
      <Chip size={[1.8, 0.2, 1.35]} />
      {["IF", "ID", "EX", "MEM", "WB"].map((stage, i) => (
        <group key={stage} position={[-0.64 + i * 0.32, 0.16, 0]}>
          <mesh>
            <boxGeometry args={[0.26, 0.075, 0.58]} />
            <meshStandardMaterial
              color={i === 2 ? GREEN : "#52634a"}
              emissive={i === 2 ? GREEN : "#25351f"}
              emissiveIntensity={0.3}
            />
          </mesh>
          <mesh position={[0, 0.065, 0]}>
            <sphereGeometry args={[0.035, 10, 10]} />
            <meshBasicMaterial color={GREEN} />
          </mesh>
        </group>
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <Line
          key={i}
          points={[[-0.68 + i * 0.19, 0.12, -0.68], [-0.68 + i * 0.19, 0.12, -0.92]]}
          color={GREEN}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

function PCBModel() {
  return (
    <group>
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[2.25, 0.12, 1.55]} />
        <meshStandardMaterial color="#17442d" metalness={0.5} roughness={0.4} />
      </mesh>
      <Chip position={[0, 0.04, 0]} size={[0.72, 0.2, 0.62]} />
      <Chip position={[-0.72, 0, -0.4]} size={[0.35, 0.1, 0.28]} color={METAL} />
      <Chip position={[0.72, 0, 0.4]} size={[0.35, 0.1, 0.28]} color={METAL} />
      {[-0.7, -0.4, 0.4, 0.7].map((x) => (
        <Line
          key={x}
          points={[[x, -0.045, -0.65], [x, -0.045, -0.25], [x * 0.55, -0.045, 0]]}
          color={GREEN}
          lineWidth={1.2}
        />
      ))}
      <mesh position={[0, 0.015, -0.68]}>
        <boxGeometry args={[0.48, 0.13, 0.16]} />
        <meshStandardMaterial color="#c2c7b9" metalness={0.85} roughness={0.25} />
      </mesh>
    </group>
  );
}

function GPIOModel() {
  return (
    <group>
      <Chip size={[1.12, 0.22, 1.02]} />
      {Array.from({ length: 8 }, (_, i) => (
        <group key={i}>
          <mesh position={[-0.43 + i * 0.123, 0.06, 0.63]}>
            <boxGeometry args={[0.05, 0.05, 0.26]} />
            <meshStandardMaterial color={METAL} metalness={0.8} />
          </mesh>
          <mesh position={[-0.43 + i * 0.123, 0.06, -0.63]}>
            <boxGeometry args={[0.05, 0.05, 0.26]} />
            <meshStandardMaterial color={METAL} metalness={0.8} />
          </mesh>
          <mesh position={[-0.43 + i * 0.123, 0.145, 0]}>
            <sphereGeometry args={[0.04, 10, 10]} />
            <meshBasicMaterial color={i % 2 === 0 ? GREEN : "#687c5a"} />
          </mesh>
        </group>
      ))}
      <Line points={[[-0.9, 0.02, 0], [-0.65, 0.02, 0], [-0.5, 0.02, 0.2]]} color={GREEN} />
      <Line points={[[0.9, 0.02, 0], [0.65, 0.02, 0], [0.5, 0.02, -0.2]]} color={GREEN} />
    </group>
  );
}

function Gate({ position }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.4, 0.14, 0.32]} />
        <meshStandardMaterial color="#293925" metalness={0.45} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[0.23, 0.025, 0.18]} />
        <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

function MultiplierModel() {
  return (
    <group>
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 4 - row }, (_, col) => (
          <mesh key={`${row}-${col}`} position={[-0.68 + col * 0.44 + row * 0.22, 0.14, -0.55 + row * 0.36]}>
            <sphereGeometry args={[0.065, 12, 12]} />
            <meshBasicMaterial color={GREEN} />
          </mesh>
        ))
      )}
      <Gate position={[-0.48, 0, 0.35]} />
      <Gate position={[0.04, 0, 0.35]} />
      <Gate position={[0.56, 0, 0.35]} />
      <Line points={[[-0.68, 0.08, -0.42], [-0.48, 0.08, 0.15]]} color={GREEN} />
      <Line points={[[0, 0.08, -0.18], [0.04, 0.08, 0.15]]} color={GREEN} />
      <Line points={[[0.48, 0.08, 0], [0.56, 0.08, 0.15]]} color={GREEN} />
      <Line points={[[-0.48, 0, 0.55], [0.04, 0, 0.55], [0.56, 0, 0.55]]} color={METAL} />
    </group>
  );
}

function SensorNode({ position }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.44, 0.14, 0.36]} />
        <meshStandardMaterial color="#233523" metalness={0.55} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.095, 0]}>
        <boxGeometry args={[0.17, 0.05, 0.15]} />
        <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.16, 0.12, -0.08]}>
        <sphereGeometry args={[0.03, 10, 10]} />
        <meshBasicMaterial color={GREEN} />
      </mesh>
    </group>
  );
}

function IoTModel() {
  return (
    <group>
      <Chip size={[0.85, 0.16, 0.68]} />
      <SensorNode position={[-1, 0.13, -0.4]} />
      <SensorNode position={[1, 0.13, -0.4]} />
      <SensorNode position={[0, 0.13, 0.95]} />
      <Line points={[[0, 0.12, 0], [-1, 0.13, -0.4]]} color={GREEN} />
      <Line points={[[0, 0.12, 0], [1, 0.13, -0.4]]} color={GREEN} />
      <Line points={[[0, 0.12, 0], [0, 0.13, 0.95]]} color={GREEN} />
      {[[-1, 0.33, -0.4], [1, 0.33, -0.4], [0, 0.33, 0.95]].map((p, i) => (
        <mesh key={i} position={p}>
          <torusGeometry args={[0.2, 0.012, 8, 28]} />
          <meshBasicMaterial color={GREEN} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

const modelMap = {
  firmware: FirmwareModel,
  processor: ProcessorModel,
  pcb: PCBModel,
  gpio: GPIOModel,
  multiplier: MultiplierModel,
  iot: IoTModel,
};

export default function Project3DVisual({ type }) {
  const controls = useRef(null);
  const Model = modelMap[type] || FirmwareModel;

  return (
    <div className="work-visual work-3d-visual">
      <Canvas
        camera={{ position: [3.4, 2.6, 4.1], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.15} />
        <directionalLight position={[4, 5, 4]} intensity={2} color="#e9ffd9" />
        <pointLight position={[-3, 2, -2]} intensity={12} color={GREEN} distance={8} />
        <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.16}>
          <Model />
        </Float>
        <OrbitControls
          ref={controls}
          enablePan={false}
          enableZoom={false}
          enableRotate
          autoRotate
          autoRotateSpeed={0.65}
          minPolarAngle={0.55}
          maxPolarAngle={2.45}
        />
      </Canvas>
      <span className="work-3d-hint">DRAG TO ROTATE ↗</span>
    </div>
  );
}
