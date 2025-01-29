import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { login } from "./services/auth-service";
import { getIsTokenValid, isUserAuthorized } from "./helpers/auth";
import { response } from "./helpers/form-validation";

const config = {
    providers:[
        Credentials({
            async authorize(credentials){
                const res = await login(credentials);
                const data = await res.json();
                console.log("message",data.message);
				// return response(false, data.message, null, data);
                if(!res.ok) return null
                return data ?? null;
            }
        })
    ],
    callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user?.role[0];
			const isOnLoginPage = nextUrl.pathname.includes("/login");
			const isOnDashboardPage = nextUrl.pathname.includes("/dashboard");
			const isOnProfilePages = nextUrl.pathname.includes("/my-");
			const isOnAddProperty = nextUrl.pathname.includes("/add-property");
			const isOnChangePassword = nextUrl.pathname.includes("/change-password");
			const isTokenValid = getIsTokenValid(auth?.token);
			// console.log("auth",auth);
            
			if (isLoggedIn && isTokenValid) {
                if (isOnDashboardPage) {
                    const isAuth = isUserAuthorized(
                        auth.user.role[0],
						nextUrl.pathname
                        );
                        
					if(isAuth) return true;
					if(auth.user.role[0].toLowerCase() === "customer"){
						return Response.redirect(new URL("/unauthorized", nextUrl));
					}


				} else if (isOnLoginPage) {
					if(auth.user.role[0].toLowerCase() === "customer"){
						return Response.redirect(new URL("/", nextUrl));
					}else{

						return Response.redirect(new URL("/dashboard", nextUrl));
					}
				}
			} else if (isOnDashboardPage) {
				return false;
			}else if(isOnProfilePages || isOnAddProperty || isOnChangePassword){
				return Response.redirect(new URL("/login", nextUrl));
			}
			return true;
		},


		async jwt({ token, user }) {
			return { ...user, ...token };
		},
		async session({ session, token }) {
			const isTokenValid = getIsTokenValid(token.object.accessToken);
			if(!isTokenValid) return null;
			session.token = token.object.accessToken;
            const payload = {...token.object}
            delete payload.accessToken
			session.user = payload
			return session;
		},
	},
    pages: {
        signIn : "/login",
    }
}


export const { handlers, auth, signIn, signOut } = NextAuth(config);