"use client";
import React from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const experienceData = [
    {
        title: "Digital Marketing Team Lead",
        company: "Fin Rise Soft Tech Ltd, Mumbai",
        date: "Jan 2024 – Present",
        description:
            "Led a team of 7 marketers, increased organic traffic by 40% through strategic SEO & content marketing.",
    },
    {
        title: "Digital Marketing Executive",
        company: "Positive Zones, Mumbai",
        date: "Apr 2023 – Oct 2023",
        description:
            "Developed an SEO content plan, increasing organic traffic by 30%. Managed social media strategy & engagement.",
    },
    {
        title: "Digital Marketing Executive",
        company: "Beyond Enough, Mumbai",
        date: "Jul 2022 – Apr 2023",
        description:
            "Managed SEO & content strategy, achieving #1 rankings for 10–12 high-volume keywords.",
    },
    {
        title: "Digital Marketing Intern",
        company: "Tata Institute of Social Sciences (TISS), Mumbai",
        date: "2022",
        description:
            "Assisted in SEO content development and website usability improvements.",
    },
    {
        title: "Freelance SEO & Digital Marketing Consultant",
        date: "Freelancing Experience",
        Description: () => <>
            <p>- <b>Food Industry Startup (3 months)</b>: Developed SEO-driven content strategy, increasing online visibility.</p>
            <p>- <b>Fashion Brand (1 year)</b>: Optimized product descriptions, created engaging ad copies.</p>
            <p>- <b>Media Publication (3 months)</b>: Conducted competitive keyword research, leading to a 20% boost in organic traffic.</p>
        </>
    },
];

const educationData = [
    {
        title: "Diploma in Digital Marketing",
        institution: "Tata Institute of Social Sciences (TISS), Mumbai",
        date: "2021 – 2022",
        details: "Grade: A",
    },
    {
        title: "Bachelor of Commerce (B.Com)",
        institution: "Mumbai University",
        date: "2018 – 2022",
        details: "Percentage: 77%",
    },
];

function ExperienceTimeline() {
    return (
        <div
            
            style={{
                color: "#333",
                backgroundColor: "#F8F8F8",
                minHeight: "100vh",
                padding: "50px 0",
            }}
        >
            <VerticalTimeline>
                {experienceData.map((exp, index) => (
                    <VerticalTimelineElement
                        key={index}
                        className="vertical-timeline-element--education"
                        contentStyle={{
                            background: "#FFFFFF",
                            color: "#000000",
                            border: "2px solid #FCE1DB",
                            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                        }}
                        contentArrowStyle={{ borderRight: "7px solid #FCE1DB" }}
                        date={exp.date}
                        iconStyle={{
                            background: "#000000",
                            color: "#FCE1DB",
                            border: "2px solid #FCE1DB",
                        }}

                        icon={<Briefcase size={36} />}
                    >
                        <h3 className="vertical-timeline-element-title" style={{ color: "#000000" }}>
                            {exp.title}
                        </h3>
                        {exp.company && (
                            <h4 className="vertical-timeline-element-subtitle" style={{ color: "#000000" }}>
                                {exp.company}
                            </h4>
                        )}
                        {exp.description ? <p>{exp.description}</p> : <exp.Description />}
                    </VerticalTimelineElement>
                ))}

                {educationData.map((edu, index) => (
                    <VerticalTimelineElement
                        key={index}
                        className="vertical-timeline-element--work"
                        contentStyle={{
                            background: "#000000",
                            color: "#FCE1DB",
                            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                        }}
                        contentArrowStyle={{ borderRight: "7px solid #000000" }}
                        date={edu.date}
                        iconStyle={{
                            background: "#FCE1DB",
                            color: "#000000",
                            border: "2px solid #000000",
                        }}
                        icon={<GraduationCap size={36} />}
                    >
                        <h3 className="vertical-timeline-element-title" style={{ color: "#FCE1DB" }} >
                            {edu.title}
                        </h3>
                        <h4 className="vertical-timeline-element-subtitle" style={{ color: "#FCE1DB" }} >
                            {edu.institution}
                        </h4>
                        <p>{edu.details}</p>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
        </div>
    );
}

export default ExperienceTimeline;
