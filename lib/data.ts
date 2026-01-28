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
  name: "TechSprint",
  fullName: "TechSprint 2K26",
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
  about: "RGM College of Engineering & Technology is a premier autonomous institution committed to excellence in technical education. The Department of Computer Science & Engineering is proud to present TechSprint - a platform for young innovators to showcase their talent.",
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.123456789!2d78.4835!3d15.5087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDMwJzMxLjMiTiA3OMKwMjknMDAuNiJF!5e0!3m2!1sen!2sin!4v1234567890",
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
      "Team size: 2-4 members",
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
    name: "Rajesh Kumar Sharma",
    title: "Chief Technology Officer",
    company: "TechVentures India",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    quote: "Innovation is not about technology, it's about solving real problems.",
    expertise: ["Cloud Architecture", "AI/ML", "Startup Scaling"],
    linkedin: "https://linkedin.com/in/",
  },
  {
    id: "judge-2",
    name: "Dr. Priya Venkatesh",
    title: "Senior Engineering Director",
    company: "Google India",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    quote: "The best code is the one that makes complex things simple.",
    expertise: ["System Design", "Open Source", "Developer Experience"],
    linkedin: "https://linkedin.com/in/",
  },
  {
    id: "judge-3",
    name: "Arun Krishnamurthy",
    title: "Founder & CEO",
    company: "InnovateTech Labs",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    quote: "Every great product started as a crazy idea in someone's mind.",
    expertise: ["Product Strategy", "Venture Capital", "Tech Entrepreneurship"],
    linkedin: "https://linkedin.com/in/",
  },
];

// Prizes
export const prizes: Prize[] = [
  {
    position: "winner",
    title: "Internship",
    description: "Paid internship opportunity at a leading tech company. Kickstart your career with real-world experience.",
    icon: "briefcase",
    highlight: true,
  },
  {
    position: "runner-up",
    title: "₹15,000 Cash Prize",
    description: "Cash prize plus certificates and exclusive swag.",
    icon: "trophy",
  },
  {
    position: "third",
    title: "₹10,000 Cash Prize",
    description: "Cash prize plus certificates and exclusive swag.",
    icon: "medal",
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
    { name: "Dr. D. V. Ashok Kumar", title: "Dean Admin" },
    { name: "Dr. T. Jaya Chandra Prasad", title: "Principal" },
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
