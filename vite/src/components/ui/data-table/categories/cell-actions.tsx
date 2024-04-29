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
import { useNavigate } from "react-router-dom";

export default function CellActions({ id }: { id: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2.5 w-fit">
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
              <span className="max-lg:hidden text-sm">Edit</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
