"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ResourceCategoryType } from "../../components/types/types";
import { FolderTree, Plus, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const ResourceCategoriesPage = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ResourceCategoryType | null>(null);

  // Fetch categories
  const { data: categories = [], isLoading } = useQuery<ResourceCategoryType[]>({
    queryKey: ["resource-categories"],
    queryFn: async () => {
      const response = await fetch("/api/resource-categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      return response.json();
    },
  });

  const handleEdit = (category: ResourceCategoryType) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent mb-2">
                Resource Categories
              </h1>
              <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <FolderTree className="w-4 h-4" />
                Organize your learning resources into categories
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Category
            </motion.button>
          </div>
        </motion.div>

        {/* Statistics */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-5xl font-bold mb-2">{categories.length}</div>
                <div className="text-purple-100 font-medium">Total Categories</div>
              </div>
              <FolderTree className="w-16 h-16 opacity-30" />
            </div>
          </motion.div>
        )}

        {/* Categories Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
            <FolderTree className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No categories yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get started by creating your first resource category
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              Create Category
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
              >
                <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <FolderTree className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold line-clamp-1">{category.name}</h3>
                  </div>
                </div>

                <div className="p-5">
                  {category.description ? (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 min-h-[60px]">
                      {category.description}
                    </p>
                  ) : (
                    <p className="text-gray-400 dark:text-gray-500 text-sm italic mb-4 min-h-[60px]">
                      No description provided
                    </p>
                  )}

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Slug</p>
                    <p className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      {category.slug}
                    </p>
                  </div>

                  <button
                    onClick={() => handleEdit(category)}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-medium"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Category
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <CategoryModal category={editingCategory} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

interface CategoryModalProps {
  category: ResourceCategoryType | null;
  onClose: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ category, onClose }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: category?.name || "",
    description: category?.description || "",
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const url = category
        ? `/api/resource-categories/${category.slug}`
        : "/api/resource-categories";
      const method = category ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save category");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resource-categories"] });
      onClose();
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">
          {category ? "Edit Category" : "Add Category"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description (Optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-medium disabled:opacity-50"
            >
              {mutation.isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceCategoriesPage;
