import React from 'react'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';

interface CategoryListProps {
    id: number;
    name: string;
    type: string;
    onEdit: (category: { id: number; name: string; type: string }) => void;
    onDelete: (category: { id: number; name: string; type: string }) => void;
}

export default function CategoryListItem({ id, name, type, onEdit, onDelete }: CategoryListProps) {
    const isIncome = type.toLowerCase() === 'income';

    return (
        <tr className="hover:bg-muted/30 transition-colors group">
            <td className="px-6 py-4 font-medium">
                {name}
            </td>
            <td className="px-6 py-4">
                <Badge 
                    variant={isIncome ? 'secondary' : 'destructive'} 
                    className="capitalize font-medium"
                >
                    {type}
                </Badge>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        onClick={() => onEdit({ id, name, type })}
                    >
                        <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => onDelete({ id, name, type })}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </td>
        </tr>
    );
}