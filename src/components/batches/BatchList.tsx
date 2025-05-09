
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Plus } from "lucide-react";
import { Batch } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface BatchListProps {
  batches: Batch[];
}

const BatchList: React.FC<BatchListProps> = ({ batches }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const filteredBatches = batches.filter(
    (batch) =>
      batch.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex items-center relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('searchBatches')}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="bg-industrial-blue" onClick={() => navigate('/batches/new')}>
          <Plus className="mr-2 h-4 w-4" /> {t('newBatch')}
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('batchId')}</TableHead>
              <TableHead>{t('name')}</TableHead>
              <TableHead>{t('date')}</TableHead>
              <TableHead>{t('kiln')}</TableHead>
              <TableHead>{t('materialLot')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead className="text-right">{t('passingRate')}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBatches.map((batch) => (
              <TableRow key={batch.id}>
                <TableCell className="font-medium">
                  <Link to={`/batches/${batch.id}`} className="hover:underline text-industrial-blue">
                    {batch.id}
                  </Link>
                </TableCell>
                <TableCell>{batch.name}</TableCell>
                <TableCell>{batch.date}</TableCell>
                <TableCell>{batch.kiln}</TableCell>
                <TableCell>{batch.materialLot}</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-${batch.status.color === 'green' ? 'status-pass/15 text-status-pass' : batch.status.color === 'red' ? 'status-fail/15 text-status-fail' : batch.status.color === 'blue' ? 'industrial-lightBlue/15 text-industrial-blue' : 'status-neutral/15 text-status-neutral'}`}>
                    {batch.status.status.charAt(0).toUpperCase() + batch.status.status.slice(1)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {batch.passingRate !== undefined ? `${batch.passingRate}%` : "-"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => navigate(`/batches/${batch.id}`)}>
                        {t('viewDetails')}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate(`/batches/measurement/${batch.id}`)}>
                        {t('addMeasurement')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/batches/defect/${batch.id}`)}>
                        {t('reportDefect')}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate(`/batches/report/${batch.id}`)}>
                        {t('generateReport')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BatchList;
