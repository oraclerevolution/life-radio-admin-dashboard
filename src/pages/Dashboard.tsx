
import { Dashboard } from "@/components/layout/Dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Headphones, Video, Calendar } from "lucide-react";

const DashboardPage = () => {
  // Ces données seraient normalement récupérées depuis une API
  const stats = [
    { title: "Actualités", value: "24", icon: FileText, delta: "+12%" },
    { title: "Podcasts", value: "48", icon: Headphones, delta: "+5%" },
    { title: "Replays", value: "32", icon: Calendar, delta: "+8%" },
    { title: "Vidéos", value: "16", icon: Video, delta: "+15%" },
  ];

  return (
    <Dashboard>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Bienvenue sur le tableau de bord d'administration de votre application radio
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="dashboard-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">{stat.delta}</span> depuis le mois dernier
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b border-border pb-4">
                  <p className="font-medium">Podcast ajouté</p>
                  <p className="text-sm text-muted-foreground">Interview spéciale avec l'artiste du moment</p>
                  <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                </div>
                <div className="border-b border-border pb-4">
                  <p className="font-medium">Actualité modifiée</p>
                  <p className="text-sm text-muted-foreground">Le festival de musique reporté à septembre</p>
                  <p className="text-xs text-muted-foreground">Il y a 5 heures</p>
                </div>
                <div>
                  <p className="font-medium">Vidéo ajoutée</p>
                  <p className="text-sm text-muted-foreground">Session live exclusive en studio</p>
                  <p className="text-xs text-muted-foreground">Il y a 8 heures</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Contenu populaire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b border-border pb-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Interview avec Daft Punk</p>
                    <span className="bg-primary/20 text-primary-foreground text-xs rounded-full px-2 py-1">
                      Podcast
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">4,582 écoutes</p>
                </div>
                <div className="border-b border-border pb-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Les nouveautés musicales du mois</p>
                    <span className="bg-primary/20 text-primary-foreground text-xs rounded-full px-2 py-1">
                      Replay
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">3,241 écoutes</p>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Festival de jazz : les moments forts</p>
                    <span className="bg-primary/20 text-primary-foreground text-xs rounded-full px-2 py-1">
                      Vidéo
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">2,198 vues</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Dashboard>
  );
};

export default DashboardPage;
