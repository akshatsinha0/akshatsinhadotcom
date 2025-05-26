import React from "react";
import "./Awards.css";

const Awards: React.FC = () => {
  const awards = [
    {
      title: "Best Innovation Award",
      organization: "TechCrunch Disrupt",
      year: "2024",
      description: "Recognized for groundbreaking work in AI-driven systems",
    },
    {
      title: "Top Open Source Contributor",
      organization: "GitHub Universe",
      year: "2023",
      description: "Awarded for significant contributions to OSS community",
    },
    {
      title: "Young Engineer of the Year",
      organization: "IEEE",
      year: "2022",
      description: "Honored for exceptional early-career achievements",
    },
  ];

  return (
    <section className="awards-section">
      <div className="awards-container">
        {awards.map((award, idx) => (
          <div
            key={award.title}
            className="award-card"
            style={{ "--delay": `${idx * 0.2}s` } as React.CSSProperties}
          >
            <div className="award-header">
              <div className="trophy-icon">
                <img
                  src="/src/assets/winningtrophyicon.png"
                  alt="Trophy"
                  className="trophy-image"
                />
              </div>

              <h3>{award.title}</h3>
            </div>

            <div className="award-body">
              <div className="organization">{award.organization}</div>
              <div className="year">{award.year}</div>
              <p className="description">{award.description}</p>
            </div>

            <div className="award-rays"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Awards;
