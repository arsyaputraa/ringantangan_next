"use client";
import { POSTchangeAdminRole } from "@/actions/admin.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import { responseToast } from "@/lib/functions";
import { useSession } from "@/providers/SessionProviders";
import { RoleEnum, UserType } from "@/types/user";
import { CheckIcon, PencilIcon, X } from "lucide-react";
import { useState } from "react";

const selectOptions: { value: RoleEnum; name: string }[] = [
  {
    value: "admin",
    name: "Admin",
  },
  {
    value: "superadmin",
    name: "Super Admin",
  },
  {
    value: "user",
    name: "User",
  },
];

const AdminTableRow = ({ admin }: { admin: UserType }) => {
  const { user } = useSession();
  const [isEdit, setIsEdit] = useState(false);
  const [isConfirm, setConfirm] = useState(false);
  const [selectValue, setSelectValue] = useState<RoleEnum>(admin.role);
  if (admin.id === user?.id) return null;
  return (
    <>
      <TableRow key={admin.id}>
        <TableCell>
          <Avatar>
            <AvatarImage src={admin?.avatar!} />
            <AvatarFallback>
              {admin?.fullName
                ? admin.fullName.substring(0, 2).toUpperCase()
                : ""}
            </AvatarFallback>
          </Avatar>
        </TableCell>
        <TableCell>{admin.fullName}</TableCell>
        <TableCell>{admin.email}</TableCell>
        <TableCell className="flex gap-1">
          {isEdit ? (
            <div className="flex gap-1">
              <Select
                defaultValue={admin.role}
                value={selectValue}
                onValueChange={(val: RoleEnum) => {
                  setSelectValue(val);
                }}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((item) => {
                    return (
                      <SelectItem value={item.value} className="uppercase">
                        {item.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsEdit(false);
                }}
              >
                <X className="w-4 h-4 text-red-500" />
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setConfirm(true);
                }}
              >
                <CheckIcon className="w-4 h-4 text-green-500" />
              </Button>
            </div>
          ) : (
            <span className="gap-1 flex items-center">
              <Badge className="uppercase">{admin.role}</Badge>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                <PencilIcon className="w-4 h-4" />
              </Button>
            </span>
          )}
        </TableCell>
      </TableRow>
      <ConfirmationDialog
        title={`Are you sure?`}
        subtitle={`Changing the role of ${admin.email} to ${selectValue}`}
        isOpen={isConfirm}
        setOpen={setConfirm}
        onCancel={() => setConfirm(false)}
        onConfirm={async () => {
          if (selectValue === admin.role) {
            setConfirm(false);
            setIsEdit(false);
            return;
          }
          const res = await POSTchangeAdminRole({
            id: admin.id,
            newRole: selectValue,
          });
          responseToast({ res });
          return;
        }}
      />
    </>
  );
};

export default AdminTableRow;
