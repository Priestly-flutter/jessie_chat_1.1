
import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/"
    }
});

//config to protect our route

export const config = {
    matcher:[
        "/Users/:path*"
    ]
};