"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCategory, updateCategory } from "@/lib/actions";
import { Category } from "@prisma/client";

interface CategoryDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    categoryToEdit: Category | null;
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : isEditing ? "Update Category" : "Create Category"}
        </Button>
    );
}

export function CategoryDialog({ open, setOpen, categoryToEdit }: CategoryDialogProps) {
    const [state, setState] = useState<{ error?: string, errors?: any } | null>(null);

    // Reset error state when dialog opens/closes
    useEffect(() => {
        if (!open) setState(null);
    }, [open]);

    const formAction = async (formData: FormData) => {
        if (categoryToEdit) {
            const res = await updateCategory(categoryToEdit.id, null, formData);
            if (res?.error) {
                setState(res);
                return;
            }
        } else {
            const res = await createCategory(null, formData);
            if (res?.error) {
                setState(res);
                return;
            }
        }
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{categoryToEdit ? "Edit Category" : "New Category"}</DialogTitle>
                    <DialogDescription>
                        {categoryToEdit
                            ? "Make changes to the category details here."
                            : "Add a new category for your blog posts."}
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={categoryToEdit?.name || ""}
                            required
                        />
                        {state?.errors?.name && (
                            <p className="text-sm text-destructive">{state.errors.name[0]}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={categoryToEdit?.description || ""}
                        />
                        {state?.errors?.description && (
                            <p className="text-sm text-destructive">{state.errors.description[0]}</p>
                        )}
                    </div>
                    {state?.error && !state.errors && (
                        <p className="text-sm text-destructive">{state.error}</p>
                    )}
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <SubmitButton isEditing={!!categoryToEdit} />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
