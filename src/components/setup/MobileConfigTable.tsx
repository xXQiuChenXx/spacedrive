import { addStarsAndTrim } from "@/lib/utils";
import { apiConfigT } from "@/types";

export const MobileConfigTable = ({ config }: { config: apiConfigT }) => {
  return (
    <div className="text-sm md:hidden flex flex-col gap-2 break-words">
      <div>
        <p className="font-bold">CLIENT_ID:</p>
        <code className="font-mono text-muted-foreground">
          {config.clientId}
        </code>
      </div>
      <div>
        <p className="font-bold">CLIENT_SECRET:</p>
        <code className="font-mono text-muted-foreground">
          {addStarsAndTrim(config.clientSecret)}
        </code>
      </div>
      <div>
        <p className="font-bold">REDIRECT_URI:</p>
        <code className="font-mono text-muted-foreground">
          {config.redirectURI}
        </code>
      </div>
      <div>
        <p className="font-bold">Auth API URL:</p>
        <code className="font-mono text-muted-foreground">
          {config.authApi}
        </code>
      </div>
      <div>
        <p className="font-bold">Graph API URL:</p>
        <code className="font-mono text-muted-foreground">
          {config.graphApi}
        </code>
      </div>
      <div>
        <p className="font-bold">API SCOPE:</p>
        <code className="font-mono text-muted-foreground">{config.scope}</code>
      </div>
      <div>
        <p className="font-bold">postgressURL:</p>
        <code className="font-mono text-muted-foreground">
          {addStarsAndTrim(config.postgressURL)}
        </code>
      </div>
    </div>
  );
};
