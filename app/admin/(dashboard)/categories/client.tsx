"use client";

import { useState } from "react";
import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CategoryTable } from "@/components/features/admin/CategoryTable";
import { CategoryDialog } from "@/components/features/admin/CategoryDialog";

interface CategoryPageClientProps {
    categories: Category[];
}

export function CategoryPageClient({ categories }: CategoryPageClientProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

    const handleCreate = () => {
        setCategoryToEdit(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (category: Category) => {
        setCategoryToEdit(category);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
                    <p className="text-muted-foreground">Manage blog post categories.</p>
                </div>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" /> New Category
                </Button>
            </div>

            <CategoryTable categories={categories} onEdit={handleEdit} />

            <CategoryDialog
                open={isDialogOpen}
                setOpen={setIsDialogOpen}
                categoryToEdit={categoryToEdit}
            />
        </div>
    );
}
