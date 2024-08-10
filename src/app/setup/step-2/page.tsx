import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const StepTwo = () => {
  return (
    <div>
      <Card className="w-[900px] mx-auto mt-32 shadow">
        <CardHeader>
          <CardTitle>Step 2 / 3 - Oauth</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Previous</Button>
          <Button>
            Next
            <ArrowRightIcon className="ml-2" width={20} height={20} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StepTwo;
