import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import Delete from './Delete';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

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

export default function TransactionTable({ transactions }: { transactions: Transaction[] }) {
    const [idToDelete, setIdToDelete] = useState<number | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const formatCurrency = (amount: string) => {
        return new Intl.NumberFormat('en-MY', {
            style: 'currency',
            currency: 'MYR',
        }).format(parseFloat(amount));
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('en-MY', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    const openDeleteModal = (id: number) => {
        setIdToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    return (
        <div className="mt-8 glass rounded-2xl border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-primary/10">
                <h3 className="text-lg font-semibold">Recent Transactions</h3>
                <p className="text-sm text-muted-foreground">A list of your latest financial activities.</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-primary/5 text-primary font-semibold border-b border-primary/10">
                        <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Notes</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Type</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                                    No transactions found. Start by adding one!
                                </td>
                            </tr>
                        ) : (
                            transactions.map((t) => (
                                <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {formatDate(t.trans_date)}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {t.notes || 'No description'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {t.category?.name || 'Uncategorized'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge variant={t.type === 'income' ? 'secondary' : 'destructive'} className="capitalize">
                                            {t.type}
                                        </Badge>
                                    </td>
                                    <td className={`px-6 py-4 text-right font-semibold whitespace-nowrap ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                        {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
                                    </td>
                                    <td className="text-right whitespace-nowrap">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => openDeleteModal(t.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Only one modal rendered for the whole table! */}
            <Delete
                transactionId={idToDelete}
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            />
        </div>
    );
}
