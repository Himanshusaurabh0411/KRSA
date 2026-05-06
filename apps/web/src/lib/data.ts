import {
  Activity,
  BadgeIndianRupee,
  BarChart3,
  CalendarDays,
  Dumbbell,
  Goal,
  ShieldCheck,
  Trophy,
  Users
} from "lucide-react";

export const academy = {
  name: "Krishna Rattan Sports Academy",
  shortName: "KRSA",
  location: "Sangam Vihar, Wazirabad, Delhi, India",
  address: "Kh. No. 16/1, Street No. 2, Village Wazirabad, Sangam Vihar, Delhi",
  status: "Khelo India Accredited Academy | SAI Empanelled",
  contact: "Mukesh Kalia, B-40 Gujranwala Town, Delhi - 110009",
  domain: "krsasports.in"
};

export const programs = [
  { title: "Cricket Foundation", level: "Beginner", age: "8-14 yrs", price: 3500, focus: "Batting basics, bowling rhythm, fielding agility", icon: Trophy },
  { title: "Elite Cricket Pathway", level: "Advanced", age: "14+ yrs", price: 6500, focus: "Match strategy, analytics, fitness periodization", icon: BarChart3 },
  { title: "Football Skills Lab", level: "Intermediate", age: "9-16 yrs", price: 4200, focus: "Ball control, speed, tactical decision-making", icon: Goal },
  { title: "Multi-Sport Kids", level: "Kids", age: "6-10 yrs", price: 3000, focus: "Coordination, balance, confidence, discipline", icon: Users },
  { title: "Strength & Conditioning", level: "Fitness", age: "12+ yrs", price: 2800, focus: "Mobility, power, injury prevention", icon: Dumbbell },
  { title: "Performance Recovery", level: "Special", age: "All", price: 2200, focus: "Load management, rehab tracking, return-to-play", icon: Activity }
];

export const coaches = [
  { name: "Arjun Mehra", role: "Head Cricket Coach", stat: "18 yrs", specialty: "Batting technique and match temperament" },
  { name: "Neha Rawat", role: "Performance Coach", stat: "S&C", specialty: "Speed, mobility, and injury prevention" },
  { name: "Kabir Sethi", role: "Football Coach", stat: "AFC C", specialty: "Youth development and tactical awareness" }
];

export const testimonials = [
  { quote: "KRSA gave my son a structured pathway, not just daily practice. His fitness scores and confidence both improved.", name: "Parent of U-14 athlete" },
  { quote: "The dashboards make progress visible. Every session has a goal, and the coach feedback is practical.", name: "Advanced cricket student" },
  { quote: "Attendance, fee tracking, and batch operations are finally in one place. It feels built for academy life.", name: "Academy administrator" }
];

export const schedules = [
  { day: "Mon", time: "06:00", title: "Cricket Foundation", coach: "Arjun", venue: "Nets A" },
  { day: "Tue", time: "17:00", title: "Football Skills Lab", coach: "Kabir", venue: "Field 2" },
  { day: "Wed", time: "06:30", title: "Elite Batting Analytics", coach: "Arjun", venue: "Video Room" },
  { day: "Thu", time: "18:00", title: "Strength & Conditioning", coach: "Neha", venue: "Gym" },
  { day: "Fri", time: "16:30", title: "Multi-Sport Kids", coach: "Neha", venue: "Main Turf" },
  { day: "Sat", time: "07:00", title: "Match Simulation", coach: "Panel", venue: "Ground" }
];

export const dashboardMetrics = [
  { label: "Active students", value: "486", change: "+18 this month", icon: Users },
  { label: "Fee collection", value: "92%", change: "Rs. 8.4L received", icon: BadgeIndianRupee },
  { label: "Attendance", value: "87%", change: "+4% vs last week", icon: CalendarDays },
  { label: "Injury risk", value: "11", change: "students flagged", icon: ShieldCheck }
];

export const leaderboard = [
  { name: "Aarav K.", sport: "Cricket", score: 96 },
  { name: "Ishita R.", sport: "Football", score: 94 },
  { name: "Dev M.", sport: "Cricket", score: 91 },
  { name: "Sara A.", sport: "Fitness", score: 88 }
];
