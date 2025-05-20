
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  isLoading?: boolean;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
  isLoading = false,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtrer les données en fonction du terme de recherche
  const filteredData = data.filter((item) => 
    Object.values(item).some(
      (value) => 
        typeof value === "string" && 
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Paginer les données
  const offset = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(offset, offset + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <p>Chargement des données...</p>
      </div>
    );
  }

  const accessValue = (item: T, key: string) => {
    const keys = key.split('.');
    return keys.reduce((obj: any, key) => obj?.[key], item);
  };

  return (
    <div className="space-y-4 overflow-hidden">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Rechercher..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="dashboard-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {columns.map((column) => (
                  <th
                    key={column.header}
                    className={cn("data-grid-header text-left", column.className)}
                  >
                    {column.header}
                  </th>
                ))}
                {(onEdit || onDelete) && (
                  <th className="data-grid-header text-right">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item) => (
                  <tr key={item.id} className="border-b border-border/40 hover:bg-secondary/30">
                    {columns.map((column) => (
                      <td
                        key={`${item.id}-${String(column.accessorKey)}`}
                        className={cn("data-grid-cell", column.className)}
                      >
                        {column.cell
                          ? column.cell(item)
                          : accessValue(item, column.accessorKey as string)}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="data-grid-cell text-right">
                        <div className="flex justify-end gap-2">
                          {onEdit && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onEdit(item)}
                            >
                              Modifier
                            </Button>
                          )}
                          {onDelete && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => onDelete(item)}
                            >
                              Supprimer
                            </Button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                    className="text-center py-4 text-muted-foreground"
                  >
                    Aucune donnée disponible
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredData.length > itemsPerPage && (
          <div className="flex justify-between items-center border-t border-border/40 pt-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Affichage de {offset + 1}-{Math.min(offset + itemsPerPage, filteredData.length)} sur {filteredData.length} éléments
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Précédent
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Suivant
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
