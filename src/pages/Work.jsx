
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Project3DVisual from "../components/Project3DVisual";
import "./Work.css";

const projects = [
  {
    id: "01",
    code: "FW_01",
    category: "FIRMWARE",
    type: "Embedded / Systems",
    title: "Integrated Peripheral Firmware",
    description:
      "A unified firmware architecture integrating GPIO, CAN, I²C, SPI and UART through reusable hardware abstraction wrappers.",
    tags: ["Embedded C", "HAL", "CAN", "I²C", "SPI", "UART"],
    repo: "",
    visual: "firmware",
    status: "REPOSITORY NOT LINKED",
  },
  {
    id: "02",
    code: "RTL_02",
    category: "DIGITAL DESIGN",
    type: "Digital / Architecture",
    title: "RV32I Processor",
    description:
      "A 32-bit RISC-V processor with a five-stage pipeline and a Physical Memory Protection checker, implemented on FPGA.",
    tags: ["Verilog", "RISC-V", "PMP", "FPGA"],
    repo: "https://github.com/SAGEcube/RISCV-with-Physical-Memory-Protection-",
    visual: "processor",
    status: "REPOSITORY LINKED",
  },
  {
    id: "03",
    code: "PCB_03",
    category: "HARDWARE",
    type: "Hardware / Interfaces",
    title: "USB to I²C Interface",
    description:
      "A custom USB-to-I²C PCB using the FT201XQ bridge IC, with power regulation, schematic capture and board layout.",
    tags: ["KiCad", "FT201XQ", "PCB", "ERC / DRC"],
    repo: "https://github.com/SAGEcube/USB-to-I2C-converter-module-based-on-FT201X-IC",
    visual: "pcb",
    status: "REPOSITORY LINKED",
  },
  {
    id: "04",
    code: "RTL_04",
    category: "RTL & VERIFICATION",
    type: "Digital / Peripheral",
    title: "PCA9555 GPIO Expander",
    description:
      "An RTL implementation of an I²C-controlled 16-bit GPIO expander, using a finite-state machine and ModelSim testbench.",
    tags: ["Verilog", "I²C", "FSM", "ModelSim"],
    repo: "https://github.com/SAGEcube/PCA9555-NXP-Semiconductors",
    visual: "gpio",
    status: "REPOSITORY LINKED",
  },
  {
    id: "05",
    code: "VLSI_05",
    category: "VLSI DESIGN",
    type: "VLSI / Circuit Design",
    title: "Wallace Tree Multiplier",
    description:
      "A multiplier design exploring partial-product reduction, transmission-gate XOR logic and transistor-level layout.",
    tags: ["LTspice", "Microwind", "CMOS"],
    repo: "https://github.com/SAGEcube/2_bit_wallace_multiplier-_TG_optimized",
    visual: "multiplier",
    status: "REPOSITORY LINKED",
  },
  {
    id: "06",
    code: "IOT_06",
    category: "EMBEDDED / IoT",
    type: "Embedded / Connected Systems",
    title: "Air Guard",
    description:
      "An ESP32 master-slave sensor network exploring sensor communication and MQTT-based data exchange.",
    tags: ["ESP32", "MQTT", "Embedded C"],
    repo: "https://github.com/SAGEcube/Air_Guard-Environmental-Monitoring-System",
    visual: "iot",
    status: "REPOSITORY LINKED",
  },
];

const categories = [
  "ALL",
  "FIRMWARE",
  "DIGITAL DESIGN",
  "HARDWARE",
  "RTL & VERIFICATION",
  "VLSI DESIGN",
  "EMBEDDED / IoT",
];

function ProjectCard({ project, onOpen }) {
  return (
    <article className="work-card">
      <div className="work-card-heading">
        <span>{project.code}</span>
        <span className="work-card-arrow">↗</span>
      </div>

      <Project3DVisual type={project.visual} />

      <button
        className="work-card-open"
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`View details for ${project.title}`}
      >
        <div className="work-card-content">
          <div className="work-card-category">
            <span className="work-category-dot" />
            {project.type}
          </div>

          <h2>{project.title}</h2>
          <p>{project.description}</p>

          <div className="work-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="work-card-footer">
            <span>{project.category}</span>
            <span>VIEW DETAILS ↗</span>
          </div>
        </div>
      </button>
    </article>
  );
}

function ProjectDetails({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="work-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="work-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-modal-title"
      >
        <div className="work-modal-top">
          <span>{project.code} / PROJECT FILE</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
          >
            CLOSE ×
          </button>
        </div>

        <Project3DVisual type={project.visual} />

        <div className="work-modal-content">
          <p className="work-modal-category">{project.type}</p>
          <h2 id="work-modal-title">{project.title}</h2>
          <p className="work-modal-description">{project.description}</p>

          <h3>TECHNOLOGY STACK</h3>
          <div className="work-tags work-modal-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="work-modal-status">
            <span className="work-category-dot" />
            {project.status}
          </div>

          {project.repo ? (
            <a
              className="work-repository-link"
              href={project.repo}
              target="_blank"
              rel="noreferrer"
            >
              OPEN GITHUB REPOSITORY <span>↗</span>
            </a>
          ) : (
            <p className="work-repository-pending">
              Repository link will be added when available.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    filter === "ALL"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div className="work-page">
      <section className="work-hero">
        <div className="work-hero-grid" />

        <div className="work-hero-topline">
          <span>ENGINEERING ARCHIVE / 001</span>
          <span>PROJECTS: {String(projects.length).padStart(2, "0")}</span>
        </div>

        <p className="work-eyebrow">SELECTED WORK / 2024—2026</p>

        <h1>
          Built to work.
          <br />
          <span>Designed to understand.</span>
        </h1>

        <div className="work-hero-bottom">
          <p>
            A collection of projects across embedded firmware, digital
            architecture, hardware interfaces and circuit design.
          </p>

          <div className="work-archive-stats">
            <div>
              <strong>06</strong>
              <span>PROJECT FILES</span>
            </div>
            <div>
              <strong>04</strong>
              <span>ENGINEERING DOMAINS</span>
            </div>
          </div>
        </div>

        <div className="work-hero-index">ARCHIVE / SJ—2026</div>
      </section>

      <section className="work-archive">
        <div className="work-archive-header">
          <div>
            <p className="work-eyebrow">INDEX / ALL PROJECTS</p>
            <h2>
              Project archive<span>.</span>
            </h2>
          </div>

          <p className="work-archive-count">
            DISPLAYING {String(filteredProjects.length).padStart(2, "0")} FILES
          </p>
        </div>

        <div className="work-filters" aria-label="Filter projects">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={filter === category ? "active" : ""}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="work-project-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={setSelectedProject}
            />
          ))}
        </div>

        <div className="work-archive-bottom">
          <span>END OF CURRENT ARCHIVE</span>
          <Link to="/about">MEET THE ENGINEER ↗</Link>
        </div>
      </section>

      <section className="work-contact-strip">
        <p>HAVE A TECHNICAL CHALLENGE?</p>
        <h2>
          Let's build
          <br />
          something <span>useful.</span>
        </h2>
        <Link to="/contact">ESTABLISH CONNECTION ↗</Link>
      </section>

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
