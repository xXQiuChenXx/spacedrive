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
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const StepThree = () => {
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
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name of your project" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/setup/step-2">
            <Button variant="outline">Go back</Button>
          </Link>
          <Button>
            Get Started!
            <ArrowRightIcon className="ml-2" width={20} height={20} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StepThree;
