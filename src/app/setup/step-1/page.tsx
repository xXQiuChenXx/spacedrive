import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { IconAlertTriangle } from "@tabler/icons-react";
import { Text } from "@radix-ui/themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Datatable from "@/components/setup/Datatable";
import { config } from "@/config/api.config";
import Link from "next/link";

const StepOne = () => {
  return (
    <div>
      <Card className="w-[900px] mx-auto mt-32 shadow">
        <CardHeader className="space-y-3">
          <CardTitle>Step 1 / 3 - Preparation</CardTitle>
          <CardDescription className="leading-normal text-base">
            Welcome to your new One-Drive-Index Web App. Configure your web
            application and gain an access token to start your journey. Check
            the following configurations before proceeding with authorising with
            your own Microsoft account.
          </CardDescription>
          <p className="mt-2 text-yellow-400">
            <IconAlertTriangle className="inline-block mr-2" width={20} />
            Note: If you see anything missing or incorrect, you need to
            reconfigure and redeploy this instance.
          </p>
        </CardHeader>
        <CardContent>
          <Datatable config={config} />
          <p className="mt-3 text-green-400">* Everything looks fine</p>
        </CardContent>
        <CardFooter className="flex">
          <Link href={"/setup/step-2"} className="ml-auto">
            <Button type="button">
              Next
              <ArrowRightIcon className="ml-2" width={20} height={20} />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StepOne;
