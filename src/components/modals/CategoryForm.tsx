
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

interface CategoryFormProps {
  open: boolean;
  onClose: () => void;
}

export function CategoryForm({ open, onClose }: CategoryFormProps) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#3498db");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      toast({
        title: "Erreur de validation",
        description: "Le nom de la catégorie est obligatoire.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Catégorie créée",
      description: "La catégorie a été créée avec succès."
    });
    
    // Reset form
    setName("");
    setColor("#3498db");
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter une catégorie</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom de la catégorie"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="color">Couleur</Label>
            <div className="flex items-center gap-3">
              <Input 
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-20 h-10 p-1"
              />
              <span className="text-sm">{color}</span>
            </div>
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
