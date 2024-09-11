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
import { GrantCode } from "@/components/setup/GrantCode";
import { generateAuthorisationUrl, validateAPIConfig } from "@/lib/setups";
import { apiConfig } from "@/config/api.config";
import { redirect } from "next/navigation";
import { getCachedToken } from "@/lib/oAuthHandler";

const StepTwo = async ({
  searchParams,
}: {
  searchParams: { type: string };
}) => {
  const validate = validateAPIConfig({ config: apiConfig });
  if (!validate.success) return redirect("/setup/step-1");
  const token = await getCachedToken();
  if (token) redirect("/home");

  const isManual = searchParams?.type === "manual";
  const authURL = generateAuthorisationUrl({ config: apiConfig });

  return (
    <Card className="w-11/12 md:w-5/6 lg:w-4/6 xl:w-7/12 2xl:w-1/2 mx-auto mt-20 lg:mt-28 shadow">
      <CardHeader>
        <CardTitle>Step 2 - OAuth authorization </CardTitle>
        <CardDescription className="leading-normal text-base">
          Set up your application just one click!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="leading-normal text-base text-muted-foreground">
          Click the Authorize button below to authorize your Microsoft account.
        </p>
        {isManual ? (
          <div>
            <p className="leading-normal text-base text-muted-foreground">
              You can go back with authorize your Microsoft account{" "}
              <Link href={"/setup/step-2"} className="text-blue-500 ">
                automatically
              </Link>
            </p>
            <GrantCode />
          </div>
        ) : (
          <p className="leading-normal text-base text-muted-foreground">
            If you have the problem with the redirect url, you may choose to{" "}
            <Link href={"/setup/step-2?type=manual"} className="text-blue-500 ">
              manually insert the code
            </Link>
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={"/setup/step-1"}>
          <Button variant="outline">Go back</Button>
        </Link>
        {!isManual && (
          <Link href={authURL}>
            <Button>
              Authorize
              <ArrowRightIcon className="ml-2 size-5" />
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default StepTwo;
