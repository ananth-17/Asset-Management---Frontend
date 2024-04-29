import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  PencilSquareIcon,
  QrCodeIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { History } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CellActions({ id }: { id: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex gap-1 w-fit">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="w-fit">
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-secondary gap-x-3"
              //   onClick={() => {
              //     navigate(`view/${id}`);
              //   }}
            >
              <UserPlusIcon className="h-5 w-5 text-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Assign</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="w-fit">
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-secondary gap-x-3"
              //   onClick={() => {
              //     navigate(`edit/${id}`);
              //   }}
            >
              <History className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>History</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="w-fit">
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-secondary gap-x-3"
              //   onClick={() => {
              //     navigate(`edit/${id}`);
              //   }}
            >
              <PencilSquareIcon className="h-5 w-5  text-foreground " />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="w-fit">
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-secondary gap-x-3"
              //   onClick={() => {
              //     navigate(`edit/${id}`);
              //   }}
            >
              <QrCodeIcon className="h-5 w-5 text-foreground " />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>QR Code</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
