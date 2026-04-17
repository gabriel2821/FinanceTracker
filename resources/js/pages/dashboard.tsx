import { Head, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from '@/components/ui/dialog';
import TransactionForm from '@/transaction/TransactionForm';
import { PlusIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import StatCard from '../transaction/StatCard';
import TransactionTable from '../transaction/TransactionTable';
import FinanceChart from '../transaction/FinanceChart';

export default function Dashboard({ categories, transactions }: { categories: any[]; transactions: any[] }) {
    const [open, setOpen] = useState(false);
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash.success]);

    const stats = {
        income: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + parseFloat(t.amount), 0),
        expenses: transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + parseFloat(t.amount), 0),
    };
    const totalBalance = stats.income - stats.expenses;

    return (
        <div className="p-8">
            <Head title="Dashboard" />
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">FinTrack</h1>
                    <p className="text-muted-foreground">Manage your personal finances with ease.</p>
                </div>

                <div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button size="lg">
                                <PlusIcon className="mr-2 h-5 w-5" />
                                Add Transaction
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add New Transaction</DialogTitle>
                                <DialogDescription>
                                    Fill in the details below to add a new transaction.
                                </DialogDescription>
                            </DialogHeader>
                            <TransactionForm categories={categories} onSuccess={() => setOpen(false)} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-3">
                <StatCard
                    title="Total Balance"
                    amount={totalBalance}
                    notes="Current available funds"
                    variant={totalBalance >= 0 ? 'default' : 'danger'}
                />
                <StatCard
                    title="Total Income"
                    amount={stats.income}
                    notes="Total money received"
                    variant="success"
                />
                <StatCard
                    title="Total Expenses"
                    amount={stats.expenses}
                    notes="Total money spent"
                    variant="danger"
                />
            </div>

            {/* Charts Section */}
            <FinanceChart transactions={transactions} />

            {/* Transactions Table */}
            <TransactionTable transactions={transactions} />
        </div>
    );
}
