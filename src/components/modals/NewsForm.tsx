
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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { NewsCategory } from "@/types";

interface NewsFormProps {
  open: boolean;
  onClose: () => void;
  categories: NewsCategory[];
}

export function NewsForm({ open, onClose, categories }: NewsFormProps) {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !categoryId) {
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
      title: "Actualité créée",
      description: "L'actualité a été créée avec succès."
    });
    
    // Reset form
    setTitle("");
    setContent("");
    setCategoryId("");
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
          <DialogTitle>Ajouter une actualité</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de l'actualité"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Contenu</Label>
            <Textarea 
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Contenu de l'actualité"
              rows={5}
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
