

interface StatCardProps {
    title: string;
    amount: number;
    notes: string;
    variant: 'default' | 'success' | 'danger';
}

export default function StatCard({ title, amount, notes, variant = 'default' }: StatCardProps) {
    const styles = {
        default: 'text-foreground',
        success: 'text-green-600',
        danger: 'text-red-600',
    };

    return (
        <div className="p-6 rounded-xl border bg-card shadow-sm flex flex-col gap-1">
            <p className={`text-sm font-medium uppercase tracking-wider ${variant !== 'default' ? styles[variant] : 'text-muted-foreground'}`}>
                {title}
            </p>
            <p className={`text-3xl font-bold ${styles[variant]}`}>
                {new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR' }).format(amount)}
            </p>
            <p className="text-xs text-muted-foreground italic">{notes}</p>
        </div>
    )
}