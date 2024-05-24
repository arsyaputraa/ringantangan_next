import {
  Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserType } from "@/types/user";
import AdminTableRow from "./adminTableRow";

const tableHead = [
  {
    name: "Avatar",
    accessorKey: "avatar",
  },
  {
    name: "Name",
    accessorKey: "fullName",
  },
  {
    name: "Email",
    accessorKey: "email",
  },
  {
    name: "role",
    accessorKey: "id",
  },
];

const AdminTable = ({ data }: { data: UserType[] }) => {
  return (
    <>
      <Table className="w-full">
        <TableCaption>Ringantangan Admin List</TableCaption>
        <TableHeader>
          <TableRow>
            {tableHead.map((item) => (
              <TableHead key={item.accessorKey}>{item.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((admin) => (
            <AdminTableRow key={admin.id} admin={admin} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default AdminTable;
