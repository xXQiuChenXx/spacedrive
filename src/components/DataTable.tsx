import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ItemsResponse } from "@/lib/driveRequest";

const DataTable = ({ data }: { data: ItemsResponse[] }) => {
  const headers = ["name", "lastModified", "size"];
  return (
    <div className="w-full space-y-2.5 overflow-auto">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead key={"w"} colSpan={3}>test</TableHead>
            <TableHead key={"wt"} colSpan={1}>test</TableHead>
            <TableHead key={"wtt"} colSpan={1}>test</TableHead>
            <TableHead key={"wtt"} colSpan={1}>test</TableHead>
              {/* {headers.map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))} */}
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
