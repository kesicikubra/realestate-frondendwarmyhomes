import { getAuthHeader } from "@/helpers/auth";
import { config } from "@/helpers/config";

const API_URL = config.api.baseUrl;

      export const resetDatabase = async () => {
        return fetch(`${API_URL}/db-reset`, {
          method: "POST",
          headers: await getAuthHeader(),
        });
      };
