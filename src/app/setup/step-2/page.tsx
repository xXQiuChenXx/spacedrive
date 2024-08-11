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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateAuthorisationUrl } from "@/lib/oAuthHandler";

const StepTwo = ({ searchParams }: { searchParams: { type: string } }) => {
  const isManual = searchParams?.type === "manual";
  const authLink = generateAuthorisationUrl();
  return (
    <div>
      <Card className="w-[900px] mx-auto mt-32 shadow">
        <CardHeader className="space-y-3">
          <CardTitle>Step 2 / 3 - Oauth</CardTitle>
          <CardDescription className="leading-normal text-base">
            Deploy your new project in one-click. You may choose to{" "}
            <Link
              href={"/setup/step-2?type=manual"}
              className="text-blue-500 underline"
            >
              manually insert the code
            </Link>{" "}
            if you have the problem with the redirect url.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isManual ? (
             <div className="flex flex-col space-y-1.5">
             <Label htmlFor="name" className="text-base">
               Manually insert the grant code:
             </Label>
             <Input id="name" placeholder="Enter the code here" />
           </div>
          ): null}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={"/setup/step-1"}>
            <Button variant="outline">Go back</Button>
          </Link>
          {
            isManual ? (
              <Button>
                Authorize
                <ArrowRightIcon className="ml-2" width={20} height={20} />
              </Button>
            ) : (
              <Link href={authLink}>
                <Button>
                  Authorize
                  <ArrowRightIcon className="ml-2" width={20} height={20} />
                </Button>
              </Link>
            )
          }
        </CardFooter>
      </Card>
    </div>
  );
};

export default StepTwo;
