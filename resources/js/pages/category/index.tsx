import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
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
import { useState } from 'react';
import CategoryForm from './form';

export default function Category() {

    return (
        <div className="p-8">
            <Head title="Category" />
            <div className="items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">FinTrack</h1>
                    <p className="text-muted-foreground">Manage your personal finances with ease.</p>
                </div>

                <div>
                    <CategoryForm />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Dashboard content placeholder */}
            </div>
        </div>
    );
}


