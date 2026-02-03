// TechSprint Hackathon Data

export interface Phase {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: "lightbulb" | "code";
  duration: string;
  details: string[];
  outcome: string;
}

export interface Judge {
  id: string;
  name: string;
  title: string;
  company: string;
  image: string;
  quote: string;
  expertise: string[];
  linkedin?: string;
}

export interface Prize {
  position: string;
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
}

// TechSprint Event Info
export const techSprintInfo = {
  name: "Hackathon",
  fullName: "Hackathon 2K26",
  tagline: "Innovate. Code. Win an Internship.",
  description: "A 24-hour national level hackathon where brilliant minds compete in two phases - IdeateX and CodeJam - for a chance to win an internship at a top tech company.",
  dates: {
    start: "February 27, 2026",
    end: "February 28, 2026",
  },
  venue: "RGM College of Engineering & Technology",
  duration: "24 Hours",
  registrationFee: 200,
};

// College Info
export const collegeInfo = {
  name: "RGM College of Engineering & Technology",
  shortName: "RGMCET",
  department: "Department of Computer Science & Engineering",
  address: "NH-40, Nandyal - 518501, Kurnool District, Andhra Pradesh, India",
  phone: "+91 8514 274999",
  email: "info@rgmcet.edu.in",
  website: "rgmcet.edu.in",
  established: 1995,
  about: "RGM College of Engineering & Technology is a premier autonomous institution committed to excellence in technical education. The Department of Computer Science & Engineering is proud to present Hackathon - a platform for young innovators to showcase their talent.",
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.4!2d78.4671!3d15.4973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb5a10a8e5fb7e9%3A0x6a8e6b4f9c8d7e2a!2sRGM%20College%20of%20Engineering%20%26%20Technology!5e0!3m2!1sen!2sin!4v1706000000000!5m2!1sen!2sin",
  mapLink: "https://maps.app.goo.gl/Mnw9Whk5anufDPmo6",
};

// Two Phases of TechSprint
export const phases: Phase[] = [
  {
    id: "ideatex",
    name: "IdeateX",
    tagline: "Pitch Your Vision",
    description: "The ideation phase where participants present innovative solutions to real-world problems. Convince our judges with your creativity and vision.",
    icon: "lightbulb",
    duration: "3 Hours",
    details: [
      "Present your innovative idea",
      "5-minute pitch + 3-minute Q&A",
      "Focus on problem-solving approach",
      "Team size: 3-5 members",
    ],
    outcome: "Top teams qualify for CodeJam",
  },
  {
    id: "codejam",
    name: "CodeJam",
    tagline: "Build It Live",
    description: "The 24-hour coding marathon where qualified teams bring their ideas to life. Code, collaborate, and create a working prototype.",
    icon: "code",
    duration: "24 Hours",
    details: [
      "Build a working prototype",
      "Access to mentors & resources",
      "Midnight snacks & energy drinks",
      "Final demo to judges",
    ],
    outcome: "Winner gets an Internship!",
  },
];

// IT Expert Judges
export const judges: Judge[] = [
  {
    id: "judge-1",
    name: "Om Ashish Mishra",
    title: "Product Data Scientist",
    company: "Deloitte",
    image: "/judges/om-ashish-mishra.png",
    quote: "Innovation is about solving real problems with data-driven solutions.",
    expertise: ["GenAI & Data Innovation", "ML & Data Engineering", "Snowflake & Databricks"],
    linkedin: "https://www.linkedin.com/in/om-ashish-mishra/",
  },
  {
    id: "judge-2",
    name: "M.D. Moinuddin",
    title: "SDE (Mobile) & TensorFlow UG Lead",
    company: "Tradelab Technologies",
    image: "/judges/md-moinuddin.png",
    quote: "Build cross-platform, production-ready apps that make a difference.",
    expertise: ["Flutter & Mobile Dev", "AI/ML & TensorFlow", "Fintech & Web3"],
    linkedin: "https://www.linkedin.com/in/moinuddin9777/",
  },
];

// Prizes
export const prizes: Prize[] = [
  {
    position: "winner",
    title: "₹25,000 + Internship",
    description: "Grand prize of ₹25,000 cash plus a paid internship opportunity for the winning team. Best performers get internship offers!",
    icon: "trophy",
    highlight: true,
  },
  {
    position: "runner-up",
    title: "₹15,000 + Internship",
    description: "₹15,000 cash prize plus internship opportunity for the runner-up team.",
    icon: "medal",
    highlight: true,
  },
  {
    position: "third",
    title: "₹10,000 + Internship",
    description: "₹10,000 cash prize plus internship opportunity for the third place team.",
    icon: "award",
    highlight: true,
  },
  {
    position: "consolation",
    title: "₹10,000 Consolation",
    description: "Special consolation prize of ₹10,000 for the best performing 2nd Year Team!",
    icon: "star",
    highlight: false,
  },
];

// Timeline
export const timeline = [
  {
    time: "9:00 AM",
    day: "Day 1",
    event: "Registration & Check-in",
    description: "Get your badges and settle in",
  },
  {
    time: "10:00 AM",
    day: "Day 1",
    event: "IdeateX Begins",
    description: "Pitch your innovative ideas",
  },
  {
    time: "1:00 PM",
    day: "Day 1",
    event: "IdeateX Results",
    description: "Qualified teams announced",
  },
  {
    time: "2:00 PM",
    day: "Day 1",
    event: "CodeJam Kickoff",
    description: "24-hour coding marathon begins",
  },
  {
    time: "2:00 PM",
    day: "Day 2",
    event: "Coding Stops",
    description: "Keyboards down!",
  },
  {
    time: "3:00 PM",
    day: "Day 2",
    event: "Final Demos",
    description: "Present to the judges",
  },
  {
    time: "5:00 PM",
    day: "Day 2",
    event: "Awards Ceremony",
    description: "Winners announced!",
  },
];

// Faculty Coordinators (from poster)
export const coordinators = {
  patrons: [
    { name: "Dr. M. Santhiramudu", title: "Chairman" },
    { name: "Sri. M. Sivaram", title: "Managing Director" },
    { name: "Dr. T. Jaya Chandra Prasad", title: "Principal" },
    { name: "Dr. D. V. Ashok Kumar", title: "Dean Admin" },
  ],
  programDirectors: [
    { name: "Dr. K. Subba Reddy", title: "Program Director & HOD" },
    { name: "Dr. M. Sravan Kumar Reddy", title: "Program Convener" },
    { name: "Mr. P. Naveen Sundar Kumar", title: "Program Convener" },
  ],
};

// Social Links
export const socialLinks = [
  { platform: "instagram", url: "https://instagram.com/rgmcet" },
  { platform: "twitter", url: "https://twitter.com/rgmcet" },
  { platform: "linkedin", url: "https://linkedin.com/school/rgmcet" },
  { platform: "youtube", url: "https://youtube.com/@rgmcet" },
];

// Events for registration (single hackathon event)
export interface Event {
  id: string;
  slug: string;
  name: string;
  registrationFee: number;
}

export const events: Event[] = [
  {
    id: "techsprint",
    slug: "techsprint",
    name: "TechSprint 2K26",
    registrationFee: techSprintInfo.registrationFee,
  },
];
