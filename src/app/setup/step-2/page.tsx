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
          <CardTitle>Step 3 / 3 - All most done!</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>

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
  )
}

export default StepTwo