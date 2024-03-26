import { SteamGame, getOwnedGames } from '@/steam/api';
import { NextResponse } from 'next/server';

export async function GET(_request: Request, { params }: { params: { user: string } }) {
    const { user } = params;
    const { response } = await getOwnedGames(user);

    return NextResponse.json({
        games: response.games.map((g: SteamGame): Game => ({
            name: g.name,
            appid: g.appid,
            img: g.img_icon_url,
            playtime: g.playtime_forever,
        }))
    });
}

export interface Game {
    name: string;
    appid: number;
    img: string;
    playtime: number;
}