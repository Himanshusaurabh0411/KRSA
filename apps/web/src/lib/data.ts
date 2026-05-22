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
  domain: "krsasports.in",
  mission:
    "To provide world-class sports coaching, education and moral training to children from all sections of society including SC/ST and weaker sections, in partnership with the Khelo India programme.",
  vision:
    "To become a leading grassroots sports development institution in Delhi NCR, nurturing talent from underserved communities and creating a pipeline of champion athletes representing India.",
  mouDuration: "4 years, renewable upon performance review",
  primaryObligation: "Training of Khelo India Talent (KIT) athletes with full reporting to SAI/NSRS"
};

export const owner = {
  name: "Mukesh Kalia",
  title: "Owner",
  role: "Academy leadership and basketball development",
  photoUrl: "/people/mukesh-kalia.jpeg",
  bio:
    "Mukesh Kalia leads Krishna Rattan Sports Academy with a focus on disciplined basketball training, grassroots athlete development and transparent Khelo India academy operations. His vision is to create a reliable pathway where young players from Delhi can train with structure, values and long-term support.",
  focus: ["Basketball pathway", "Khelo India compliance", "Grassroots athlete support"]
};

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
  { name: "Aarav Kumar", sport: "Basketball", batch: "Morning Foundation", coach: "KRSA Coaching Team", achievement: "Top scorer - KRSA U16 Skills League", kit: true, score: 96 },
  { name: "Ishita Rana", sport: "Basketball", batch: "Girls Competition", coach: "KRSA Coaching Team", achievement: "Captain - Inter-Academy Basketball Meet", kit: true, score: 94 },
  { name: "Dev Malik", sport: "Basketball", batch: "Evening Development", coach: "KRSA Coaching Team", achievement: "Best defender - Junior District Basketball Camp", kit: false, score: 89 },
  { name: "Sara Ali", sport: "Basketball", batch: "Shooting Lab", coach: "KRSA Coaching Team", achievement: "Most improved shooter - Academy League", kit: false, score: 88 }
];

export const tournaments = [
  { name: "Delhi Youth Basketball Meet", sport: "Basketball", date: "18 May 2026", venue: "Delhi", level: "State", status: "Registration Open" },
  { name: "KRSA Inter-Batch Basketball League", sport: "Basketball", date: "25 May 2026", venue: "KRSA Court", level: "Academy", status: "Upcoming" },
  { name: "KRSA 3x3 Basketball Skills Challenge", sport: "Basketball", date: "07 Apr 2026", venue: "Wazirabad", level: "Academy", status: "Results Uploaded" }
];

export const news = [
  { title: "KRSA prepares Khelo India Talent reporting dashboard", date: "08 May 2026", excerpt: "The academy is aligning athlete attendance, performance and documentation workflows with SAI reporting needs.", icon: FileText },
  { title: "Basketball training camp applications open", date: "05 May 2026", excerpt: "New applications are invited for KRSA basketball foundation, competition and Khelo India talent batches.", icon: Megaphone },
  { title: "Basketball athletes complete quarterly fitness assessments", date: "28 Apr 2026", excerpt: "Coaches reviewed speed, endurance, mobility, shooting consistency and basketball skill markers.", icon: BarChart3 }
];

export const galleryItems = [
  { title: "Morning basketball drills", type: "Photo", tone: "from-blue-900 to-navy" },
  { title: "Shooting practice", type: "Photo", tone: "from-orange to-red-800" },
  { title: "Defensive footwork", type: "Video", tone: "from-slate-800 to-green" },
  { title: "Awards ceremony", type: "Photo", tone: "from-yellow-700 to-orange" },
  { title: "Coach briefing", type: "Photo", tone: "from-navy to-indigo-950" },
  { title: "Basketball fitness testing", type: "Video", tone: "from-green to-emerald-900" }
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
