import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import {v4 as uuidV4} from 'uuid';

export const POST =async (req:Request) => {
    try {
        const {name, imageUrl} = await req.json();
        const profile = await currentProfile();

        if(!profile){
            throw new NextResponse("Unauthorized",{status:401})
        }

        const server = await db.server.create({
            data:{
                name,
                imageUrl,
                inviteCode: uuidV4(),
                profileId:profile.id,
                 channels:{
                    create:[{
                        name:'general', profileId:profile.id
                    }]
                 },
                 members:{
                    create:[
                        {profileId:profile.id, role:MemberRole.ADMIN}
                    ]
                 }

            }
        })

        return NextResponse.json(server);

    } catch (error) {
        console.error(error);
        // return error;
        return new NextResponse("Internal Error", {status:500})
    }
}