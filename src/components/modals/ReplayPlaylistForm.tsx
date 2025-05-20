
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
import { useToast } from "@/hooks/use-toast";

interface ReplayPlaylistFormProps {
  open: boolean;
  onClose: () => void;
}

export function ReplayPlaylistForm({ open, onClose }: ReplayPlaylistFormProps) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      toast({
        title: "Erreur de validation",
        description: "Le nom de la playlist est obligatoire.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Playlist créée",
      description: "La playlist a été créée avec succès."
    });
    
    // Reset form
    setName("");
    setFile(null);
    setIsSubmitting(false);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter une playlist de replays</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom de la playlist"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file">Image</Label>
            <Input 
              id="file"
              type="file"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {file && (
              <div className="text-sm text-muted-foreground">
                Fichier sélectionné: {file.name}
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
