import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import category from '@/routes/category';

const CategoryForm = ({ onSuccess }: { onSuccess?: () => void }) => {
    // Only category-specific data needed here
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        type: 'expense', // default to expense
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // Submitting to the category store route
        post(category.store().url, {
            onSuccess: () => {
                reset();
                onSuccess?.();
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4 py-4">
            {/* Category Name */}
            <div className="grid gap-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="e.g. Groceries, Salary, Rent"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Category Type */}
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

            <Button type="submit" className="w-full" disabled={processing}>
                {processing ? 'Creating...' : 'Create Category'}
            </Button>
        </form>
    );
};

export default CategoryForm;