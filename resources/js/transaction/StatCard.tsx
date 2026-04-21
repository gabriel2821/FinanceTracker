

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

    const borderStyles = {
        default: 'border-t-primary',
        success: 'border-t-green-500',
        danger: 'border-t-red-500',
    };

    return (
        <div className={`p-6 rounded-2xl border glass shadow-sm flex flex-col gap-1 border-t-4 ${borderStyles[variant]}`}>
            <p className={`text-sm font-semibold uppercase tracking-wider ${variant !== 'default' ? styles[variant] : 'text-muted-foreground'}`}>
                {title}
            </p>
            <p className={`text-4xl font-bold tracking-tight ${styles[variant]}`}>
                {new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR' }).format(amount)}
            </p>
            <p className="text-xs text-muted-foreground font-medium">{notes}</p>
        </div>
    );
}