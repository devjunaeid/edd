import google from "next-auth/providers/google";

export default {
  providers: [
    google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks:{
    async jwt({token, user}){
      if(user){
        token.uid = user.id;
        token.name = user.name;
        token.id = user.id;
        token.role = user.role;
        token.uimg = user.image;
      }
      return token;
    },
    async session({session, token}){
      if(token){
        session.uid = token.uid;
        session.name = token.name;
        session.id = token.id;
        session.role = token.role;
        session.uimg = token.uimg;
      }
      return session;
    },
  },
};
