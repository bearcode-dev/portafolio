"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ResourceType, ResourceCategoryType } from "../../components/types/types";
import { BookOpen, Plus, Edit2, ExternalLink, Calendar, Tag, User, Clock, Search } from "lucide-react";
import { motion } from "framer-motion";

const ResourcesPage = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<ResourceType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // Fetch resources
  const { data: resources = [], isLoading } = useQuery<ResourceType[]>({
    queryKey: ["resources"],
    queryFn: async () => {
      const response = await fetch("/api/resources");
      if (!response.ok) throw new Error("Failed to fetch resources");
      return response.json();
    },
  });

  // Fetch categories
  const { data: categories = [] } = useQuery<ResourceCategoryType[]>({
    queryKey: ["resource-categories"],
    queryFn: async () => {
      const response = await fetch("/api/resource-categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      return response.json();
    },
  });

  const handleEdit = (resource: ResourceType) => {
    setEditingResource(resource);
    setIsModalOpen(true);
  };

  const handleView = (resource: ResourceType) => {
    if (resource.link) {
      window.open(resource.link, '_blank');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingResource(null);
  };

  // Filter resources
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || resource.type === filterType;
    const matchesCategory = filterCategory === "all" || resource.category.id === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  // Calculate statistics
  const stats = {
    total: resources.length,
    byType: resources.reduce((acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byCategory: resources.reduce((acc, r) => {
      acc[r.category.name] = (acc[r.category.name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  const resourceTypes = ["Article", "Video", "Ebook", "Tutorial", "Tool", "Case Study"];

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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-green to-brand-medium bg-clip-text text-transparent mb-2">
                Resources Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Curate learning resources for your portfolio visitors
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-brand-green to-brand-medium text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Resource
            </motion.button>
          </div>
        </motion.div>

        {/* Statistics */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-8 h-8 opacity-80" />
                <div className="text-4xl font-bold">{stats.total}</div>
              </div>
              <div className="text-blue-100 font-medium">Total Resources</div>
            </div>
            <div className="bg-gradient-to-br from-brand-green to-brand-medium rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Tag className="w-8 h-8 opacity-80" />
                <div className="text-4xl font-bold">{Object.keys(stats.byType).length}</div>
              </div>
              <div className="text-white/80 font-medium">Resource Types</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Tag className="w-8 h-8 opacity-80" />
                <div className="text-4xl font-bold">{categories.length}</div>
              </div>
              <div className="text-purple-100 font-medium">Categories</div>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
            >
              <option value="all">All Types</option>
              {resourceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredResources.length} of {resources.length} resources
          </div>
        </motion.div>

        {/* Resources Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading resources...</p>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No resources found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || filterType !== "all" || filterCategory !== "all"
                ? "Try adjusting your filters"
                : "Get started by adding your first resource"}
            </p>
            {!(searchTerm || filterType !== "all" || filterCategory !== "all") && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-brand-green to-brand-medium text-white rounded-xl hover:shadow-lg transition-all"
              >
                Add Resource
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-green/10 text-brand-green">
                          {resource.type}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                          {resource.category.name}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 line-clamp-2">{resource.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                        {resource.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <User className="w-4 h-4" />
                      <span>{resource.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(resource.publishedAt).toLocaleDateString()}</span>
                    </div>
                    {resource.readTimeMinutes && (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{resource.readTimeMinutes} min read</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.slice(0, 4).map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 rounded-lg text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        #{tag}
                      </span>
                    ))}
                    {resource.tags.length > 4 && (
                      <span className="px-2 py-1 rounded-lg text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        +{resource.tags.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(resource)}
                      className="flex-1 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    {resource.link && (
                      <button
                        onClick={() => handleView(resource)}
                        className="flex-1 px-4 py-2 bg-brand-green/10 text-brand-green rounded-xl hover:bg-brand-green/20 transition-colors flex items-center justify-center gap-2 font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <ResourceModal
            resource={editingResource}
            categories={categories}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

interface ResourceModalProps {
  resource: ResourceType | null;
  categories: ResourceCategoryType[];
  onClose: () => void;
}

const ResourceModal: React.FC<ResourceModalProps> = ({ resource, categories, onClose }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: resource?.title || "",
    description: resource?.description || "",
    content: resource?.content || "",
    coverImage: resource?.coverImage || "",
    link: resource?.link || "",
    type: resource?.type || "Article",
    categoryId: resource?.category.id || "",
    tags: resource?.tags.join(", ") || "",
    author: resource?.author || "",
    publishedAt: resource?.publishedAt
      ? new Date(resource.publishedAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    readTimeMinutes: resource?.readTimeMinutes || "",
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const url = resource ? `/api/resources/${resource.slug}` : "/api/resources";
      const method = resource ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          tags: data.tags.split(",").map((tag: string) => tag.trim()),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save resource");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 my-8">
        <h2 className="text-2xl font-bold mb-4">
          {resource ? "Edit Resource" : "Add Resource"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="Article">Article</option>
                <option value="Video">Video</option>
                <option value="Ebook">Ebook</option>
                <option value="Tutorial">Tutorial</option>
                <option value="Tool">Tool</option>
                <option value="Case Study">Case Study</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Cover Image URL</label>
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Resource Link (Optional)</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Published Date</label>
              <input
                type="date"
                name="publishedAt"
                value={formData.publishedAt}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="react, typescript, tutorial"
                required
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Read Time (minutes)</label>
              <input
                type="number"
                name="readTimeMinutes"
                value={formData.readTimeMinutes}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
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

export default ResourcesPage;
