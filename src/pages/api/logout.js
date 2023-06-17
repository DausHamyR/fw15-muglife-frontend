
import cookieConfig from "@/helpers/cookieConfig";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    function logoutRoute(req, res) {
        req.session.destroy();
        res.send({ ok: true });
    },
    cookieConfig
);