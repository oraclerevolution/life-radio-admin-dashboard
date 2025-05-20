
import { useState } from "react";
import { Dashboard } from "@/components/layout/Dashboard";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Replay, ReplayPlaylist } from "@/types";
import { ReplayForm } from "@/components/modals/ReplayForm";
import { ReplayPlaylistForm } from "@/components/modals/ReplayPlaylistForm";

// Données fictives pour simulation
const mockPlaylists: ReplayPlaylist[] = [
  { 
    id: "1", 
    name: "Émissions du soir", 
    description: "Nos émissions de soirée avec des invités variés", 
    createdAt: "2023-01-01", 
    updatedAt: "2023-01-01" 
  },
  { 
    id: "2", 
    name: "Sélections du weekend", 
    description: "Notre programmation spéciale weekend", 
    createdAt: "2023-01-02", 
    updatedAt: "2023-01-02" 
  },
  { 
    id: "3", 
    name: "Top charts", 
    description: "Les classements musicaux de la semaine", 
    createdAt: "2023-01-03", 
    updatedAt: "2023-01-03" 
  },
];

const mockReplays: Replay[] = [
  { 
    id: "1", 
    title: "Soirée électro", 
    description: "Mix électronique avec DJ Shadow", 
    audioUrl: "/replays/electro-night.mp3", 
    duration: 5400,
    airDate: "2023-05-12",
    playlistId: "1", 
    playlist: mockPlaylists[0],
    createdAt: "2023-01-10", 
    updatedAt: "2023-01-10",
  },
  { 
    id: "2", 
    title: "Weekend chill", 
    description: "Sélection relaxante pour votre weekend", 
    audioUrl: "/replays/weekend-chill.mp3", 
    duration: 4800,
    airDate: "2023-05-14",
    playlistId: "2",
    playlist: mockPlaylists[1],
    createdAt: "2023-01-15", 
    updatedAt: "2023-01-15",
  },
  { 
    id: "3", 
    title: "Top 20 de la semaine", 
    description: "Les 20 meilleurs titres de la semaine", 
    audioUrl: "/replays/top20.mp3", 
    duration: 3600,
    airDate: "2023-05-17",
    playlistId: "3", 
    playlist: mockPlaylists[2],
    createdAt: "2023-01-20", 
    updatedAt: "2023-01-20",
  },
];

const ReplaysPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("emissions");
  const [playlists, setPlaylists] = useState<ReplayPlaylist[]>(mockPlaylists);
  const [replays, setReplays] = useState<Replay[]>(mockReplays);
  const [isReplayModalOpen, setIsReplayModalOpen] = useState<boolean>(false);
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
      cell: (playlist: ReplayPlaylist) => (
        <div className="max-w-md truncate">{playlist.description}</div>
      ),
    },
    {
      header: "Date de création",
      accessorKey: "createdAt",
      cell: (playlist: ReplayPlaylist) => new Date(playlist.createdAt).toLocaleDateString(),
    },
  ];

  // Colonnes pour la table des replays
  const replayColumns = [
    {
      header: "Titre",
      accessorKey: "title",
    },
    {
      header: "Playlist",
      accessorKey: "playlist.name",
    },
    {
      header: "Date de diffusion",
      accessorKey: "airDate",
      cell: (replay: Replay) => new Date(replay.airDate).toLocaleDateString(),
    },
    {
      header: "Durée",
      accessorKey: "duration",
      cell: (replay: Replay) => {
        if (!replay.duration) return "--:--";
        const minutes = Math.floor(replay.duration / 60);
        const seconds = replay.duration % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
    },
  ];

  const handleEditPlaylist = (playlist: ReplayPlaylist) => {
    toast({
      title: "Fonction à implémenter",
      description: `Édition de la playlist "${playlist.name}"`,
    });
  };

  const handleDeletePlaylist = (playlist: ReplayPlaylist) => {
    toast({
      title: "Fonction à implémenter",
      description: `Suppression de la playlist "${playlist.name}"`,
    });
  };

  const handleEditReplay = (replay: Replay) => {
    toast({
      title: "Fonction à implémenter",
      description: `Édition du replay "${replay.title}"`,
    });
  };

  const handleDeleteReplay = (replay: Replay) => {
    toast({
      title: "Fonction à implémenter",
      description: `Suppression du replay "${replay.title}"`,
    });
  };

  const handleAddButtonClick = () => {
    if (activeTab === "emissions") {
      setIsReplayModalOpen(true);
    } else {
      setIsPlaylistModalOpen(true);
    }
  };

  return (
    <Dashboard>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Replays</h1>
            <p className="text-muted-foreground">Gérez vos replays et playlists</p>
          </div>
          <Button onClick={handleAddButtonClick}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="emissions">Emissions</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
          </TabsList>
          <TabsContent value="emissions">
            <DataTable
              data={replays}
              columns={replayColumns}
              onEdit={handleEditReplay}
              onDelete={handleDeleteReplay}
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
      <ReplayForm 
        open={isReplayModalOpen}
        onClose={() => setIsReplayModalOpen(false)}
        playlists={playlists}
      />
      
      <ReplayPlaylistForm
        open={isPlaylistModalOpen}
        onClose={() => setIsPlaylistModalOpen(false)}
      />
    </Dashboard>
  );
};

export default ReplaysPage;
