import { type config as Config } from "@/config/api.config";
import { addStarsAndTrim } from "@/lib/utils";

const Datatable = ({ config }: { config: typeof Config }) => {
  return (
    <table className="min-w-full table-auto">
      <tbody>
        <tr className="border bg-white dark:border-gray-700 dark:bg-gray-900">
          <td className="bg-gray-50 py-1 px-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-400">
            CLIENT_ID
          </td>
          <td className="whitespace-nowrap py-1 px-3 text-gray-500 dark:text-gray-400">
            <code className="font-mono text-sm">{config.clientId}</code>
          </td>
        </tr>
        <tr className="border bg-white dark:border-gray-700 dark:bg-gray-900">
          <td className="bg-gray-50 py-1 px-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-400">
            CLIENT_SECRET
          </td>
          <td className="whitespace-nowrap py-1 px-3 text-gray-500 dark:text-gray-400">
            <code className="font-mono text-sm">
              {addStarsAndTrim(config.clientSecret)}
            </code>
          </td>
        </tr>
        <tr className="border bg-white dark:border-gray-700 dark:bg-gray-900">
          <td className="bg-gray-50 py-1 px-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-400">
            REDIRECT_URI
          </td>
          <td className="whitespace-nowrap py-1 px-3 text-gray-500 dark:text-gray-400">
            <code className="font-mono text-sm">{config.redirectURI}</code>
          </td>
        </tr>
        <tr className="border bg-white dark:border-gray-700 dark:bg-gray-900">
          <td className="bg-gray-50 py-1 px-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-400">
            Auth API URL
          </td>
          <td className="whitespace-nowrap py-1 px-3 text-gray-500 dark:text-gray-400">
            <code className="font-mono text-sm">{config.authApi}</code>
          </td>
        </tr>
        <tr className="border bg-white dark:border-gray-700 dark:bg-gray-900">
          <td className="bg-gray-50 py-1 px-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-400">
            Drive API URL
          </td>
          <td className="whitespace-nowrap py-1 px-3 text-gray-500 dark:text-gray-400">
            <code className="font-mono text-sm">{config.driveApi}</code>
          </td>
        </tr>
        <tr className="border bg-white dark:border-gray-700 dark:bg-gray-900">
          <td className="bg-gray-50 py-1 px-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-400">
            API Scope
          </td>
          <td className="whitespace-nowrap py-1 px-3 text-gray-500 dark:text-gray-400">
            <code className="font-mono text-sm">{config.scope}</code>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Datatable;
