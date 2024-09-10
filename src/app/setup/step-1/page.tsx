import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { IconAlertTriangle } from "@tabler/icons-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apiConfig } from "@/config/api.config";
import Link from "next/link";
import { ConfigTable } from "@/components/setup/ConfigTable";
import { validateAPIConfig } from "@/lib/setups";

const StepOne = () => {
  const validate = validateAPIConfig({ config: apiConfig });

  return (
    <div>
      <Card className="w-[900px] mx-auto mt-32 shadow">
        <CardHeader className="space-y-3">
          <CardTitle>Step 1 / 3 - Preparation</CardTitle>
          <CardDescription className="leading-normal text-base">
            🎉 Welcome to your new One-Drive-Index Web App. Configure your web
            application then gain an access token to start your journey. Check
            the following configurations before proceeding with authorizing with
            your own Microsoft account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ConfigTable config={apiConfig} />
          {validate.success && (
            <p className="mt-3 text-green-400">
              * Your configs looks fine, you may proceed
            </p>
          )}
          {validate?.error && (
            <div className="mt-3">
              {validate.error.errors.map((err, i) => (
                <p key={`err-${i + 1}`} className="text-red-400">
                  {err.message}
                </p>
              ))}
            </div>
          )}
          <div className="mt-2 text-yellow-400 flex items-center">
            <IconAlertTriangle className="inline-block mr-2 size-5" />
            <p>
              Note: If you see anything missing or incorrect, you may
              reconfigure and redeploy this instance.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex">
          {validate.success ? (
            <Link href={"/setup/step-2"} className="ml-auto">
              <Button type="button">
                Next
                <ArrowRightIcon className="ml-2" width={20} height={20} />
              </Button>
            </Link>
          ) : (
            <Button type="button" disabled>
              Next
              <ArrowRightIcon className="ml-2" width={20} height={20} />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default StepOne;
