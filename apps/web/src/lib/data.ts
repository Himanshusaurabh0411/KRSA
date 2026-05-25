import {
  Activity,
  BadgeIndianRupee,
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  FileText,
  HeartPulse,
  Image as ImageIcon,
  KeyRound,
  Medal,
  Megaphone,
  Newspaper,
  ShieldCheck,
  Trophy,
  UserCheck,
  Users
} from "lucide-react";

export const academy = {
  name: "Krishna Rattan Sports Academy",
  shortName: "KRSA",
  location: "Sangam Vihar, Wazirabad, Delhi, India",
  address: "Kh. No. 16/1, Street No. 2, Village Wazirabad, Sangam Vihar, Delhi",
  trustDate: "25 September 2020",
  trustees: "Shri Mukesh Kalia (Advocate) and Smt. Sapna Kalia",
  contact: "Mukesh Kalia | B-40 Gujranwala Town, Delhi - 110009",
  status: "Khelo India Accredited Academy",
  accreditation: "Khelo India Accredited Academy - Silver Category",
  affiliation: "Sports Authority of India (SAI) / Khelo India Programme",
  designationHi: "खेलो इंडिया मान्यता प्राप्त अकादमी",
  designationEn: "KHELO INDIA ACCREDITED ACADEMY",
  nsrsPortalUrl: "https://account.kheloindia.gov.in/#/login?appId=zij54QFtvO",
  techPartner: {
    name: "Whizz Dream Big",
    url: "https://www.whizzdreambig.com/"
  },
  domain: "krsasports.in",
  mission:
    "To provide world-class sports coaching, education and moral training to children from all sections of society including SC/ST and weaker sections, in partnership with the Khelo India programme.",
  vision:
    "To become a leading grassroots sports development institution in Delhi NCR, nurturing talent from underserved communities and creating a pipeline of champion athletes representing India.",
  primaryObligation: "Training of Khelo India Talent (KIT) athletes with full reporting to SAI/NSRS"
};

export const trustees = [
  {
    name: "Mukesh Kalia",
    title: "Trustee, KRSA",
    role: "Academy leadership and basketball development",
    photoUrl: "/people/mukesh-kalia.jpeg",
    bio:
      "Mukesh Kalia guides Krishna Rattan Sports Academy with a focus on disciplined basketball training, grassroots athlete development and transparent Khelo India academy operations. His vision is to create a reliable pathway where young players from Delhi can train with structure, values and long-term support.",
    details: ["Advocate", "Trustee, KRSA", "Basketball pathway"],
    focus: ["Basketball pathway", "Khelo India compliance", "Grassroots athlete support"]
  },
  {
    name: "Sapna Kalia",
    title: "Secretary and Trustee, KRSA",
    role: "Education, public relations and community service",
    photoUrl: "/people/sapna-kalia.jpeg",
    dateOfBirth: "27 June 1966",
    education: "Studied Philosophy, Nursery Teacher Training (NTT)",
    professionalExperience: "Public Relations Officer at Kalia Associates",
    bio:
      "Sapna Kalia has dedicated her career to education, professional development and community service. With a strong academic foundation in philosophy and early childhood education, she has contributed meaningfully as a Public Relations Officer at Kalia Associates. Her leadership and commitment to social causes are reflected in her current responsibilities as both Secretary and Trustee of KRSA, where she plays a pivotal role in guiding the organization's vision and activities.",
    details: ["Secretary, KRSA", "Trustee, KRSA", "Public relations"],
    focus: ["Education", "Professional development", "Community service"]
  }
];

export const stats = [
  { label: "Athletes Trained", value: "486+" },
  { label: "Approved Sport", value: "1" },
  { label: "Tournaments Won", value: "38" },
  { label: "Khelo India KITs", value: "24" }
];

export const sports = [
  {
    name: "Basketball",
    nameHi: "बास्केटबॉल",
    coach: "KRSA Coaching Team",
    batch: "Morning and evening batches",
    icon: Trophy,
    description: "Basketball fundamentals, ball handling, shooting, defence, fitness, match play and Khelo India athlete tracking."
  }
];

