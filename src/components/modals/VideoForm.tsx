
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

interface VideoFormProps {
  open: boolean;
  onClose: () => void;
}

export function VideoForm({ open, onClose }: VideoFormProps) {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [ytbUrl, setYtbUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !ytbUrl) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }
    
    // Simple YouTube URL validation
    const ytbUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (!ytbUrlPattern.test(ytbUrl)) {
      toast({
        title: "Erreur de validation",
        description: "L'URL YouTube n'est pas valide.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Vidéo ajoutée",
      description: "La vidéo a été ajoutée avec succès."
    });
    
    // Reset form
    setTitle("");
    setYtbUrl("");
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter une vidéo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de la vidéo"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ytbUrl">URL YouTube</Label>
            <Input 
              id="ytbUrl"
              value={ytbUrl}
              onChange={(e) => setYtbUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>Annuler</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Ajout en cours..." : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
