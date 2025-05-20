
import { useState } from "react";
import { Dashboard } from "@/components/layout/Dashboard";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { News, NewsCategory } from "@/types";

// Données fictives pour simulation
const mockCategories: NewsCategory[] = [
  { id: "1", name: "Musique", slug: "musique", createdAt: "2023-01-01", updatedAt: "2023-01-01" },
  { id: "2", name: "Événements", slug: "evenements", createdAt: "2023-01-02", updatedAt: "2023-01-02" },
  { id: "3", name: "Interviews", slug: "interviews", createdAt: "2023-01-03", updatedAt: "2023-01-03" },
];

const mockNews: News[] = [
  { 
    id: "1", 
    title: "Nouveau single d'Adèle", 
    content: "Découvrez le nouveau single d'Adèle qui cartonne déjà sur...", 
    categoryId: "1", 
    category: mockCategories[0],
    createdAt: "2023-01-10", 
    updatedAt: "2023-01-10",
  },
  { 
    id: "2", 
    title: "Festival d'été annoncé", 
    content: "Le grand festival d'été annonce sa programmation avec...", 
    categoryId: "2",
    category: mockCategories[1],
    createdAt: "2023-01-15", 
    updatedAt: "2023-01-15",
  },
  { 
    id: "3", 
    title: "Interview exclusive", 
    content: "Notre interview exclusive avec la star montante...", 
    categoryId: "3", 
    category: mockCategories[2],
    createdAt: "2023-01-20", 
    updatedAt: "2023-01-20",
  },
];

const ActualitesPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("articles");
  const [categories, setCategories] = useState<NewsCategory[]>(mockCategories);
  const [news, setNews] = useState<News[]>(mockNews);
  const [editingCategory, setEditingCategory] = useState<NewsCategory | null>(null);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Colonnes pour la table des catégories
  const categoryColumns = [
    {
      header: "Nom",
      accessorKey: "name",
    },
    {
      header: "Slug",
      accessorKey: "slug",
    },
    {
      header: "Date de création",
      accessorKey: "createdAt",
      cell: (category: NewsCategory) => new Date(category.createdAt).toLocaleDateString(),
    },
  ];

  // Colonnes pour la table des articles
  const newsColumns = [
    {
      header: "Titre",
      accessorKey: "title",
    },
    {
      header: "Catégorie",
      accessorKey: "category.name",
    },
    {
      header: "Date de création",
      accessorKey: "createdAt",
      cell: (news: News) => new Date(news.createdAt).toLocaleDateString(),
    },
  ];

  const handleEditCategory = (category: NewsCategory) => {
    setEditingCategory(category);
    // Ici s'afficherait un modal d'édition
    toast({
      title: "Fonction à implémenter",
      description: `Édition de la catégorie "${category.name}"`,
    });
  };

  const handleDeleteCategory = (category: NewsCategory) => {
    // Ici on demanderait une confirmation avant de supprimer
    toast({
      title: "Fonction à implémenter",
      description: `Suppression de la catégorie "${category.name}"`,
    });
  };

  const handleEditNews = (news: News) => {
    setEditingNews(news);
    // Ici s'afficherait un modal d'édition
    toast({
      title: "Fonction à implémenter",
      description: `Édition de l'article "${news.title}"`,
    });
  };

  const handleDeleteNews = (news: News) => {
    // Ici on demanderait une confirmation avant de supprimer
    toast({
      title: "Fonction à implémenter",
      description: `Suppression de l'article "${news.title}"`,
    });
  };

  return (
    <Dashboard>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Actualités</h1>
            <p className="text-muted-foreground">Gérez vos actualités et catégories</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="categories">Catégories</TabsTrigger>
          </TabsList>
          <TabsContent value="articles">
            <DataTable
              data={news}
              columns={newsColumns}
              onEdit={handleEditNews}
              onDelete={handleDeleteNews}
            />
          </TabsContent>
          <TabsContent value="categories">
            <DataTable
              data={categories}
              columns={categoryColumns}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Dashboard>
  );
};

export default ActualitesPage;
