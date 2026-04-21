import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { Button } from '@/components/ui/button';
import {
    PieChart,
    Shield,
    LayoutDashboard,
    ArrowRight,
    Zap,
    BarChart3,
    ArrowUpRight,
    MousePointer2,
    Sparkles
} from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props as any;

    return (
        <div className="min-h-screen bg-background relative overflow-hidden font-sans selection:bg-primary/30">
            <Head title="FinTrack - Master Your Wealth">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            {/* Premium Background Blurs */}
            <div className="absolute top-[-15%] right-[-10%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[160px] -z-10 animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-15%] w-[60%] h-[60%] bg-emerald-500/15 rounded-full blur-[140px] -z-10" />
            <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] -z-10" />

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 px-6 py-6 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex justify-between items-center glass px-6 py-3.5 rounded-[2rem] border border-primary/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="h-10 w-10 overflow-hidden rounded-xl group-hover:rotate-[5deg] transition-all duration-500 shadow-lg shadow-primary/10">
                            <img src="/logo.png" alt="FinTrack Logo" className="h-full w-full object-cover" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-primary">FinTrack</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href={dashboard()}>
                                <Button className="rounded-2xl px-6 h-11 font-bold shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-95 transition-all">
                                    Dashboard <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href={login()} className="hidden sm:block">
                                    <Button variant="ghost" className="text-foreground/80 hover:text-primary font-bold text-sm">Log in</Button>
                                </Link>
                                {canRegister && (
                                    <Link href={register()}>
                                        <Button className="rounded-2xl px-8 h-11 font-bold shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-95 transition-all">
                                            Join Now
                                        </Button>
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="pt-48 pb-32 px-6">
                <div className="max-w-7xl mx-auto text-center space-y-16">
                    <div className="space-y-8 max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            <Sparkles className="h-4 w-4 fill-current animate-pulse" />
                            <span>Precision Financial Intelligence</span>
                        </div>

                        <h1 className="text-7xl md:text-[92px] font-black tracking-[-0.04em] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 leading-[0.95]">
                            Evolve Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-emerald-400 to-primary/60">Financial Legacy</span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-xl text-muted-foreground/80 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                            Stop just tracking expenses. Start orchestrating your wealth with a sophisticated interface designed for absolute clarity and growth.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
                        {auth.user ? (
                            <Link href={dashboard()}>
                                <Button size="lg" className="rounded-2xl h-16 px-12 text-xl font-black shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:shadow-[0_25px_50px_rgba(16,185,129,0.5)] transition-all group border-b-4 border-emerald-700">
                                    Access Dashboard <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href={register()}>
                                    <Button size="lg" className="rounded-2xl h-16 px-12 text-xl font-black shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:shadow-[0_25px_50px_rgba(16,185,129,0.5)] transition-all group border-b-4 border-emerald-700">
                                        Begin Your Journey <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Value Pillars */}
            <section id="features" className="py-40 px-6 relative">
                <div className="absolute inset-0 bg-primary/[0.03] -skew-y-3 -z-10" />
                <div className="max-w-7xl mx-auto space-y-24">
                    <div className="text-center space-y-5">
                        <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-[1] text-foreground">
                            Engineered for <br /><span className="text-primary">Performance</span>
                        </h2>
                        <p className="max-w-2xl mx-auto text-muted-foreground/80 font-semibold text-lg">
                            Ditch the spreadsheets. Experience a ecosystem built for the modern digital economy.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: <LayoutDashboard className="h-8 w-8" />,
                                title: "Command Center",
                                description: "A unified view of your entire financial universe. Real-time updates with predictive liquidity monitoring.",
                                color: "primary"
                            },
                            {
                                icon: <BarChart3 className="h-8 w-8" />,
                                title: "Neural Analytics",
                                description: "Go beyond charts. Our engine identifies spending anomalies and suggests high-impact saving routes.",
                                color: "emerald-500"
                            },
                            {
                                icon: <Shield className="h-8 w-8" />,
                                title: "Fortress Security",
                                description: "Privacy by design. We use decentralized encryption standards ensuring your data stays exclusively yours.",
                                color: "primary"
                            }
                        ].map((pillar, i) => (
                            <div key={i} className="glass p-12 rounded-[3.5rem] border border-primary/10 flex flex-col items-start text-left space-y-6 hover:border-primary/40 transition-all duration-500 group hover:-translate-y-4 shadow-xl hover:shadow-primary/10">
                                <div className={`h-16 w-16 rounded-3xl bg-${pillar.color === 'primary' ? 'primary' : 'emerald-500'}/10 flex items-center justify-center text-${pillar.color} group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-inner`}>
                                    {pillar.icon}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black tracking-tight">{pillar.title}</h3>
                                    <p className="text-muted-foreground/90 leading-relaxed font-semibold text-[15px]">{pillar.description}</p>
                                </div>
                                <div className="pt-4">
                                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest cursor-pointer group-hover:gap-4 transition-all">
                                        Explore Feature <ArrowRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modern Footer */}
            <footer className="pt-32 pb-20 px-6 border-t border-primary/10 bg-primary/[0.01]">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="grid md:grid-cols-4 gap-20">
                        <div className="space-y-8 col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 overflow-hidden rounded-lg shadow-md">
                                    <img src="/logo.png" alt="FinTrack Logo" className="h-full w-full object-cover" />
                                </div>
                                <span className="text-xl font-black tracking-tighter text-primary uppercase">FinTrack</span>
                            </div>
                            <p className="text-muted-foreground/80 font-semibold text-sm leading-relaxed">
                                Redefining financial clarity with elite-level tracking and sophisticated analytical intelligence. Crafted for the ambitious.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-10 text-primary">Intelligence</h4>
                            <ul className="space-y-5 text-[15px] text-muted-foreground font-bold italic">
                                <li><a href="#" className="hover:text-primary transition-all hover:pl-2">Predictive Logic</a></li>
                                <li><a href="#" className="hover:text-primary transition-all hover:pl-2">Wealth Map</a></li>
                                <li><a href="#" className="hover:text-primary transition-all hover:pl-2">Liquidity API</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-10 text-primary">Company</h4>
                            <ul className="space-y-5 text-[15px] text-muted-foreground font-bold italic">
                                <li><a href="#" className="hover:text-primary transition-all hover:pl-2">Philosophy</a></li>
                                <li><a href="#" className="hover:text-primary transition-all hover:pl-2">Security Audit</a></li>
                                <li><a href="#" className="hover:text-primary transition-all hover:pl-2">Legal Core</a></li>
                            </ul>
                        </div>

                        <div className="space-y-10">
                            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-10 text-primary">Connect</h4>
                            <div className="flex gap-4">
                                <div className="h-12 w-12 rounded-[1.25rem] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
                                    <Zap className="h-5 w-5" />
                                </div>
                                <div className="h-12 w-12 rounded-[1.25rem] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <div className="h-12 w-12 rounded-[1.25rem] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
                                    <MousePointer2 className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-[0.4em]">
                            © {new Date().getFullYear()} FinTrack Intelligence Group. All Assets Encrypted.
                        </p>
                        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                            <a href="#" className="hover:text-primary transition-colors">Privacy Protcol</a>
                            <a href="#" className="hover:text-primary transition-colors">Merchant Terms</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
