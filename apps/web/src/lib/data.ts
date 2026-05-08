import {
  Activity,
  BadgeIndianRupee,
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  Dumbbell,
  FileText,
  Goal,
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
  domain: "krsasports.in",
  mission:
    "To provide world-class sports coaching, education and moral training to children from all sections of society including SC/ST and weaker sections, in partnership with the Khelo India programme.",
  vision:
    "To become a leading grassroots sports development institution in Delhi NCR, nurturing talent from underserved communities and creating a pipeline of champion athletes representing India.",
  mouDuration: "4 years, renewable upon performance review",
  primaryObligation: "Training of Khelo India Talent (KIT) athletes with full reporting to SAI/NSRS"
};

export const stats = [
  { label: "Athletes Trained", value: "486+" },
  { label: "Sports Offered", value: "5" },
  { label: "Tournaments Won", value: "38" },
  { label: "Khelo India KITs", value: "24" }
];

export const sports = [
  { name: "Athletics", nameHi: "एथलेटिक्स", coach: "Neha Rawat", batch: "Mon/Wed/Fri - 6:00 AM", icon: Activity, description: "Speed, endurance, jumps, throws, mobility and field test tracking." },
  { name: "Wrestling", nameHi: "कुश्ती", coach: "Vikram Dahiya", batch: "Tue/Thu/Sat - 5:00 PM", icon: ShieldCheck, description: "Mat technique, strength, discipline, injury-safe conditioning." },
  { name: "Kabaddi", nameHi: "कबड्डी", coach: "Amit Solanki", batch: "Mon/Thu/Sat - 4:30 PM", icon: Users, description: "Raiding, defending, team tactics and tournament readiness." },
  { name: "Football", nameHi: "फुटबॉल", coach: "Kabir Sethi", batch: "Tue/Fri - 5:30 PM", icon: Goal, description: "Ball control, tactical awareness, match play and fitness." },
  { name: "Boxing", nameHi: "मुक्केबाजी", coach: "Rohit Malik", batch: "Wed/Sat - 6:30 AM", icon: Dumbbell, description: "Footwork, strength, technique, sparring protocols and safety." }
];

export const programs = [
  { title: "Grassroots Foundation", level: "Beginner", age: "8-14 yrs", price: 2500, focus: "Movement literacy, sport basics, discipline and confidence.", icon: Trophy },
  { title: "Khelo India Talent Track", level: "Advanced", age: "12+ yrs", price: 0, focus: "KIT athlete tracking, reporting, attendance and performance review.", icon: ShieldCheck },
  { title: "Competition Batch", level: "Intermediate", age: "10-18 yrs", price: 4200, focus: "Tournament preparation, tactical sessions and results tracking.", icon: Medal },
  { title: "Strength and Conditioning", level: "Fitness", age: "12+ yrs", price: 2800, focus: "Mobility, power, endurance and injury prevention.", icon: HeartPulse }
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
  { name: "Aarav Kumar", sport: "Athletics", batch: "Morning Elite", coach: "Neha Rawat", achievement: "Gold - Delhi State U16 100m", kit: true, score: 96 },
  { name: "Ishita Rana", sport: "Kabaddi", batch: "Girls Competition", coach: "Amit Solanki", achievement: "Captain - Zonal Championship", kit: true, score: 94 },
  { name: "Dev Malik", sport: "Wrestling", batch: "Mat Skills", coach: "Vikram Dahiya", achievement: "Silver - Junior District Meet", kit: false, score: 89 },
  { name: "Sara Ali", sport: "Football", batch: "Evening Tactical", coach: "Kabir Sethi", achievement: "Best Midfielder - School League", kit: false, score: 88 }
];

export const tournaments = [
  { name: "Delhi Grassroots Sports Meet", sport: "Athletics", date: "18 May 2026", venue: "Delhi", level: "State", status: "Registration Open" },
  { name: "KRSA Inter-Batch Kabaddi League", sport: "Kabaddi", date: "25 May 2026", venue: "KRSA Ground", level: "Academy", status: "Upcoming" },
  { name: "North Zone Boxing Trials", sport: "Boxing", date: "07 Apr 2026", venue: "Wazirabad", level: "Zonal", status: "Results Uploaded" }
];

export const news = [
  { title: "KRSA prepares Khelo India Talent reporting dashboard", date: "08 May 2026", excerpt: "The academy is aligning athlete attendance, performance and documentation workflows with SAI reporting needs.", icon: FileText },
  { title: "Summer training camp applications open", date: "05 May 2026", excerpt: "New applications are invited for athletics, wrestling, kabaddi, football and boxing batches.", icon: Megaphone },
  { title: "Athletes complete quarterly fitness assessments", date: "28 Apr 2026", excerpt: "Coaches reviewed speed, endurance, mobility and sport-specific skill markers across competition batches.", icon: BarChart3 }
];

export const galleryItems = [
  { title: "Morning athletics drill", type: "Photo", tone: "from-blue-900 to-navy" },
  { title: "Kabaddi match practice", type: "Photo", tone: "from-orange to-red-800" },
  { title: "Wrestling conditioning", type: "Video", tone: "from-slate-800 to-green" },
  { title: "Awards ceremony", type: "Photo", tone: "from-yellow-700 to-orange" },
  { title: "Coach briefing", type: "Photo", tone: "from-navy to-indigo-950" },
  { title: "Fitness testing", type: "Video", tone: "from-green to-emerald-900" }
];

export const schedules = [
  { day: "Mon", time: "06:00", title: "Athletics Foundation", coach: "Neha", venue: "Track Zone" },
  { day: "Tue", time: "17:00", title: "Wrestling Technique", coach: "Vikram", venue: "Mat Hall" },
  { day: "Wed", time: "06:30", title: "Boxing Footwork", coach: "Rohit", venue: "Ring Area" },
  { day: "Thu", time: "18:00", title: "Kabaddi Team Tactics", coach: "Amit", venue: "Main Court" },
  { day: "Fri", time: "16:30", title: "Football Skills Lab", coach: "Kabir", venue: "Field 2" },
  { day: "Sat", time: "07:00", title: "Competition Simulation", coach: "Panel", venue: "Ground" }
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
