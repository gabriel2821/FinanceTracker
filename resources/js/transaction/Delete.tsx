import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { destroy } from '@/routes/transaction';

interface DeleteProps {
    transactionId: number | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function Delete({ transactionId, open, onOpenChange }: DeleteProps) {
    const handleDelete = () => {
        if (!transactionId) return;

        router.delete(destroy.url(transactionId), {
            onSuccess: () => {
                onOpenChange(false);
            },
            onError: () => {
                toast.error('Failed to delete transaction');
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Transaction</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete the transaction record from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        Confirm Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}