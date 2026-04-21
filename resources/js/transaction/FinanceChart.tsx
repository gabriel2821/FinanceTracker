import { useMemo } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Transaction {
    id: number;
    amount: string;
    type: 'income' | 'expense';
    notes: string;
    trans_date: string;
    category?: {
        name: string;
    };
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00c49f', '#ffbb28'];

export default function FinanceChart({ transactions }: { transactions: Transaction[] }) {
    // 1. Process Data for Pie Chart (Expenses by Category)
    const categoryData = useMemo(() => {
        const categories: Record<string, number> = {};
        transactions
            .filter((t) => t.type === 'expense')
            .forEach((t) => {
                const name = t.category?.name || 'Uncategorized'; // if the category name is not in the categories object, add it with a value of 0
                categories[name] = (categories[name] || 0) + parseFloat(t.amount); // then add the current transaction amount to the category name
            });

        return Object.entries(categories).map(([name, value]) => ({ name, value }));
    }, [transactions]);

    // 2. Process Data for Bar Chart (Income vs Expense)
    const incomeVsExpense = useMemo(() => {
        const totals = transactions.reduce(
            (acc, t) => { // acc is the accumulator, t is the current transaction
                if (t.type === 'income') acc.income += parseFloat(t.amount);
                else acc.expense += parseFloat(t.amount);
                return acc;
            },
            { income: 0, expense: 0 } // initial value of acc
        );

        return [
            { name: 'Income', amount: totals.income, fill: '#10b981' },
            { name: 'Expense', amount: totals.expense, fill: '#ef4444' },
        ];
    }, [transactions]);

    // 3. Process Data for Line Chart (Daily Trend)
    const trendData = useMemo(() => {
        const daily: Record<string, { date: string; income: number; expense: number }> = {};

        // Sort transactions by date first
        const sorted = [...transactions].sort((a, b) => new Date(a.trans_date).getTime() - new Date(b.trans_date).getTime());

        sorted.forEach((t) => {
            const date = new Intl.DateTimeFormat('en-MY', { day: '2-digit', month: 'short' }).format(new Date(t.trans_date));
            if (!daily[date]) daily[date] = { date, income: 0, expense: 0 };

            if (t.type === 'income') daily[date].income += parseFloat(t.amount);
            else daily[date].expense += parseFloat(t.amount);
        });

        return Object.values(daily);
    }, [transactions]);

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {/* Pie Chart: Expenses by Category */}
            <Card className="col-span-1 glass rounded-2xl shadow-sm border-muted">
                <CardHeader>
                    <CardTitle className="text-lg">Expenses by Category</CardTitle>
                    <CardDescription>Where your money is going</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: any) => `RM ${Number(value).toFixed(2)}`}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Bar Chart: Income vs Expense Over Time */}
            <Card className="col-span-1 md:col-span-1 glass rounded-2xl shadow-sm border-muted">
                <CardHeader>
                    <CardTitle className="text-lg">Overall Comparison</CardTitle>
                    <CardDescription>Income vs Total Expenses</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={incomeVsExpense} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                formatter={(value: any) => `RM ${Number(value).toFixed(2)}`}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="amount" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Line Chart: Financial Trend */}
            <Card className="col-span-1 md:col-span-2 lg:col-span-1 glass rounded-2xl shadow-sm border-muted">
                <CardHeader>
                    <CardTitle className="text-lg">Financial Trend</CardTitle>
                    <CardDescription>Daily income and expense tracking</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip
                                formatter={(value: any) => `RM ${Number(value).toFixed(2)}`}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
