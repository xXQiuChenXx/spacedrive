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
import Link from "next/link";

const StepThree = async ({
  searchParams,
}: {
  searchParams: { error?: string };
}) => {
  const token = await getTokenFromDB();
  const { error } = searchParams;
  const isError = Boolean(error || !token);
  return (
    <Card className="w-11/12 md:w-5/6 lg:w-4/6 xl:w-7/12 2xl:w-1/2 mx-auto mt-20 lg:mt-28 shadow">
      <CardHeader>
        <CardTitle>Step 3 - Finalizing!</CardTitle>
        <CardDescription>Finalize the application setups.</CardDescription>
      </CardHeader>
      <CardContent>
        {isError ? (
          <p className="text-red-600">
            Oops! Somthing when wrong, Error:{" "}
            {error || "Unable to retrieve token"}
          </p>
        ) : (
          <p>Well done! Everything set, you may proceed</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/setup/step-2">
          <Button variant="outline">Go back</Button>
        </Link>
        <Link href={isError ? "/setup" : "/home"}>
          <Button>{isError ? "Retry" : "Get Started!"}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default StepThree;
