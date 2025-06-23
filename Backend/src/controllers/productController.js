import { supabase } from '../config/supabaseClient.js';

export const getAllProducts = async (req, res, next) => {
    const { data, error } = await supabase.from('products').select('*');
    console.log(data);
    if (error) return next(error);
    res.json(data);
};

export const getProductById = async (req, res, next) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
    if (error) return next(error);
    res.json(data);
};

// POST /products (admin use)
export const createProduct = async (req, res, next) => {
    const { name, price, image, category, description } = req.body;
    const { data, error } = await supabase.from('products').insert({
        name,
        price,
        image,
        category,
        description,
    });
    if (error) return next(error);
    res.status(201).json(data[0]);
};