export const programs = [
  { title: "Basketball Foundation", level: "Beginner", age: "8-14 yrs", price: 2500, focus: "Dribbling, passing, footwork, layups, discipline and confidence.", icon: Trophy },
  { title: "Khelo India Talent Track", level: "Advanced", age: "12+ yrs", price: 0, focus: "Basketball KIT athlete tracking, attendance, performance and SAI reporting.", icon: ShieldCheck },
  { title: "Competition Squad", level: "Intermediate", age: "10-18 yrs", price: 4200, focus: "Match preparation, team tactics, shooting consistency and tournament readiness.", icon: Medal },
  { title: "Strength and Conditioning", level: "Fitness", age: "12+ yrs", price: 2800, focus: "Basketball mobility, power, speed, endurance and injury prevention.", icon: HeartPulse }
];

export const objectives = [
  "Promote sports coaching and education among children across Delhi and India.",
  "Provide sports education to students from SC/ST communities and weaker sections.",
  "Organize sports matches, practice sessions, camps and training programmes.",
  "Publish newsletters, reports and audio-visual content for sports knowledge dissemination.",
  "Provide monetary assistance and scholarships to deserving students.",
  "Maintain and run academy facilities with state-of-the-art infrastructure."
];

export const athletes = [
  {
    name: "KRSA Guard Unit",
    sport: "Basketball",
    batch: "Morning Foundation",
    coach: "KRSA Coaching Team",
    achievement: "Young athletes training under KRSA's basketball development pathway.",
    kit: true,
    score: 96,
    image: "/media/athletes/krsa-athlete-rising-guards.jpg"
  },
  {
    name: "Orange Squad",
    sport: "Basketball",
    batch: "Girls Competition",
    coach: "KRSA Coaching Team",
    achievement: "Match-ready squad work focused on ball movement, spacing and confidence.",
    kit: true,
    score: 94,
    image: "/media/athletes/krsa-athlete-orange-squad.jpg"
  },
  {
    name: "Court Action Squad",
    sport: "Basketball",
    batch: "Evening Development",
    coach: "KRSA Coaching Team",
    achievement: "Competitive match practice with live-game decision making and defence.",
    kit: false,
    score: 89,
    image: "/media/athletes/krsa-athlete-court-action.jpg"
  },
  {
    name: "Recognition Spotlight",
    sport: "Basketball",
    batch: "Achievement Track",
    coach: "KRSA Coaching Team",
    achievement: "Academy recognition moments for disciplined participation and progress.",
    kit: false,
    score: 88,
    image: "/media/athletes/krsa-athlete-recognition.jpg"
  }
];

export const tournaments = [
  {
    name: "Delhi Youth Basketball Meet",
    sport: "Basketball",
    date: "18 May 2026",
    venue: "Delhi",
    level: "State",
    status: "Results Uploaded",
    image: "/media/tournaments/krsa-tournament-opening-tip.jpg"
  },
  {
    name: "KRSA Inter-Batch Basketball League",
    sport: "Basketball",
    date: "25 May 2026",
    venue: "KRSA Court",
    level: "Academy",
    status: "Upcoming",
    image: "/media/tournaments/krsa-tournament-match-action.jpg"
  },
  {
    name: "KRSA 3x3 Basketball Skills Challenge",
    sport: "Basketball",
    date: "07 Apr 2026",
    venue: "Wazirabad",
    level: "Academy",
    status: "Results Uploaded",
    image: "/media/tournaments/krsa-tournament-crowd-address.jpg"
  }
];

export const news = [
  {
    title: "KRSA hosts academy felicitation and recognition ceremony",
    date: "08 May 2026",
    excerpt: "Guests, coaches and academy leadership came together to recognise the basketball pathway and athlete development work.",
    icon: FileText,
    image: "/media/news/krsa-news-felicitation.jpg"
  },
  {
    title: "Khelo India academy visit highlights basketball facilities",
    date: "05 May 2026",
    excerpt: "Academy representatives welcomed dignitaries and reviewed training, documentation and future athlete support plans.",
    icon: Megaphone,
    image: "/media/news/krsa-news-official-visit.jpg"
  },
  {
    title: "Opening ceremony brings players, coaches and supporters together",
    date: "28 Apr 2026",
    excerpt: "KRSA's basketball community gathered for court-side introductions, team moments and public recognition.",
    icon: BarChart3,
    image: "/media/news/krsa-news-opening-ceremony.jpg"
  }
];

