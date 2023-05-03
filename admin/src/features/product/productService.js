import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getProducts = async () => {
    const response = await axios.get(`${base_url}product/`);
    return response.data;
};

const createProducts = async (product) => {
    const response = await axios.post(`${base_url}product/`, product, config);
    return response.data;
};

const deleteProduct = async (id) => {
    const response = await axios.delete(`${base_url}product/${id}`, config);
    return response.data;
};

const updateProduct = async (product) => {
    const response = await axios.put(`${base_url}product/${product.id}`,
        {
            title: product.productData.title,
            description: product.productData.description,
            images: product.productData.images,
            category: product.productData.category,
            color: product.productData.color,
            brand: product.productData.brand,
            tags: product.productData.tags,
            price: product.productData.price,
            quantity: product.productData.quantity,
        },
        config);
    return response.data;
};

const getProduct = async (id) => {
    const response = await axios.get(`${base_url}product/${id}`, config);
    return response.data;
};

const productService = {
    getProducts,
    createProducts,
    deleteProduct,
    getProduct,
    updateProduct,
};

export default productService;