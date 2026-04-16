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

export default function Dashboard({ categories }: { categories: any[] }) {
    const [open, setOpen] = useState(false);
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash.success]);

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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Dashboard content placeholder */}
                <div className="h-40 rounded-xl border border-dashed flex items-center justify-center text-muted-foreground">
                    <div className="h-40 rounded-xl border border-dashed flex items-center justify-center text-muted-foreground">
                        <p>total balance</p>
                        <p>$87.00</p>
                        <p>Current available funds</p>
                    </div>
                    <div className="h-40 rounded-xl border border-dashed flex items-center justify-center text-muted-foreground">
                        <p>total income</p>
                        <p>$87.00</p>
                        <p>Total money received</p>
                    </div>
                    <div className="h-40 rounded-xl border border-dashed flex items-center justify-center text-muted-foreground">
                        <p>total expenses</p>
                        <p>$87.00</p>
                        <p>Total money spent</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


