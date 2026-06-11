import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const { signIn, signUp, signOut, useSession, getSession } = createAuthClient({
    plugins: [
        inferAdditionalFields({
            user: {
                isAdmin: {
                    type: "boolean",
                }
            }
        })
    ]
});
