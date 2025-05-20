
import { useState } from "react";
import { Dashboard } from "@/components/layout/Dashboard";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Video } from "@/types";

// Données fictives pour simulation
const mockVideos: Video[] = [
  { 
    id: "1", 
    title: "Interview exclusive avec Stromae", 
    ytbUrl: "https://youtube.com/watch?v=abc123", 
    thumbnailUrl: "/videos/stromae-thumbnail.jpg",
    description: "Rencontre avec Stromae pour son nouvel album",
    createdAt: "2023-01-10", 
    updatedAt: "2023-01-10",
  },
  { 
    id: "2", 
    title: "Session live en studio", 
    ytbUrl: "https://youtube.com/watch?v=def456", 
    thumbnailUrl: "/videos/session-live-thumbnail.jpg",
    description: "Performance live exclusive avec notre artiste invité",
    createdAt: "2023-01-15", 
    updatedAt: "2023-01-15",
  },
  { 
    id: "3", 
    title: "Reportage sur le Festival de Jazz", 
    ytbUrl: "https://youtube.com/watch?v=ghi789", 
    thumbnailUrl: "/videos/jazz-festival-thumbnail.jpg",
    description: "Les coulisses et moments forts du festival de jazz",
    createdAt: "2023-01-20", 
    updatedAt: "2023-01-20",
  },
];

const VideosPage = () => {
  const { toast } = useToast();
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Colonnes pour la table des vidéos
  const videoColumns = [
    {
      header: "Titre",
      accessorKey: "title",
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (video: Video) => (
        <div className="max-w-md truncate">{video.description}</div>
      ),
    },
    {
      header: "Lien YouTube",
      accessorKey: "ytbUrl",
      cell: (video: Video) => (
        <a 
          href={video.ytbUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary hover:underline"
        >
          Voir la vidéo
        </a>
      ),
    },
    {
      header: "Date d'ajout",
      accessorKey: "createdAt",
      cell: (video: Video) => new Date(video.createdAt).toLocaleDateString(),
    },
  ];

  const handleEditVideo = (video: Video) => {
    toast({
      title: "Fonction à implémenter",
      description: `Édition de la vidéo "${video.title}"`,
    });
  };

  const handleDeleteVideo = (video: Video) => {
    toast({
      title: "Fonction à implémenter",
      description: `Suppression de la vidéo "${video.title}"`,
    });
  };

  return (
    <Dashboard>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Vidéos</h1>
            <p className="text-muted-foreground">Gérez vos vidéos YouTube</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle vidéo
          </Button>
        </div>

        <DataTable
          data={videos}
          columns={videoColumns}
          onEdit={handleEditVideo}
          onDelete={handleDeleteVideo}
        />
      </div>
    </Dashboard>
  );
};

export default VideosPage;
