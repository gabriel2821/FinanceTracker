import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import transaction from '@/routes/transaction';

interface Category {
    id: number;
    name: string;
}

const TransactionForm = ({ onSuccess, categories }: { onSuccess?: () => void, categories: Category[] }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        type: 'expense',
        notes: '',
        amount: '',
        trans_date: new Date().toISOString().split('T')[0],
        category_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for actual submission logic
        console.log('Submitting transaction:', data);
        post(transaction.store().url, {
            onSuccess: () => {
                reset();
                onSuccess?.();
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                </Select>
                {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="category_id">Category</Label>
                <Select
                    value={data.category_id.toString()}
                    onValueChange={(value) => setData('category_id', value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.category_id && <p className="text-sm text-red-500">{errors.category_id}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Input
                    id="notes"
                    value={data.notes}
                    onChange={(e) => setData('notes', e.target.value)}
                    placeholder="Enter notes"
                />
                {errors.notes && <p className="text-sm text-red-500">{errors.notes}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                    id="amount"
                    type="number"
                    value={data.amount}
                    onChange={(e) => setData('amount', e.target.value)}
                    placeholder="0.00"
                />
                {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="trans_date">Date</Label>
                <Input
                    id="trans_date"
                    type="date"
                    value={data.trans_date}
                    onChange={(e) => setData('trans_date', e.target.value)}
                />
                {errors.trans_date && <p className="text-sm text-red-500">{errors.trans_date}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={processing}>
                {processing ? 'Adding...' : 'Add Transaction'}
            </Button>
        </form>
    );
};

export default TransactionForm;
