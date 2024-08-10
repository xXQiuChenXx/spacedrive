import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Datatable from "@/components/setup/Datatable";
import { config } from "@/config/api.config"

const StepOne = () => {
  return (
    <div>
      <Card className="w-[900px] mx-auto mt-32 shadow">
        <CardHeader>
          <CardTitle>Step 1 / 3 - Preparation</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Datatable config={config}/>
        </CardContent>
        <CardFooter className="flex ">
          {/* <Button variant="outline">Cancel</Button> */}
          <Button className="ml-auto">
           Next
            <ArrowRightIcon className="ml-2" width={20} height={20}/>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StepOne;
