
import { Dashboard } from "@/components/layout/Dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentStats, MonthlyStats, UserEngagement } from "@/types";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Données fictives pour simulation
const contentStats: ContentStats[] = [
  { name: "Actualités", count: 42 },
  { name: "Podcasts", count: 78 },
  { name: "Replays", count: 56 },
  { name: "Vidéos", count: 34 },
];

const monthlyStats: MonthlyStats[] = [
  { month: "Jan", views: 2200 },
  { month: "Fév", views: 2800 },
  { month: "Mar", views: 3300 },
  { month: "Avr", views: 3000 },
  { month: "Mai", views: 3500 },
  { month: "Juin", views: 4200 },
  { month: "Juil", views: 4800 },
  { month: "Août", views: 4100 },
  { month: "Sep", views: 3900 },
  { month: "Oct", views: 4100 },
  { month: "Nov", views: 4400 },
  { month: "Déc", views: 5200 },
];

const userEngagement: UserEngagement[] = [
  { contentType: "Actualités", engagementRate: 32 },
  { contentType: "Podcasts", engagementRate: 65 },
  { contentType: "Replays", engagementRate: 48 },
  { contentType: "Vidéos", engagementRate: 80 },
];

const devicesData = [
  { name: "Mobile", value: 68 },
  { name: "Tablette", value: 12 },
  { name: "Desktop", value: 20 },
];

const COLORS = ["#3B82F6", "#10B981", "#F43F5E", "#F59E0B"];

const StatistiquesPage = () => {
  return (
    <Dashboard>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Statistiques</h1>
          <p className="text-muted-foreground">
            Analyses et statistiques de l'utilisation de votre application radio
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,481</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+16%</span> depuis le mois dernier
              </p>
            </CardContent>
          </Card>
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Écoutes podcasts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48,295</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+24%</span> depuis le mois dernier
              </p>
            </CardContent>
          </Card>
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Temps moyen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32 min</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+8%</span> depuis le mois dernier
              </p>
            </CardContent>
          </Card>
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.6%</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-amber-500">+0.2%</span> depuis le mois dernier
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="dashboard-card overflow-hidden">
            <CardHeader>
              <CardTitle>Visites mensuelles</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip contentStyle={{ backgroundColor: "#1E293B", borderColor: "#334155" }} />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="dashboard-card overflow-hidden">
            <CardHeader>
              <CardTitle>Contenu par type</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={contentStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip contentStyle={{ backgroundColor: "#1E293B", borderColor: "#334155" }} />
                  <Legend />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="dashboard-card overflow-hidden">
            <CardHeader>
              <CardTitle>Engagement par contenu</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userEngagement} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" stroke="rgba(255,255,255,0.6)" />
                  <YAxis dataKey="contentType" type="category" stroke="rgba(255,255,255,0.6)" />
                  <Tooltip contentStyle={{ backgroundColor: "#1E293B", borderColor: "#334155" }} />
                  <Legend />
                  <Bar dataKey="engagementRate" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="dashboard-card overflow-hidden">
            <CardHeader>
              <CardTitle>Types d'appareils</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={devicesData}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {devicesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#1E293B", borderColor: "#334155" }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </Dashboard>
  );
};

export default StatistiquesPage;
