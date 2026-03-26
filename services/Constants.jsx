import { LayoutDashboard, Calendar, List, CreditCard, Settings, Code, User, Briefcase, Smile, Brain } from "lucide-react"; 

export const SidebarOptions = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        name: "Scheduled Interviews",
        icon: Calendar,
        path: "/scheduled-interviews",
    },
    {
        name: "All Interviews",
        icon: List,
        path: "/all-interviews",
    },
    {
        name: "Billing",
        icon: CreditCard,
        path: "/billing",
    },
    {
        name: "Settings",
        icon: Settings,
        path: "/settings", 
    },
];

export const InterviewTypes = [
    {
        name: "Technical",
        icon: Code,    
    },
    {
        name: "HR",
        icon: User,
    },
    {   
        name: "Managerial",
        icon: Briefcase,
    },          
    {
        name: "Behavioral",
        icon: Smile,
    },
    {
        name: "Problem Solving",
        icon: Brain,
    }
];

export const QUESTION_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{interviewDuration}}
Interview Type: {{type}}
Your task: Analyze the job description to identify key responsibilities, required skills, and expected experience.Generate a list of interview questions depends on interview duration Adjust the number and depth of questions to match the interview duration. Ensure the questions match the tone and structure of a real-life {{type}} interview
Return ONLY a valid JSON array with no prefix, no explanation, no markdown.
[
  question: "", type: "Technical/Behavioral/HR/Problem Solving/Managerial"
]
The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`;