
import { useState } from "react";
import { Dashboard } from "@/components/layout/Dashboard";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Podcast, PodcastPlaylist } from "@/types";
import { PodcastForm } from "@/components/modals/PodcastForm";
import { PodcastPlaylistForm } from "@/components/modals/PodcastPlaylistForm";

// Données fictives pour simulation
const mockPlaylists: PodcastPlaylist[] = [
  { 
    id: "1", 
    name: "Les matinales", 
    description: "Nos émissions du matin avec des invités variés", 
    createdAt: "2023-01-01", 
    updatedAt: "2023-01-01" 
  },
  { 
    id: "2", 
    name: "Interviews d'artistes", 
    description: "Rencontres exclusives avec des artistes", 
    createdAt: "2023-01-02", 
    updatedAt: "2023-01-02" 
  },
  { 
    id: "3", 
    name: "Découvertes musicales", 
    description: "Notre sélection de nouveaux talents", 
    createdAt: "2023-01-03", 
    updatedAt: "2023-01-03" 
  },
];

const mockPodcasts: Podcast[] = [
  { 
    id: "1", 
    title: "Interview avec Daft Punk", 
    description: "Une rencontre exclusive avec le duo électronique", 
    audioUrl: "/podcasts/daft-punk.mp3", 
    duration: 1800,
    playlistId: "2", 
    playlist: mockPlaylists[1],
    createdAt: "2023-01-10", 
    updatedAt: "2023-01-10",
  },
  { 
    id: "2", 
    title: "Les nouveautés de la semaine", 
    description: "Découvrez notre sélection des meilleures sorties musicales", 
    audioUrl: "/podcasts/nouveautes.mp3", 
    duration: 2400,
    playlistId: "3",
    playlist: mockPlaylists[2],
    createdAt: "2023-01-15", 
    updatedAt: "2023-01-15",
  },
  { 
    id: "3", 
    title: "Matinale spéciale festivals", 
    description: "Tour d'horizon des festivals à venir cet été", 
    audioUrl: "/podcasts/festivals.mp3", 
    duration: 3600,
    playlistId: "1", 
    playlist: mockPlaylists[0],
    createdAt: "2023-01-20", 
    updatedAt: "2023-01-20",
  },
];

const PodcastsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("episodes");
  const [playlists, setPlaylists] = useState<PodcastPlaylist[]>(mockPlaylists);
  const [podcasts, setPodcasts] = useState<Podcast[]>(mockPodcasts);
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState<boolean>(false);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState<boolean>(false);

  // Colonnes pour la table des playlists
  const playlistColumns = [
    {
      header: "Nom",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (playlist: PodcastPlaylist) => (
        <div className="max-w-md truncate">{playlist.description}</div>
      ),
    },
    {
      header: "Date de création",
      accessorKey: "createdAt",
      cell: (playlist: PodcastPlaylist) => new Date(playlist.createdAt).toLocaleDateString(),
    },
  ];

  // Colonnes pour la table des podcasts
  const podcastColumns = [
    {
      header: "Titre",
      accessorKey: "title",
    },
    {
      header: "Playlist",
      accessorKey: "playlist.name",
    },
    {
      header: "Durée",
      accessorKey: "duration",
      cell: (podcast: Podcast) => {
        if (!podcast.duration) return "--:--";
        const minutes = Math.floor(podcast.duration / 60);
        const seconds = podcast.duration % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
    },
    {
      header: "Date de création",
      accessorKey: "createdAt",
      cell: (podcast: Podcast) => new Date(podcast.createdAt).toLocaleDateString(),
    },
  ];

  const handleEditPlaylist = (playlist: PodcastPlaylist) => {
    toast({
      title: "Fonction à implémenter",
      description: `Édition de la playlist "${playlist.name}"`,
    });
  };

  const handleDeletePlaylist = (playlist: PodcastPlaylist) => {
    toast({
      title: "Fonction à implémenter",
      description: `Suppression de la playlist "${playlist.name}"`,
    });
  };

  const handleEditPodcast = (podcast: Podcast) => {
    toast({
      title: "Fonction à implémenter",
      description: `Édition du podcast "${podcast.title}"`,
    });
  };

  const handleDeletePodcast = (podcast: Podcast) => {
    toast({
      title: "Fonction à implémenter",
      description: `Suppression du podcast "${podcast.title}"`,
    });
  };

  const handleAddButtonClick = () => {
    if (activeTab === "episodes") {
      setIsPodcastModalOpen(true);
    } else {
      setIsPlaylistModalOpen(true);
    }
  };

  return (
    <Dashboard>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Podcasts</h1>
            <p className="text-muted-foreground">Gérez vos podcasts et playlists</p>
          </div>
          <Button onClick={handleAddButtonClick}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="episodes">Episodes</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
          </TabsList>
          <TabsContent value="episodes">
            <DataTable
              data={podcasts}
              columns={podcastColumns}
              onEdit={handleEditPodcast}
              onDelete={handleDeletePodcast}
            />
          </TabsContent>
          <TabsContent value="playlists">
            <DataTable
              data={playlists}
              columns={playlistColumns}
              onEdit={handleEditPlaylist}
              onDelete={handleDeletePlaylist}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <PodcastForm 
        open={isPodcastModalOpen}
        onClose={() => setIsPodcastModalOpen(false)}
        playlists={playlists}
      />
      
      <PodcastPlaylistForm
        open={isPlaylistModalOpen}
        onClose={() => setIsPlaylistModalOpen(false)}
      />
    </Dashboard>
  );
};

export default PodcastsPage;
