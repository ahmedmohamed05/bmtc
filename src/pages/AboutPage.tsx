import {
	FaGraduationCap,
	FaBullseye,
	FaHistory,
	FaBuilding,
} from "react-icons/fa";

const sections = [
	{
		icon: <FaHistory />,
		title: "تأسيس الكلية",
		text: "تأسست الكلية التقنية الإدارية في البصرة عام 2000 بقرار من وزارة التعليم العالي والبحث العلمي، لتكون صرحاً علمياً يُسهم في بناء الكوادر الوطنية المؤهلة.",
	},
	{
		icon: <FaGraduationCap />,
		title: "رؤية الكلية",
		text: "أن تكون الكلية مركزاً أكاديمياً وتقنياً رائداً في مجال الإدارة والمعلومات، يُسهم في دفع عجلة التنمية الاقتصادية والمعرفية على المستوى المحلي والوطني.",
	},
	{
		icon: <FaBullseye />,
		title: "رسالة الكلية",
		text: "إعداد خريجين مؤهلين علمياً وعملياً في مجالات الإدارة والتقنيات الحديثة، وتوفير بيئة تعليمية متكاملة تجمع بين النظرية والتطبيق.",
	},
	{
		icon: <FaBuilding />,
		title: "الأهداف الاستراتيجية",
		text: "رفع مستوى الكفاءة الأكاديمية، تعزيز بحوث الكلية، إرساء شراكات مع القطاعين العام والخاص، وتطوير الخطط الدراسية لتواكب متطلبات سوق العمل.",
	},
];

const departments = [
	{
		name: "قسم إدارة الأعمال",
		desc: "يُعنى بإعداد كوادر متخصصة في الإدارة وتحليل الأعمال",
	},
	{
		name: "قسم تقنيات المعلومات",
		desc: "يدرّس علوم الحاسوب وتقنيات البرمجيات والشبكات",
	},
	{
		name: "قسم تقنيات المحاسبية",
		desc: "يُركز على المحاسبة المالية والتدقيق وتطبيقاتها الرقمية",
	},
];

export default function AboutPage() {
	return (
		<main style={{ flex: 1, background: "var(--bg)" }}>
			{/* Page header */}
			<section
				style={{
					background: "var(--blue)",
					color: "#fff",
					padding: "3rem 1.5rem",
					textAlign: "center",
				}}>
				<h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 800 }}>
					عن الكلية
				</h1>
				<div
					style={{
						height: 4,
						width: 50,
						background: "linear-gradient(90deg, var(--gold), rgba(255,255,255,0.4))",
						borderRadius: 2,
						margin: "0.75rem auto 0",
					}}
				/>
				<p style={{ marginTop: "0.6rem", opacity: 0.85, fontSize: "0.9rem" }}>
					الكلية التقنية الإدارية – البصرة
				</p>
			</section>

			{/* About sections */}
			<section style={{ padding: "2.5rem 1.5rem" }}>
				<div
					style={{
						maxWidth: 1000,
						margin: "0 auto",
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
						gap: "1.25rem",
					}}>
					{sections.map((s) => (
						<div
							key={s.title}
							style={{
								background: "#fff",
								borderRadius: 12,
								padding: "1.75rem",
								border: "none",
								borderTop: "4px solid var(--blue)",
								display: "flex",
								flexDirection: "column",
								gap: "0.75rem",
								boxShadow:
									"0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)",
								transition: "transform 0.3s ease, box-shadow 0.3s ease",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = "translateY(-5px)";
								e.currentTarget.style.boxShadow =
									"0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = "translateY(0)";
								e.currentTarget.style.boxShadow =
									"0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)";
							}}>
							<span style={{ color: "var(--blue)", fontSize: "1.3rem" }}>
								{s.icon}
							</span>
							<h2
								style={{
									fontWeight: 700,
									fontSize: "0.95rem",
									color: "var(--text)",
								}}>
								{s.title}
							</h2>
							<p
								style={{
									fontSize: "0.85rem",
									color: "var(--text-muted)",
									lineHeight: 1.85,
								}}>
								{s.text}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Departments */}
			<section
				style={{
					background: "#fff",
					borderTop: "1px solid var(--border)",
					padding: "2rem 1.5rem",
				}}>
				<div style={{ maxWidth: 1000, margin: "0 auto" }}>
					<h2
						style={{
							fontSize: "1.25rem",
							fontWeight: 800,
							color: "var(--text)",
							marginBottom: "0.4rem",
						}}>
						الأقسام العلمية
					</h2>
					<div
						style={{
							height: 3,
							width: 44,
							background: "var(--gold)",
							borderRadius: 2,
							marginBottom: "1.25rem",
						}}
					/>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
							gap: "1rem",
						}}>
						{departments.map((d) => (
							<div
								key={d.name}
								style={{
									padding: "1.25rem 1.5rem",
									borderRadius: 12,
									background: "#fff",
									border: "none",
									borderRight: "4px solid var(--gold)",
									boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
									transition: "transform 0.3s ease, box-shadow 0.3s ease",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = "translateX(-5px)";
									e.currentTarget.style.boxShadow =
										"0 10px 15px -3px rgba(0,0,0,0.1)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = "translateX(0)";
									e.currentTarget.style.boxShadow =
										"0 4px 6px -1px rgba(0,0,0,0.05)";
								}}>
								<h3
									style={{
										fontWeight: 700,
										color: "var(--text)",
										fontSize: "0.9rem",
										marginBottom: "0.3rem",
									}}>
									{d.name}
								</h3>
								<p
									style={{
										fontSize: "0.82rem",
										color: "var(--text-muted)",
										lineHeight: 1.7,
									}}>
									{d.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
