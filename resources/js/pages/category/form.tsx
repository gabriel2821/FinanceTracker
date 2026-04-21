import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import categoryRoutes from '@/routes/category';

interface CategoryFormProps {
    category?: {
        id: number;
        name: string;
        type: string;
    };
    onSuccess?: () => void;
}

const CategoryForm = ({ category, onSuccess }: CategoryFormProps) => {
    const isEditing = !!category;

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        name: category?.name || '',
        type: category?.type || 'expense',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && category) {
            patch(categoryRoutes.update({ category: category.id }).url, {
                onSuccess: () => {
                    onSuccess?.();
                },
            });
        } else {
            post(categoryRoutes.store().url, {
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                },
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-4 py-4">
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
                {processing ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Category' : 'Create Category')}
            </Button>
        </form>
    );
};

export default CategoryForm;