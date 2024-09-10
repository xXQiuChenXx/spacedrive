import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTokenFromDB } from "@/lib/oAuthStore";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const StepThree = async ({
  searchParams,
}: {
  searchParams: { error?: string };
}) => {
  const token = await getTokenFromDB();
  if (!token) console.log("Token not found");
  const { error } = searchParams;
  return (
    <div>
      <Card className="w-[900px] mx-auto mt-32 shadow">
        <CardHeader>
          <CardTitle>Step 3 - All most done!</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <p>Oops! Somthing when wrong, Error {error}</p>
          ) : (
            <p>Everything set! You may proceed</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/setup/step-2">
            <Button variant="outline">Go back</Button>
          </Link>
          {error ? (
            <Link href="/setup/step-1">
              <Button>Retry</Button>
            </Link>
          ) : (
            <Link href="/home">
              <Button>
                Get Started
                <ArrowRightIcon className="ml-1" width={20} height={20} />
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default StepThree;
