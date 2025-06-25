import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../Lib/supabaseClient';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Upload, Loader2 } from 'lucide-react';

// ────────────────────────────────────────────────────────────
// Validation schema with Zod
// ────────────────────────────────────────────────────────────
const schema = z.object({
    title: z.string().min(3, 'Required'),
    game_system: z.string().optional(),
    scale_mm: z.coerce.number().positive().optional(),
    material: z.string().optional(),
    finish_level: z.string().optional(),
    quantity: z.coerce.number().int().positive().default(1),
    budget_max: z.coerce.number().positive().optional(),
    due_date: z.string().optional(),
    details: z.string().min(10, 'Tell us more about your project'),
});

type FormValues = z.infer<typeof schema>;

// ────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────
const CustomOrder: React.FC = () => {
    const { user } = useAuth();
    const nav = useNavigate();
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        // @ts-ignore
    } = useForm<FormValues>({ resolver: zodResolver(schema) });

    const onSubmit = async (values: FormValues) => {
        if (!user) return;
        try {
            setUploading(true);
            // 1) Upload files to storage (if any)
            const uploadedPaths: string[] = [];
            for (const file of files) {
                // @ts-ignore
                const ext = file.name.split('.').pop();
                const path = `${user.id}/${Date.now()}-${file.name}`;
                const { error } = await supabase.storage
                    .from('order-files')
                    .upload(path, file);
                if (error) throw error;
                const { data } = supabase.storage.from('order-files').getPublicUrl(path);
                uploadedPaths.push(data.publicUrl);
            }

            // 2) Insert into custom_orders
            const { error } = await supabase.from('custom_orders').insert({
                user_id: user.id,
                title: values.title,
                game_system: values.game_system,
                scale_mm: values.scale_mm,
                material: values.material,
                finish_level: values.finish_level,
                quantity: values.quantity,
                budget_max: values.budget_max,
                due_date: values.due_date || null,
                details: values.details,
                files: uploadedPaths,
            });
            if (error) throw error;

            alert('Order submitted! We will contact you soon.');
            nav('/');
        } catch (e: any) {
            console.error(e);
            alert(e.message || 'Failed to submit order');
        } finally {
            setUploading(false);
        }
    };


    // @ts-ignore
    return (
        <div className="min-h-screen bg-[#F7E9E9] py-12 px-6">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8 space-y-6">
                <h1 className="text-3xl font-bold text-[#561412] text-center">
                    Custom Order Request
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-[#561412] mb-1">
                            Project Title*
                        </label>
                        <input
                            {...register('title')}
                            className="w-full p-3 border rounded focus:ring-[#AB2724]"
                        />
                        {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
                    </div>

                    {/* Game system */}
                    <div>
                        <label className="block text-sm font-medium text-[#561412] mb-1">
                            Game / System
                        </label>
                        <input
                            {...register('game_system')}
                            placeholder="Warhammer 40k, Root, etc."
                            className="w-full p-3 border rounded focus:ring-[#AB2724]"
                        />
                    </div>

                    {/* Scale + Material */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#561412] mb-1">
                                Scale (mm)
                            </label>
                            <input
                                type="number"
                                {...register('scale_mm')}
                                className="w-full p-3 border rounded focus:ring-[#AB2724]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#561412] mb-1">
                                Material
                            </label>
                            <select
                                {...register('material')}
                                className="w-full p-3 border rounded focus:ring-[#AB2724]"
                            >
                                <option value="">Let MiniForge Decide</option>
                                <option>PLA</option>
                                <option>ABS</option>
                                <option>Resin</option>
                            </select>
                        </div>
                    </div>

                    {/* Finish */}
                    <div>
                        <label className="block text-sm font-medium text-[#561412] mb-1">
                            Finish Level
                        </label>
                        <select
                            {...register('finish_level')}
                            className="w-full p-3 border rounded focus:ring-[#AB2724]"
                        >
                            <option value="">None / Raw Print</option>
                            <option>Primed</option>
                            <option>Fully Painted</option>
                        </select>
                    </div>

                    {/* Quantity + Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#561412] mb-1">
                                Quantity*
                            </label>
                            <input
                                type="number"
                                {...register('quantity', { valueAsNumber: true })}
                                defaultValue={1}
                                className="w-full p-3 border rounded focus:ring-[#AB2724]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#561412] mb-1">
                                Budget Max (optional)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                {...register('budget_max')}
                                className="w-full p-3 border rounded focus:ring-[#AB2724]"
                            />
                        </div>
                    </div>

                    {/* Due date */}
                    <div>
                        <label className="block text-sm font-medium text-[#561412] mb-1">
                            Desired Delivery Date
                        </label>
                        <input
                            type="date"
                            {...register('due_date')}
                            className="w-full p-3 border rounded focus:ring-[#AB2724]"
                        />
                    </div>

                    {/* Details */}
                    <div>
                        <label className="block text-sm font-medium text-[#561412] mb-1">
                            Project Details*
                        </label>
                        <textarea
                            rows={5}
                            {...register('details')}
                            className="w-full p-3 border rounded focus:ring-[#AB2724]"
                        ></textarea>
                        {errors.details && <p className="text-red-600 text-sm">{errors.details.message}</p>}
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium text-[#561412] mb-1">
                            Upload Files / Reference Images
                        </label>
                        <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-[#AB2724] rounded cursor-pointer hover:bg-[#AB2724]/5">
                            <Upload className="w-6 h-6 text-[#AB2724] mb-2" />
                            <span className="text-sm text-[#AB2724]">Click to browse or drag files here</span>
                            <input
                                type="file"
                                multiple
                                accept=".stl,.obj,.zip,.jpg,.png,.jpeg,.gif,.pdf"
                                className="hidden"
                                onChange={e => setFiles(Array.from(e.target.files || []))}
                            />
                        </label>
                        {files.length > 0 && (
                            <p className="text-sm mt-2 text-[#561412]">
                                {files.length} file(s) selected
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || uploading}
                        className="w-full bg-[#AB2724] text-white py-3 rounded hover:bg-[#781B19] transition flex items-center justify-center gap-2"
                    >
                        {(isSubmitting || uploading) && <Loader2 className="w-5 h-5 animate-spin" />}
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CustomOrder;
