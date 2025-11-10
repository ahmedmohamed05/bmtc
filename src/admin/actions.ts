import type { Stat } from "../types";

export const MAIN_STATS: Stat[] = [
	{
		name: "الأخبار",
		link: "/admin/news",
		icon: "/assets/admin-icons/news.svg",
	},
	{
		name: "ألاحداث",
		link: "/admin/events",
		icon: "/assets/admin-icons/events.svg",
	},
	{
		name: "المكتبة",
		link: "/admin/library",
		icon: "/assets/admin-icons/book.svg",
	},
	{
		name: "التدريسيون",
		link: "/admin/staff",
		icon: "/assets/admin-icons/staff.svg",
	},
];

const STATS: Stat[] = [
	{
		name: "الصفحة الرئيسية",
		link: "/admin/home",
		icon: "/assets/admin-icons/home.svg",
	},
	...MAIN_STATS,
	{
		name: "السجل",
		link: "/admin/logs",
		icon: "/assets/admin-icons/logs.svg",
	},
	{
		name: "الرسائل و الاطاريح",
		link: "admin/letters",
		icon: "/assets/admin-icons/letter.svg",
	},
	{
		name: "الأقسام",
		link: "/admin/departments",
		icon: "/assets/admin-icons/department.svg",
	},
	{
		name: "مجلات ودوريات",
		link: "/admin/magazines",
		icon: "/assets/admin-icons/magazine.svg",
	},
];

export default STATS;
