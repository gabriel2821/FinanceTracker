import { Head, usePage, router } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useEffect, useState } from 'react';
import CategoryForm from './form';
import { toast } from 'sonner';
import CategoryList from './list';
import categoryRoutes from '@/routes/category';

export default function Category({ categories }: { categories: any[] }) {
    const { flash } = usePage().props as any;
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [deletingCategory, setDeletingCategory] = useState<any>(null);

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash.success]);

    const handleDelete = () => {
        if (!deletingCategory) return;

        router.delete(categoryRoutes.destroy({ category: deletingCategory.id }).url, {
            onSuccess: () => {
                setDeletingCategory(null);
            },
        });
    };

    return (
        <div className="p-8">
            <Head title="Category" />
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold italic tracking-tight">FinTrack</h1>
                    <p className="text-muted-foreground">Manage your spending categories.</p>
                </div>
            </div>

            <div className="mb-8 max-w-4xl mx-auto glass p-6 rounded-2xl border shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
                <CategoryForm />
            </div>

            <div className="mt-8 max-w-4xl mx-auto glass rounded-2xl border shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-primary/5 text-primary font-semibold border-b border-primary/10">
                        <tr>
                            <th className="px-6 py-3 w-full">Category Name</th>
                            <th className="px-6 py-3 whitespace-nowrap">Type</th>
                            <th className="px-6 py-3 text-right whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-10 text-center text-muted-foreground">
                                    No categories found. Start by adding one!
                                </td>
                            </tr>
                        ) : (
                            categories.map((category) => (
                                <CategoryList
                                    key={category.id}
                                    id={category.id}
                                    name={category.name}
                                    type={category.type}
                                    onEdit={setEditingCategory}
                                    onDelete={setDeletingCategory}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                    </DialogHeader>
                    {editingCategory && (
                        <CategoryForm
                            category={editingCategory}
                            onSuccess={() => setEditingCategory(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <AlertDialog open={!!deletingCategory} onOpenChange={(open) => !open && setDeletingCategory(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the category <span className="font-semibold text-foreground">"{deletingCategory?.name}"</span>.
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
