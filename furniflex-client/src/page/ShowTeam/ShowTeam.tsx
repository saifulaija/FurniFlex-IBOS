import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGetSingleTeamQuery } from "@/redux/features/team/teamApi";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from "@/components/shared/Loader/Loader";

const ShowTeam = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleTeamQuery(id);

  if (isLoading) return <Loader/>;

  return (
    <main className="flex items-center justify-center p-4 mx-auto  bg-gray-50">
      <Card
        className={cn(
          "flex flex-col h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-lg shadow-lg border border-gray-200 bg-white"
        )}
      >
        <div className="p-6 border-b border-gray-200 bg-primary text-white">
          <h2 className="text-2xl font-bold text-center mb-1">
            Team: {data?.data?.name}
          </h2>
          <p className="text-center text-sm opacity-90">
            Team Members Overview
          </p>
        </div>

        <div className="p-6">
          <Table className="bg-white">
            <TableCaption className="text-gray-500">
              Team Members Summary
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4 text-left">Name</TableHead>
                <TableHead className="w-1/4 text-left">Email</TableHead>
                <TableHead className="w-1/4 text-left">Domain</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.users?.map((user: any) => (
                <TableRow
                  key={user?.userId?._id}
                  className="hover:bg-gray-100 transition-colors duration-200"
                >
                  <TableCell className="font-medium">
                    {user?.userId?.name || "N/A"}
                  </TableCell>
                  <TableCell>{user?.userId?.email || "N/A"}</TableCell>
                  <TableCell>{user?.userId?.domain || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </main>
  );
};

export default ShowTeam;
