
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PodcastPlaylist } from "@/types";

interface PodcastFormProps {
  open: boolean;
  onClose: () => void;
  playlists: PodcastPlaylist[];
}

export function PodcastForm({ open, onClose, playlists }: PodcastFormProps) {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !playlistId) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Podcast créé",
      description: "Le podcast a été créé avec succès."
    });
    
    // Reset form
    setTitle("");
    setPlaylistId("");
    setAudioFile(null);
    setIsSubmitting(false);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un podcast</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre du podcast"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="playlist">Playlist</Label>
            <Select value={playlistId} onValueChange={setPlaylistId}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une playlist" />
              </SelectTrigger>
              <SelectContent>
                {playlists.map((playlist) => (
                  <SelectItem key={playlist.id} value={playlist.id}>
                    {playlist.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="audio">Fichier audio</Label>
            <Input 
              id="audio"
              type="file"
              name="audio"
              accept="audio/*"
              onChange={handleFileChange}
            />
            {audioFile && (
              <div className="text-sm text-muted-foreground">
                Fichier sélectionné: {audioFile.name}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>Annuler</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Création en cours..." : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
