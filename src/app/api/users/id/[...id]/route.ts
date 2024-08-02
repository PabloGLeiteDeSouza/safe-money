import prisma from "@/functions/connect";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest, dataParams: { params: Params } ) {
    if (req.method === "GET") {
        if (!dataParams.params) {
            return new NextResponse(JSON.stringify({
                error: true,
                message: "Missing params",
            }), {
                status: 400,
            })
        }
        const ids =  (dataParams.params.id as Array<string>);
        const users = [];
        for (const id of ids) {
            const user = await prisma.user.findUnique({ where: { id: Number(id) } });
            if (user) {
                users.push(user);
            }
        }
        return new NextResponse(JSON.stringify(users), {
            status: 201,
        });
    } else {
        return new NextResponse(JSON.stringify({
            error: true,
            message: "Method not allowed",
        }), {
            status: 400,
        });
    }
}

export { handler as POST, handler as GET, handler as PUT, handler as DELETE };