export const galleryItems = [
  { title: "KRSA court gathering", type: "Photo", category: "Ceremonies", image: "/media/gallery/krsa-gallery-campus-wide.jpg" },
  { title: "Officials on court", type: "Photo", category: "Ceremonies", image: "/media/gallery/krsa-gallery-officials-court.jpg" },
  { title: "Guest dais and awards", type: "Photo", category: "Ceremonies", image: "/media/gallery/krsa-gallery-dais.jpg" },
  { title: "Team lineup", type: "Photo", category: "Training", image: "/media/gallery/krsa-gallery-team-lineup.jpg" },
  { title: "Player greeting", type: "Photo", category: "Tournaments", image: "/media/gallery/krsa-gallery-player-greeting.jpg" },
  { title: "Guest welcome", type: "Photo", category: "News", image: "/media/gallery/krsa-gallery-guest-welcome.jpg" }
];

export const schedules = [
  { day: "Mon", time: "06:00", title: "Basketball Foundation", coach: "KRSA Team", venue: "Main Court" },
  { day: "Tue", time: "17:00", title: "Ball Handling and Footwork", coach: "KRSA Team", venue: "Main Court" },
  { day: "Wed", time: "06:30", title: "Shooting Mechanics", coach: "KRSA Team", venue: "Main Court" },
  { day: "Thu", time: "18:00", title: "Team Tactics and Defence", coach: "KRSA Team", venue: "Main Court" },
  { day: "Fri", time: "16:30", title: "Strength and Conditioning", coach: "KRSA Team", venue: "Fitness Zone" },
  { day: "Sat", time: "07:00", title: "Match Simulation", coach: "KRSA Team", venue: "Main Court" }
];

export const dashboardMetrics = [
  { label: "Active athletes", value: "486", change: "+18 this month", icon: Users },
  { label: "KIT athletes", value: "24", change: "SAI reporting enabled", icon: ShieldCheck },
  { label: "Attendance", value: "87%", change: "+4% vs last week", icon: CalendarDays },
  { label: "Open applications", value: "42", change: "12 under review", icon: ClipboardCheck }
];

export const portalRoles = [
  { title: "Super Admin", path: "/admin", access: "Full control of users, website, finances and reports.", icon: UserCheck },
  { title: "Coach Portal", path: "/portal/coach", access: "Manage assigned athlete batches, attendance and performance reports.", icon: Activity },
  { title: "Athlete Portal", path: "/portal/athlete", access: "View profile, training plan, achievements, notices and attendance.", icon: Trophy },
  { title: "Student Portal", path: "/portal/student", access: "Student-facing view for training schedule, progress, certificates and notices.", icon: KeyRound },
  { title: "Parent Portal", path: "/portal/parent", access: "View ward progress, attendance, announcements and fee status.", icon: Users },
  { title: "SAI Reporting", path: "/portal/sai", access: "View KIT data, export NSRS reports and upload utilization documents.", icon: FileText }
];

export const adminModules = [
  { title: "Athlete Database", description: "Add, edit, archive, bulk import and export athlete records for NSRS reporting.", icon: Users },
  { title: "Tournament Management", description: "Create events, upload results, generate medal tallies and notify athletes.", icon: Medal },
  { title: "News and Media CMS", description: "Publish news, manage albums, embed videos and maintain SEO metadata.", icon: Newspaper },
  { title: "Applications Workflow", description: "Track New, Under Review, Shortlisted, Approved and Rejected applications.", icon: ClipboardCheck },
  { title: "SAI Documents", description: "Upload UCs, bills, attendance records and audit-ready reporting documents.", icon: FileText },
  { title: "Gallery Management", description: "Tag photos and videos by album, event date, sport and public visibility.", icon: ImageIcon },
  { title: "Payments", description: "Future-ready Razorpay/Paytm registration, fee and donation collection.", icon: BadgeIndianRupee }
];

export const leaderboard = athletes.map((athlete) => ({
  name: athlete.name,
  sport: athlete.sport,
  score: athlete.score
}));
